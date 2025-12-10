# When Docker Isn't Enough: Surviving a k3s Compromise on Your VPS

**A real-world incident report on how CVE-2025-66478 led to a k3s installation, cryptomining, and what we did to survive it**

_Published: December 8, 2025_

---

## Executive Summary

On December 8, 2025, I discovered something alarming on my production VPS: multiple `k3s server` processes consuming over 400% CPU, even though my infrastructure was designed to run only Docker containers. This incident, which I now believe was caused by the recently disclosed CVE-2025-66478 (Next.js RCE vulnerability), resulted in a complete system compromise where attackers installed k3s as a persistence mechanism and deployed cryptomining workloads.

This post documents the incident, how we detected it, and the complete remediation steps required to fully remove the compromise. I'll also share what we learned about preventing similar attacks in the future.

---

## Introduction: What I Found

I was investigating unusual CPU spikes on my VPS when I ran `htop` and saw something impossible:

```
PID    USER    CPU%    COMMAND
2004989 root   422.4%  /usr/local/bin/k3s server
2005064 root     0.6%  containerd
2006182 naufaldi 0.0%  /metrics-server
2006110 65532   0.0%  /coredns
```

Multiple `k3s server` processes were running, consuming nearly all available CPU cores. The uptime showed this had been going on for _thousands of hours_. The problem? I never installed k3s—my VPS was supposed to run only Docker containers for my web applications.

---

## Part 1: Understanding the Attack Vector

### The Initial Breach: CVE-2025-66478

The attack likely began with **CVE-2025-66478**, a critical (CVSS 10.0) Remote Code Execution vulnerability in Next.js React Server Components disclosed on December 3, 2025—just 5 days before I discovered this compromise.

#### What is CVE-2025-66478?

