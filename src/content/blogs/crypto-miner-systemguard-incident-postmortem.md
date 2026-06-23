---
title: "Postmortem: The Disguised Crypto Miner on My VPS"
slug: crypto-miner-systemguard-incident-postmortem
description: "A postmortem of a disguised XMRig miner running as systemguard on my VPS: what happened, how it was detected, how it was removed, and what I changed afterward."
category: "Technical writer"
author:
  name: "Naufaldi Rafif S"
  avatar: "https://avatars.githubusercontent.com/naufaldi?v=4"
date: 2026-06-23
image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=2000&q=80"
---

# Postmortem: The Disguised Crypto Miner on My VPS

On June 23, 2026, I found a disguised crypto miner running on my VPS.

It was not obvious at first. The symptom looked like a normal resource problem: RAM usage was higher than expected, CPU was noisy, and disk usage had crossed the point where I wanted to clean Docker images and logs.

After checking the top processes, the real problem became clear:

```txt
systemguard
```

The name sounded harmless. The process was not.

It was an XMRig Monero miner disguised as a service called `systemguard`, installed as a root-owned systemd service and configured to keep running in the background.

This post documents what happened, what I found, what I removed, and what I changed afterward.

---

## Executive Summary

The VPS had a root-level service named `systemguard` consuming around 2.3 GiB of RAM and a large amount of CPU. The binary identified itself as XMRig 6.24.0 and connected to a mining pool at `46.249.100.110:443`.

The miner was removed from the active system, evidence was quarantined, public Docker and Caddy admin exposure was closed, and safe disk cleanup reduced root disk usage from 72% to 45%.

The exact initial entry point could not be proven because the service was created on January 28, 2026, while the available auth logs only covered a much later window. The strongest contributing risks found during remediation were public exposure of Docker-related metadata and Caddy admin ports, plus the fact that Docker access on the machine effectively granted root-equivalent host access.

---

## Impact

The immediate impact was resource hijacking:

```txt
RAM before removal:
5.0 GiB used / 3.3 GiB available

RAM after removal:
2.7 GiB used / 5.6 GiB available
```

The miner used roughly 2.3 GiB of memory by itself and frequently consumed multiple CPU cores. It also contributed to noisy logs and made normal application performance harder to reason about.

Disk usage was not caused only by the miner, but the incident triggered a storage review:

```txt
Disk before cleanup:
/ = 35G used / 14G free / 72%

Disk after safe cleanup:
/ = 22G used / 27G free / 45%
```

No application database volumes were pruned. No aggressive Docker image cleanup was performed.

---

## Detection

The investigation started with a basic RAM and disk check.

The first suspicious process was:

```txt
PID      USER   COMMAND       RSS
2396865  root   systemguard   ~2.3 GiB
```

The service looked legitimate at a glance. That is part of why this kind of persistence works: the name was generic enough to blend into a Linux host.

Checking the systemd unit showed:

```ini
[Unit]
Description=systemguard runner
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
WorkingDirectory=/usr/libexec/systemguard
ExecStart=/usr/libexec/systemguard/run_systemguard.sh
Restart=always
RestartSec=5s
LimitNOFILE=65536

[Install]
WantedBy=multi-user.target
```

The binary was not owned by any Ubuntu package:

```txt
/usr/libexec/systemguard/systemguard
/usr/libexec/systemguard/run_systemguard.sh
/etc/systemd/system/systemguard.service
```

Running `strings` against the binary exposed the real identity:

```txt
XMRIG_VERSION
Monero
cryptonight-monerov7
cryptonight-monerov8
miner
pool_wallet
systemguard 6.24.0
46.249.100.110:443
```

That was enough to classify it as a disguised XMRig miner.

---

## Timeline

All times below are UTC.

```txt
2026-01-28 00:24:57
  systemguard service, runner, and binary created on disk

2026-06-23 05:18
  RAM and disk investigation started

2026-06-23 05:25
  systemguard identified as disguised XMRig/Monero miner

2026-06-23 06:13
  miner quarantined and removed from active system

2026-06-23 06:40
  edge proxy recreated to close public 2375 and 2019 exposure

2026-06-23 06:46
  safe cleanup completed; disk reduced from 72% to 45%
```

The most important forensic timestamp is January 28, 2026. That is when the malicious service and binary were created.

Unfortunately, the available auth logs did not go back that far. That means I can document what existed and when it appeared, but I cannot honestly claim a proven initial exploit path from the retained logs alone.

---

## What the Miner Did

The service was designed for persistence:

1. Start after network is online
2. Run from `/usr/libexec/systemguard`
3. Restart automatically every 5 seconds if it exits
4. Run as root through systemd
5. Hide behind a generic service name