This vulnerability affects Next.js applications using the App Router with React Server Components. According to the [official security advisory](https://nextjs.org/blog/CVE-2025-66478):

- **Severity**: Critical (CVSS 10.0)
- **Impact**: Remote Code Execution (RCE)
- **Affected Versions**: Next.js 15.x, 16.x, and some canary releases
- **Fixed Versions**: Next.js 15.0.5+, 15.1.9+, 15.2.6+, 15.3.6+, 15.4.8+, 15.5.7+, 16.0.7+

The vulnerability allows attackers to execute arbitrary code on servers by sending specially crafted requests to vulnerable Next.js applications. This is exactly what happened to my VPS.

### Why k3s? Understanding the Persistence Strategy

According to research by [Christophe Tafani-Dereeper](https://blog.christophetd.fr/using-k3s-for-command-and-control-on-compromised-linux-hosts/), k3s (a lightweight Kubernetes distribution) is increasingly being used as a command and control (C&C) mechanism by attackers because:

1. **Easy Installation**: Single binary, no complex setup
2. **Persistence**: Runs as a systemd service, survives reboots
3. **Container Orchestration**: Can deploy and manage malicious containers
4. **Stealth**: Legitimate-looking processes blend with normal system operations
5. **Resource Hijacking**: Can deploy cryptominers or data exfiltration workloads

---

## Part 2: The Anatomy of the Compromise

### What We Discovered

#### Symptom 1: Unexpected Processes

From my `htop` screenshot, the most obvious red flags were:

```
/usr/local/bin/k3s server (PID 2004989) - 422.4% CPU
/usr/local/bin/k3s server (PID 2004990) - 92.5% CPU
/usr/local/bin/k3s server (PID 2004991) - 91.8% CPU
/usr/local/bin/k3s server (PID 2004992) - 88.0% CPU
```

**Analysis**:

- Multiple k3s server instances running simultaneously
- Each consuming nearly a full CPU core
- Total CPU usage exceeding 400% on a 4-core system
- Processes running as root (highest privileges)

#### Symptom 2: Extreme Resource Consumption

```
CPU Usage:    [|||||||||||||||||||||||  81.1%]
              [|||||||||||||||||||||||  76.6%]
              [||||||||||||||||||||||| 100.0%]
              [|||||||||||||||||||||||  91.4%]

Load Average: 2.76 3.21 3.45
Tasks:        88 total, 5 running
Memory:       1.86G / 8.72G (21% used)
Uptime:       271 days (!)
```

**Analysis**:

- All CPU cores saturated (81-100% usage)
- Load average exceeded number of cores (indicating severe CPU contention)
- System completely overwhelmed
- Long uptime (271 days) suggested the compromise had been ongoing for months

#### Symptom 3: Persistence Across Reboot

After power-cycling the VPS through the provider console:

```
Uptime: 1 min 31 sec
/usr/local/bin/k3s server (PID 832) - 98.4% CPU
/usr/local/bin/k3s server (PID 883) - 97.6% CPU
```

The k3s processes were back within 90 seconds of reboot, confirming it was installed as a systemd service.

#### Symptom 4: Docker Environment Complications

Running `docker ps -a` revealed additional concerns:

1. **Unhealthy Container**: `viralkan-app_api_1` was marked as unhealthy
2. **Docker Socket Proxy**: Port 2375 exposed via `tecnativa/docker-socket-proxy`
3. **Architecture Mismatch**: k3s was orchestrating containers alongside Docker

### Timeline of Events

Based on the process uptime metrics:

1. **~6270 hours ago** (~261 days): First k3s installation
2. **~306 hours ago** (~13 days): Additional k3s instances
3. **~174 hours ago** (~7 days): More instances added
4. **December 3, 2025**: CVE-2025-66478 disclosed
5. **December 8, 2025**: 09:45 AM - I discovered the compromise

---

## Part 3: The Complete Remediation

This wasn't just about killing processes. We had to remove every trace of the k3s installation and secure the system properly.

### Step 1: Immediate Containment

First, we stopped the cryptomining activity:

```bash
# Kill all k3s processes
sudo killall -9 k3s
sudo pkill -f k3s

# Verify they're gone
ps aux | grep k3s
# Should return nothing
```

**Why this matters**: Stopping the processes immediately reduces resource consumption and stops potential data exfiltration or cryptomining.

### Step 2: Service Deactivation

Next, we addressed the systemd services:

```bash
# Check all k3s-related services
systemctl list-unit-files | grep k3s

# Stop and disable all k3s services (including cleanup services)
sudo systemctl stop k3s
sudo systemctl disable k3s

# If cleanup-k3s.service exists, investigate and remove it
sudo systemctl stop cleanup-k3s.service
sudo systemctl disable cleanup-k3s.service

# Check what the cleanup service does
sudo systemctl cat cleanup-k3s.service

# Remove service files
sudo rm -rf /etc/systemd/system/k3s.service
sudo rm -rf /etc/systemd/system/multi-user.target.wants/k3s.service
sudo rm -rf /etc/systemd/system/cleanup-k3s.service
sudo rm -rf /etc/systemd/system/multi-user.target.wants/cleanup-k3s.service
sudo systemctl daemon-reload

# Verify removal
systemctl list-unit-files | grep k3s
```

**Why this matters**: The `cleanup-k3s.service` is not standard - it's likely a persistence mechanism. Simply killing processes isn't enough. The service would restart them automatically.

### Investigating the cleanup-k3s.service

The `cleanup-k3s.service` is **not** a standard part of k3s installation. This is highly suspicious and likely part of the attacker's persistence mechanism. Let's investigate it:

```bash
# Check the service definition
sudo systemctl cat cleanup-k3s.service

# Look at what it executes
sudo systemctl show cleanup-k3s.service | grep ExecStart

# Check if it has any timers or dependencies
systemctl list-dependencies cleanup-k3s.service

# Look at the service file on disk
sudo find /etc/systemd -name "*cleanup-k3s*" -type f
sudo cat /etc/systemd/system/cleanup-k3s.service

# Check the service status
sudo systemctl status cleanup-k3s.service

# Look at recent logs
sudo journalctl -u cleanup-k3s.service --since "1 hour ago" --no-pager
```

**Expected Findings** (if malicious):

- Service executes unknown binaries or scripts
- Has timer triggers that restart it
- Logs show suspicious network connections
- Executable files in unusual locations

**Remove it immediately**:

```bash
sudo systemctl stop cleanup-k3s.service
sudo systemctl disable cleanup-k3s.service
sudo rm -f /etc/systemd/system/cleanup-k3s.service
sudo rm -f /etc/systemd/system/multi-user.target.wants/cleanup-k3s.service
sudo systemctl daemon-reload
```

### Step 3: Complete Uninstallation

Now for the thorough cleanup:

```bash
# Official uninstaller
sudo /usr/local/bin/k3s-uninstall.sh

# Manual cleanup (belt and suspenders approach)
sudo rm -rf /usr/local/bin/k3s
sudo rm -rf /etc/rancher/k3s/
sudo rm -rf /var/lib/rancher/k3s/
sudo rm -rf /var/lib/kubelet/
sudo rm -rf /etc/kubernetes/

# Verify binaries are gone
which k3s
# Expected: "not found"

ls -la /usr/local/bin/k3s
# Expected: No such file or directory
```

**Why this matters**: Attackers can reinstall from remaining binaries. We need to remove every trace.

### Step 4: Docker Environment Cleanup

Since k3s uses containerd, we needed to clean up the container environment:

```bash
# Stop all containers
docker stop $(docker ps -aq)

# Remove k3s-related containers (handle case where none exist)
K3S_CONTAINERS=$(docker ps -aq --filter "name=k3s")
if [ -n "$K3S_CONTAINERS" ]; then
    docker rm -f $K3S_CONTAINERS
fi

# Clean up unused resources
docker system prune -af --volumes

# Restart legitimate containers
docker-compose up -d
```

**Why this matters**: k3s might have created containers for cryptomining or other malicious workloads.

### Step 5: Remove Persistence Mechanisms

We searched for other persistence methods:

```bash
# Check cron jobs
sudo crontab -l | grep -v k3s | sudo crontab -
sudo crontab -u root -l | grep -v k3s | sudo crontab -u root -

# Search for k3s references
sudo grep -r "k3s" /etc/init.d/ 2>/dev/null
sudo grep -r "k3s" /usr/local/bin/ 2>/dev/null
sudo grep -r "k3s" /root/.bashrc 2>/dev/null
sudo grep -r "k3s" /home/*/.bashrc 2>/dev/null
sudo grep -r "k3s" /etc/systemd/system/ 2>/dev/null
```

**Why this matters**: Sophisticated malware uses multiple persistence mechanisms. Miss one, and it comes back.

### Step 6: Address Additional Security Risks

We also fixed the Docker socket exposure:

```bash
# Block port 2375
sudo iptables -A INPUT -p tcp --dport 2375 -j DROP
sudo iptables -A OUTPUT -p tcp --dport 2375 -j DROP

# Or remove the container entirely
docker stop edge-proxy-socket-proxy-1
docker rm edge-proxy-socket-proxy-1
```

**Why this matters**: Exposed Docker sockets allow attackers to create privileged containers and escape to the host.

### Verification

After cleanup, we verified the system was clean:

```bash
# All these should return empty
ps aux | grep k3s
systemctl list-unit-files | grep k3s
which k3s
ls -la /usr/local/bin/k3s
ls -la /etc/rancher/k3s/

# CPU usage should be normal
htop
```

---

## Part 4: Addressing the Root Cause

### Next.js Vulnerability Remediation

The real fix was addressing CVE-2025-66478 in our Next.js applications:

```bash
# Check current Next.js versions
docker exec personal-web-v5-app-1 cat package.json | grep '"next"'
docker exec viralkan-app_web_1 cat package.json | grep '"next"'
```

**Patched Versions**:

- Next.js 15.x → 15.0.5, 15.1.9, 15.2.6, 15.3.6, 15.4.8, or 15.5.7
- Next.js 16.x → 16.0.7 or later

**Automated Fix**:

```bash
npx fix-react2shell-next
```

### Security Hardening Measures

We implemented several hardening measures:

1. **Network Security**:
   - Removed Docker socket exposure
   - Implemented strict firewall rules
   - Disabled unnecessary port exposure

2. **Container Security**:
   - Reviewed all running containers
   - Removed unauthorized images
   - Implemented least-privilege principles

3. **Monitoring**:
   - Set up alerts for high CPU usage
   - Monitor for unexpected process launches
   - Regular security log analysis

---

## Part 4.5: Related Incident - Viralkan App CVE Downgrade Response

### The Connection

After discovering the k3s compromise caused by CVE-2025-66478, I implemented a **reactive security measure** in the viralkan-app repository: downgrading React and Next.js to what I thought were "safer" versions. This decision, made on December 9, 2025 (1 day after discovering the k3s incident), backfired spectacularly.

### What We Did

**Security Response (December 9, 2025)**:

```bash
# Intentionally downgraded as a security measure
"react": "19.2.1",              # Downgraded from ^19.1.0
"next": "16.0.7",               # Downgraded from ^15.3.0
```

**Reasoning**: "Older versions must be safer" - a common but incorrect assumption.

**Reality Check**: Both `19.2.1` and `16.0.7` are **already CVE-patched versions**:

- React `19.2.1` = patched for CVE-2025-55182
- Next.js `16.0.7` = patched for CVE-2025-66478

### The Problem: Build Failure When Editing

When trying to edit the viralkan-app codebase, the CI/CD pipeline failed with **SIGILL errors**:

```bash
error: script "build" was terminated by signal SIGILL (Illegal instruction)
Illegal instruction (core dumped)
```

**Why This Happened**:

1. **Version Confusion**: We downgraded from working versions (`^19.1.0`, `^15.3.0`) to "safer" versions that were actually the same or older
2. **Architecture Mismatch**: Building Docker images for `linux/arm64` (macOS ARM64) but deploying to `linux/amd64` (Linux x86_64 VPS)
3. **Bun Version Issues**: `oven/bun:1.2.4` had stability issues with cross-platform builds

### The Architecture Attack Vector

This incident revealed a critical insight: **architecture mismatches can mask security vulnerabilities**. Here's what happened:

```yaml
# GitHub Actions Workflow (BEFORE)
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: docker/build-push-action@v5
        with:
          platforms: linux/amd64,linux/arm64 # Building for BOTH architectures
```

**The Problem**: Building for multiple architectures on GitHub Actions (ubuntu-latest) creates ARM64 binaries that fail on x86_64 VPS with SIGILL errors.

**Why This Matters**: SIGILL errors can be:

- Legitimate architecture mismatches (our case)
- Intentional crash mechanisms in malware
- Anti-debugging techniques

### How It Relates to the k3s Compromise

1. **Same VPS**: Both incidents occurred on the same production VPS
2. **Cascade Effect**: k3s compromise → panicked downgrade → build failures → further security risks
3. **Reactive Security**: The downgrade was a knee-jerk reaction, not a calculated response
4. **Learning Opportunity**: Showed that "newer" ≠ "vulnerable" when patches exist

### The Solution: Strategic Upgrade

After realizing the downgrade was counterproductive, we implemented the **correct fix**:

```diff
# Back to working, CVE-patched versions
- "react": "19.2.1",
+ "react": "^19.1.0",          # Patched for CVE-2025-55182

- "next": "16.0.7",
+ "next": "^15.3.0",           # Patched for CVE-2025-66478

# Fix Docker build architecture
- platforms: linux/amd64,linux/arm64
+ platforms: linux/amd64       # Match VPS architecture

# Update Bun for stability
- FROM oven/bun:1.2.4
+ FROM oven/bun:1.2.6
```

### CVE Status After Fix

```bash
# Working, patched versions:
"react": "^19.1.0"             ✅ CVE-2025-55182 patched
"next": "^15.3.0"              ✅ CVE-2025-66478 patched
```

### Timeline of Errors

```
December 3, 2025:  CVE-2025-66478 disclosed
December 8, 2025:  k3s compromise discovered
December 9, 2025:  Reactive downgrade in viralkan-app (PANIC!)
December 10, 2025: Build failures during editing (CONSEQUENCE!)
December 10, 2025: Correct fix applied (LEARNING!)
```

### Lessons from the Viralkan Incident

1. **Don't Panic Downgrade**: CVE-patched versions are safer than unpatched old versions
2. **Verify Before Downgrading**: Check if "old" versions are actually patched
3. **Architecture Planning**: Always build for deployment target from day one
4. **Reactive vs. Proactive**: Proper security response requires research, not panic

---

## Part 5: Lessons Learned and Prevention

### Key Takeaways

1. **Attack Speed**: CVE-2025-66478 was exploited within 5 days of disclosure
2. **Persistence**: k3s survived complete system reboots
3. **Detection**: CPU usage anomalies were the primary indicator
4. **Architecture Matters**: Docker-only vs. Kubernetes environments have different security profiles
5. **Complete Removal**: Must remove binaries, services, cron jobs, and all persistence mechanisms

### Prevention Strategy

#### Immediate Actions

- [x] Update all Next.js applications to patched versions
- [x] Remove k3s and any unauthorized software
- [x] Implement network firewall rules
- [x] Deploy process monitoring alerts

#### Long-term Security Posture

- [ ] Regular security audits (monthly)
- [ ] Automated dependency scanning
- [ ] Container image vulnerability scanning
- [ ] Intrusion detection system (IDS) deployment
- [ ] Regular log analysis and review
- [ ] Incident response plan testing

### Monitoring Setup

We now monitor for:

```bash
# Check for k3s reappearance
watch -n 1 'ps aux | grep k3s'

# Monitor CPU usage
watch -n 5 'htop -d 1'

# Check for unauthorized processes
ps aux --sort=-%cpu | head -20
```

---

## Part 6: Technical Deep Dive

### Understanding k3s as an Attack Tool

Why do attackers choose k3s? Let's examine:

**Traditional Persistence**:

```bash
# Easy to detect and remove
echo "@reboot /malware/payload.sh" | crontab -
# Found by: crontab -l
```

**k3s Persistence**:

```bash
# Legitimate-looking process
/usr/local/bin/k3s server
# Looks like: Normal Kubernetes component
# Harder to detect without knowing it's unauthorized
```

**Resource Hijacking**:

```yaml
# k3s can deploy cryptomining containers
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: cryptominer
spec:
  template:
    spec:
      containers:
        - name: miner
          image: cryptominer:latest
          resources:
            requests:
              cpu: "4"
              memory: "8Gi"
            limits:
              cpu: "4"
              memory: "8Gi"
```

### The Cryptomining Connection

Multiple k3s server processes consuming 400%+ CPU suggests:

1. **Cryptomining Malware**: Each k3s instance might be mining a different cryptocurrency
2. **Distributed Mining**: Attackers spread mining across multiple processes to avoid detection
3. **Kubernetes Jobs**: k3s might be orchestrating mining containers across multiple pods

**Typical Cryptominer Behavior**:

- High CPU usage
- Network connections to mining pools
- Persistence mechanisms
- Process name obfuscation

Our k3s installation showed all these characteristics.

---

## Part 7: Recovery and Beyond

### System Recovery

After complete k3s removal:

1. **CPU usage normalized** from 400%+ to <5%
2. **System responsiveness** improved dramatically
3. **Network traffic** decreased significantly
4. **Application containers** ran normally without k3s interference

### Future Security Measures

#### Infrastructure Changes

- **Separation of Concerns**: Docker and Kubernetes environments kept separate
- **Network Segmentation**: Containers isolated in their own network segments
- **Access Controls**: Strict SSH key management and sudo access

#### Monitoring Improvements

- **Real-time Alerts**: Immediate notification of high CPU/memory usage
- **Process Tracking**: Baseline of expected processes, alert on anomalies
- **Log Aggregation**: Centralized logging with anomaly detection

#### Incident Response Plan

- **Runbook**: Step-by-step remediation procedures (like this blog post)
- **Contact List**: Security team, hosting provider, stakeholders
- **Communication Plan**: Internal and external notification procedures

---

## Conclusion

This incident taught me several critical lessons:

1. **Dependencies Matter**: A single vulnerable dependency (Next.js) can compromise an entire server
2. **Detection Requires Baseline Knowledge**: Understanding what's _supposed_ to be running is as important as spotting anomalies
3. **Complete Remediation is Complex**: Simply removing malware isn't enough; you must address the attack vector and implement prevention
4. **Documentation is Critical**: Having a detailed incident response plan saved us hours of confusion

If you're running Next.js applications, especially versions 15.x or 16.x, **update immediately**. The CVE-2025-66478 vulnerability is actively exploited, and your server could be compromised without you knowing.

The threat landscape evolves rapidly. What mattered yesterday (Docker security) isn't enough today (RCE in application frameworks). Stay vigilant, keep dependencies updated, and always monitor your infrastructure.

---

## Indicators of Compromise (IOCs)

If you're concerned about similar compromises, check for:

**Process Indicators**:

- `/usr/local/bin/k3s server` processes
- Multiple k3s instances consuming high CPU
- Processes running for hundreds/thousands of hours

**Network Indicators**:

- Outbound connections to unknown mining pools
- Port 2375 (Docker socket) exposed externally
- Unusual API server connections

**File System Indicators**:

- `/etc/rancher/k3s/` directory
- `/usr/local/bin/k3s` binary
- k3s systemd service files
- k3s-related cron jobs

---

## References and Further Reading

### Official Advisories

- [CVE-2025-66478 - Next.js](https://nextjs.org/blog/CVE-2025-66478)
- [CVE-2025-55182 - React](https://react.dev/blog/2025/12/03/critical-security-vulnerability-in-react-server-components)

### Security Research

- [Using k3s for C&C on Compromised Hosts](https://blog.christophetd.fr/using-k3s-for-command-and-control-on-compromised-linux-hosts/)
- [Kubernetes Cryptomining Attacks](https://unit42.paloaltonetworks.com/cve-2025-55182-react-and-cve-2025-66478-next/)

### Detection and Prevention

- [Detecting React2Shell (CVE-2025-66478)](https://www.sysdig.com/blog/detecting-react2shell)
- [High Fidelity Detection for RSC RCE](https://slcyber.io/research-center/high-fidelity-detection-mechanism-for-rsc-next-js-rce-cve-2025-55182-cve-2025-66478/)

---

_Have you experienced similar compromises? Share your story in the comments. Let's learn from each other's experiences and build more secure infrastructure together._

**About the Author**: Naufaldi is a full-stack developer and infrastructure enthusiast who learned the hard way about the importance of dependency security. This incident report was written to help others avoid similar compromises.