The runner script also had an idle-awareness behavior: it tried to run when no interactive user activity was observed. That is a common stealth pattern because it makes the miner less obvious during active shell sessions.

The active miner connected to:

```txt
46.249.100.110:443
```

The logs showed mining work being assigned from that endpoint.

---

## Remediation

The normal user did not have passwordless sudo, but it did have Docker access. On Linux, Docker access is effectively root-equivalent if a user can start containers with host mounts or host namespaces.

That was used to remove the miner safely and keep evidence:

```txt
Quarantine:
/root/quarantine-systemguard-20260623-061357
```

Removed from active paths:

```txt
/etc/systemd/system/systemguard.service
/etc/systemd/system/multi-user.target.wants/systemguard.service
/usr/libexec/systemguard
```

Verified afterward:

```txt
systemguard.service: Unit could not be found
No systemguard process running
No active connection to 46.249.100.110:443
```

This stopped the immediate resource abuse.

---

## Hardening Changes

During investigation, two public exposures stood out:

```txt
0.0.0.0:2375  Docker socket proxy
0.0.0.0:2019  Caddy admin API
```

Both were wrong for this server.

The edge proxy stack was recreated from the intended Compose file so Caddy only publishes:

```txt
80/tcp
443/tcp
```

After hardening, public listeners were limited to:

```txt
22/tcp
80/tcp
443/tcp
```

Local checks against the previously exposed ports returned connection refused:

```txt
127.0.0.1:2375  connection refused
127.0.0.1:2019  connection refused
```

SSH was not changed during this pass to avoid lockout. Root login is still an item to close once access paths are confirmed.

---

## Safe Cleanup

The cleanup intentionally avoided risky Docker operations.

Done:

```txt
npm cache clean
yarn cache clean
pnpm store prune
Go build cache cleanup
Homebrew cache cleanup
old temp/build cache cleanup
systemd journal vacuum and cap
```

Not done:

```txt
No docker system prune -a
No docker volume prune
No database volume cleanup
No removal of active Node versions
```

That kept the running apps safe while still reclaiming around 13.7 GB.

---

## What Went Well

- The abnormal RAM usage made the miner visible.
- The process list quickly showed `systemguard` as the largest suspicious consumer.
- The fake service name did not survive basic package ownership and binary string checks.
- Evidence was quarantined instead of deleted immediately.
- Public Docker and Caddy admin ports were closed without changing SSH.
- Cleanup recovered a large amount of disk space without touching app data.

---

## What Could Have Gone Better

- The original install date was months before discovery.
- Retained auth logs were too recent to prove the initial entry point.
- Docker access was root-equivalent, which made remediation possible but also highlighted a risk.
- Public admin-like ports existed longer than they should have.
- The server had no swap configured, leaving less cushion during memory pressure.
- One application, `chat-websocket`, was still restart-looping separately and wasting CPU/logs.

---

## Action Items

Immediate:

- Keep `2375` and `2019` closed publicly.
- Keep the quarantine copy for forensic reference.
- Monitor for any reappearance of `systemguard`, XMRig strings, or new unknown systemd units.
- Fix the `chat-websocket` restart loop.

Next:

- Confirm safe SSH access path.
- Set `PermitRootLogin no`.
- Add firewall rules and fail2ban.
- Add Docker log rotation.
- Add a small swap file.
- Review root and user `authorized_keys`.
- Review running containers and exposed labels periodically.

Longer term:

- Add a scheduled security audit.
- Keep a lightweight incident runbook.
- Track service creation changes.
- Treat Docker group membership as root-level access.

---

## Lessons Learned

The most important lesson is simple:

> If a process name sounds boring, that does not mean it is safe.

Attackers do not need a dramatic process name. `systemguard` looked like something that could belong on a server. It did not.

The second lesson is that Docker is not a soft permission boundary on a VPS. If a user can control Docker, that user can usually become root on the host. That helped during cleanup, but it is also exactly why Docker exposure deserves the same caution as SSH exposure.

Finally, cleanup should be staged. It would have been easy to run an aggressive Docker prune and hope for the best. Instead, the safer path was:

1. Stop the active compromise
2. Close obvious exposure
3. Clean logs and caches
4. Avoid touching app data
5. Verify services after each step

That approach kept the apps running while removing the immediate threat.

---

## Closing Note

This was not a glamorous incident. It was a practical reminder that a small VPS still needs real operational hygiene.

Monitor the boring things. Check process names. Check ports. Keep logs long enough to answer hard questions. And never expose admin surfaces just because they are "only for internal tools."

