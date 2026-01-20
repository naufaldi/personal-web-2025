# Codex Execution Plans (ExecPlans):

This document describes the requirements for an execution plan ("ExecPlan"), a design document that a coding agent can follow to deliver a working feature or system change. Treat the reader as a complete beginner to this repository: they have only the current working tree and the single ExecPlan file you provide. There is no memory of prior plans and no external context.

## How to use ExecPlans and PLANS.md

When authoring an executable specification (ExecPlan), follow PLANS.md _to the letter_. If it is not in your context, refresh your memory by reading the entire PLANS.md file. Be thorough in reading (and re-reading) source material to produce an accurate specification. When creating a spec, start from the skeleton and flesh it out as you do your research.

When implementing an executable specification (ExecPlan), do not prompt the user for "next steps"; simply proceed to the next milestone. Keep all sections up to date, add or split entries in the list at every stopping point to affirmatively state the progress made and next steps. Resolve ambiguities autonomously, and commit frequently.

When discussing an executable specification (ExecPlan), record decisions in a log in the spec for posterity; it should be unambiguously clear why any change to the specification was made. ExecPlans are living documents, and it should always be possible to restart from _only_ the ExecPlan and no other work.

When researching a design with challenging requirements or significant unknowns, use milestones to implement proof of concepts, "toy implementations", etc., that allow validating whether the user's proposal is feasible. Read the source code of libraries by finding or acquiring them, research deeply, and include prototypes to guide a fuller implementation.

## Requirements

NON-NEGOTIABLE REQUIREMENTS:

- Every ExecPlan must be fully self-contained. Self-contained means that in its current form it contains all knowledge and instructions needed for a novice to succeed.
- Every ExecPlan is a living document. Contributors are required to revise it as progress is made, as discoveries occur, and as design decisions are finalized. Each revision must remain fully self-contained.
- Every ExecPlan must enable a complete novice to implement the feature end-to-end without prior knowledge of this repo.
- Every ExecPlan must produce a demonstrably working behavior, not merely code changes to "meet a definition".
- Every ExecPlan must define every term of art in plain language or do not use it.

Purpose and intent come first. Begin by explaining, in a few sentences, why the work matters from a user's perspective: what someone can do after this change that they could not do before, and how to see it working. Then guide the reader through the exact steps to achieve that outcome, including what to edit, what to run, and what they should observe.

The agent executing your plan can list files, read files, search, run the project, and run tests. It does not know any prior context and cannot infer what you meant from earlier milestones. Repeat any assumption you rely on. Do not point to external blogs or docs; if knowledge is required, embed it in the plan itself in your own words. If an ExecPlan builds upon a prior ExecPlan and that file is checked in, incorporate it by reference. If it is not, you must include all relevant context from that plan.

## Formatting

Format and envelope are simple and strict. Each ExecPlan must be one single fenced code block labeled as `md` that begins and ends with triple backticks. Do not nest additional triple-backtick code fences inside; when you need to show commands, transcripts, diffs, or code, present them as indented blocks within that single fence. Use indentation for clarity rather than code fences inside an ExecPlan to avoid prematurely closing the ExecPlan's code fence. Use two newlines after every heading, use # and ## and so on, and correct syntax for ordered and unordered lists.

When writing an ExecPlan to a Markdown (.md) file where the content of the file _is only_ the single ExecPlan, you should omit the triple backticks.

Write in plain prose. Prefer sentences over lists. Avoid checklists, tables, and long enumerations unless brevity would obscure meaning. Checklists are permitted only in the `Progress` section, where they are mandatory. Narrative sections must remain prose-first.

## Guidelines

Self-containment and plain language are paramount. If you introduce a phrase that is not ordinary English ("daemon", "middleware", "RPC gateway", "filter graph"), define it immediately and remind the reader how it manifests in this repository (for example, by naming the files or commands where it appears). Do not say "as defined previously" or "according to the architecture doc." Include the needed explanation here, even if you repeat yourself.

Avoid common failure modes. Do not rely on undefined jargon. Do not describe "the letter of a feature" so narrowly that the resulting code compiles but does nothing meaningful. Do not outsource key decisions to the reader. When ambiguity exists, resolve it in the plan itself and explain why you chose that path. Err on the side of over-explaining user-visible effects and under-specifying incidental implementation details.

Anchor the plan with observable outcomes. State what the user can do after implementation, the commands to run, and the outputs they should see. Acceptance should be phrased as behavior a human can verify ("after starting the server, navigating to [http://localhost:8080/health](http://localhost:8080/health) returns HTTP 200 with body OK") rather than internal attributes ("added a HealthCheck struct"). If a change is internal, explain how its impact can still be demonstrated (for example, by running tests that fail before and pass after, and by showing a scenario that uses the new behavior).

Specify repository context explicitly. Name files with full repository-relative paths, name functions and modules precisely, and describe where new files should be created. If touching multiple areas, include a short orientation paragraph that explains how those parts fit together so a novice can navigate confidently. When running commands, show the working directory and exact command line. When outcomes depend on environment, state the assumptions and provide alternatives when reasonable.

Be idempotent and safe. Write the steps so they can be run multiple times without causing damage or drift. If a step can fail halfway, include how to retry or adapt. If a migration or destructive operation is necessary, spell out backups or safe fallbacks. Prefer additive, testable changes that can be validated as you go.

Validation is not optional. Include instructions to run tests, to start the system if applicable, and to observe it doing something useful. Describe comprehensive testing for any new features or capabilities. Include expected outputs and error messages so a novice can tell success from failure. Where possible, show how to prove that the change is effective beyond compilation (for example, through a small end-to-end scenario, a CLI invocation, or an HTTP request/response transcript). State the exact test commands appropriate to the project’s toolchain and how to interpret their results.

Capture evidence. When your steps produce terminal output, short diffs, or logs, include them inside the single fenced block as indented examples. Keep them concise and focused on what proves success. If you need to include a patch, prefer file-scoped diffs or small excerpts that a reader can recreate by following your instructions rather than pasting large blobs.

## Milestones

Milestones are narrative, not bureaucracy. If you break the work into milestones, introduce each with a brief paragraph that describes the scope, what will exist at the end of the milestone that did not exist before, the commands to run, and the acceptance you expect to observe. Keep it readable as a story: goal, work, result, proof. Progress and milestones are distinct: milestones tell the story, progress tracks granular work. Both must exist. Never abbreviate a milestone merely for the sake of brevity, do not leave out details that could be crucial to a future implementation.

Each milestone must be independently verifiable and incrementally implement the overall goal of the execution plan.

## Living plans and design decisions

- ExecPlans are living documents. As you make key design decisions, update the plan to record both the decision and the thinking behind it. Record all decisions in the `Decision Log` section.
- ExecPlans must contain and maintain a `Progress` section, a `Surprises & Discoveries` section, a `Decision Log`, and an `Outcomes & Retrospective` section. These are not optional.
- When you discover optimizer behavior, performance tradeoffs, unexpected bugs, or inverse/unapply semantics that shaped your approach, capture those observations in the `Surprises & Discoveries` section with short evidence snippets (test output is ideal).
- If you change course mid-implementation, document why in the `Decision Log` and reflect the implications in `Progress`. Plans are guides for the next contributor as much as checklists for you.
- At completion of a major task or the full plan, write an `Outcomes & Retrospective` entry summarizing what was achieved, what remains, and lessons learned.

# Prototyping milestones and parallel implementations

It is acceptable—-and often encouraged—-to include explicit prototyping milestones when they de-risk a larger change. Examples: adding a low-level operator to a dependency to validate feasibility, or exploring two composition orders while measuring optimizer effects. Keep prototypes additive and testable. Clearly label the scope as “prototyping”; describe how to run and observe results; and state the criteria for promoting or discarding the prototype.

Prefer additive code changes followed by subtractions that keep tests passing. Parallel implementations (e.g., keeping an adapter alongside an older path during migration) are fine when they reduce risk or enable tests to continue passing during a large migration. Describe how to validate both paths and how to retire one safely with tests. When working with multiple new libraries or feature areas, consider creating spikes that evaluate the feasibility of these features _independently_ of one another, proving that the external library performs as expected and implements the features we need in isolation.

## Workdocs-First ExecPlans and Plan Mode

ExecPlans MUST integrate with a Workdocs-first planning workflow. The following rules apply in addition to all requirements above.

### Workdocs-First storage

- For each significant feature or change, create a folder under:
  - `todo/work/<yyyy-mm-dd>-<feature-key>/`
- Within that folder:
  - `plan.md` contains the accepted ExecPlan snapshot for that feature/update.
  - `todos.md` is the authoritative task list derived from the ExecPlan.
- Parallel folders for clearly separated sub-features are allowed using distinct `<feature-key>` values (for example `2025-01-10-search`, `2025-01-10-cart-pricing`), as long as each folder remains self-contained and references this `PLANS.md`.

### ExecPlan and tasks linkage

Each ExecPlan stored in `plan.md` MUST:

- Be fully self-contained as defined in this `PLANS.md`.
- Explicitly reference:
  - This `PLANS.md` file by repository-relative path.
  - Its corresponding `todos.md` file path.
- Define tasks with:
  - Stable, kebab-case, feature-prefixed IDs (for example `devicecard-optimistic-state`).
  - Clear statuses chosen from: `pending`, `in_progress`, `completed`, `cancelled`.
  - At most one task marked `in_progress` at any time.

The `todos.md` format may be free-form markdown, provided:

- Each task’s ID is unambiguous and stable.
- Each task’s status is explicitly visible alongside or within the task entry.
- The mapping from ExecPlan sections to task IDs is clear to a novice reader.

### Plan mode (planning-only behavior)

When operating in a planning role for an ExecPlan:

- Only create or update:
  - `todo/work/.../plan.md` (the ExecPlan), and
  - `todo/work/.../todos.md` (the task list).
- Do not modify application code, configuration, or other repository files as part of planning.
- Ensure that:
  - Tasks in `todos.md` are derived from the ExecPlan.
  - Task IDs are stable before any implementation work begins.
  - Exactly one task is designated as `in_progress` when handing off to implementation.

Before implementation starts, the planner MUST:

- Ask the developer/user concise clarifying questions where requirements, constraints, or success criteria are ambiguous.
- Confirm scope and direction with the developer/user.
- Only after that confirmation should any implementation work be performed according to the ExecPlan and `todos.md`.

## Skeleton of a Good ExecPlan

```md
# <Short, action-oriented description>

This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds.

If PLANS.md file is checked into the repo, reference the path to that file here from the repository root and note that this document must be maintained in accordance with PLANS.md.

## Purpose / Big Picture

Explain in a few sentences what someone gains after this change and how they can see it working. State the user-visible behavior you will enable.

## Progress

Use a list with checkboxes to summarize granular steps. Every stopping point must be documented here, even if it requires splitting a partially completed task into two (“done” vs. “remaining”). This section must always reflect the actual current state of the work.

- [x] (2025-10-01 13:00Z) Example completed step.
- [ ] Example incomplete step.
- [ ] Example partially completed step (completed: X; remaining: Y).

Use timestamps to measure rates of progress.

## Surprises & Discoveries

Document unexpected behaviors, bugs, optimizations, or insights discovered during implementation. Provide concise evidence.

- Observation: …
  Evidence: …

## Decision Log

Record every decision made while working on the plan in the format:

- Decision: …
  Rationale: …
  Date/Author: …

## Outcomes & Retrospective

Summarize outcomes, gaps, and lessons learned at major milestones or at completion. Compare the result against the original purpose.

## Context and Orientation

Describe the current state relevant to this task as if the reader knows nothing. Name the key files and modules by full path. Define any non-obvious term you will use. Do not refer to prior plans.

## Plan of Work

Describe, in prose, the sequence of edits and additions. For each edit, name the file and location (function, module) and what to insert or change. Keep it concrete and minimal.

## Concrete Steps

State the exact commands to run and where to run them (working directory). When a command generates output, show a short expected transcript so the reader can compare. This section must be updated as work proceeds.

## Validation and Acceptance

Describe how to start or exercise the system and what to observe. Phrase acceptance as behavior, with specific inputs and outputs. If tests are involved, say "run <project’s test command> and expect <N> passed; the new test <name> fails before the change and passes after>".

## Idempotence and Recovery

If steps can be repeated safely, say so. If a step is risky, provide a safe retry or rollback path. Keep the environment clean after completion.

## Artifacts and Notes

Include the most important transcripts, diffs, or snippets as indented examples. Keep them concise and focused on what proves success.

## Interfaces and Dependencies

Be prescriptive. Name the libraries, modules, and services to use and why. Specify the types, traits/interfaces, and function signatures that must exist at the end of the milestone. Prefer stable names and paths such as `crate::module::function` or `package.submodule.Interface`. E.g.:

In crates/foo/planner.rs, define:

    pub trait Planner {
        fn plan(&self, observed: &Observed) -> Vec<Action>;
    }
```

If you follow the guidance above, a single, stateless agent -- or a human novice -- can read your ExecPlan from top to bottom and produce a working, observable result. That is the bar: SELF-CONTAINED, SELF-SUFFICIENT, NOVICE-GUIDING, OUTCOME-FOCUSED.

When you revise a plan, you must ensure your changes are comprehensively reflected across all sections, including the living document sections, and you must write a note at the bottom of the plan describing the change and the reason why. ExecPlans must describe not just the what but the why for almost everything.

---

# K3S COMPROMISE INCIDENT DOCUMENTATION - 2025-12-08

**CRITICAL SECURITY INCIDENT - K3S FOUND ON DOCKER-ONLY VPS**

## Incident Overview

**Date Discovered**: December 8, 2025  
**Affected System**: Production VPS (Docker-based web applications)  
**Attack Vector**: CVE-2025-66478 (Next.js RCE vulnerability)  
**Compromise Type**: k3s server installation as persistence/C&C mechanism with cryptomining activity  
**Status**: CRITICAL - Immediate removal executed

## Root Cause Analysis

The attack was initiated through **CVE-2025-66478**, a critical (CVSS 10.0) Remote Code Execution vulnerability in Next.js React Server Components disclosed on December 3, 2025. This vulnerability allows attackers to execute arbitrary code on servers running vulnerable Next.js versions (15.x and 16.x).

### Attack Progression

1. **Initial Compromise**: Exploitation of Next.js RCE vulnerability (CVE-2025-66478)
2. **Persistence Installation**: Installation of k3s server as autostart service
3. **Malicious Deployment**: Deployment of cryptomining or other malicious workloads via k3s
4. **Resource Hijacking**: k3s processes consuming 400%+ CPU across multiple cores
5. **Survival Mechanism**: Configured to automatically start on system reboot

## Discovery Indicators

### Primary Symptoms (Observed in htop screenshots)

1. **Unexpected k3s Processes**:
   - Multiple `/usr/local/bin/k3s server` processes running as root
   - Process PID 2004989 consuming **422.4% CPU** (>4 full cores)
   - Other instances consuming 92.5%, 91.8%, 88.0%, 65.1%, 62.5% CPU
   - Processes running for extremely long durations (6270h, 174h, 306h)

2. **System Resource Exhaustion**:
   - CPU cores at 81.1%, 76.6%, **100.0%**, and 91.4%
   - Load average: 2.76 3.21 3.45 (system overloaded)
   - 88 tasks, 398 threads; 5 running tasks (all k3s-related)

3. **Persistence After Reboot**:
   - k3s processes returned within 1 minute 31 seconds of VPS reboot
   - Processes PID 832 (98.4% CPU) and PID 883 (97.6% CPU)
   - Confirmed autostart via systemd service

4. **Architecture Mismatch**:
   - System deployed using **Docker only** (no Kubernetes intended)
   - k3s not part of application architecture
   - Docker socket proxy exposed on port 2375 (additional security risk)

## Complete Remediation Procedure

### Step 1: Immediate Process Termination

```bash
# Kill all k3s processes immediately
sudo killall -9 k3s
sudo pkill -f k3s

# Verify processes are stopped
ps aux | grep k3s
# Expected: No output (no k3s processes)
```

### Step 2: Service Removal

```bash
# Stop and disable the k3s service
sudo systemctl stop k3s
sudo systemctl disable k3s

# Remove service files
sudo rm -rf /etc/systemd/system/k3s.service
sudo rm -rf /etc/systemd/system/multi-user.target.wants/k3s.service
sudo systemctl daemon-reload

# Verify service removal
systemctl list-unit-files | grep k3s
# Expected: No output
```

### Step 3: Complete k3s Uninstallation

```bash
# Official k3s uninstaller
sudo /usr/local/bin/k3s-uninstall.sh

# Manual cleanup (if uninstaller fails)
sudo rm -rf /usr/local/bin/k3s
sudo rm -rf /etc/rancher/k3s/
sudo rm -rf /var/lib/rancher/k3s/
sudo rm -rf /var/lib/kubelet/
sudo rm -rf /etc/kubernetes/

# Verify binaries removed
which k3s
# Expected: "not found"

ls -la /usr/local/bin/k3s
# Expected: No such file or directory
```

### Step 4: Docker Environment Cleanup

```bash
# Stop all containers temporarily
docker stop $(docker ps -aq)

# Remove k3s-related containers
docker rm -f $(docker ps -aq --filter "name=k3s")

# Clean up unused Docker resources
docker system prune -af --volumes

# Restart legitimate containers
docker-compose up -d
# Or individually:
docker start personal-web-v5-app-1
docker start viralkan-app_web_1
docker start viralkan-app_api_1
docker start pangan-postgres
docker start guestbook-guestbook-1
docker start guestbook-db-1
docker start image-extract-app-1
docker start edge-proxy-caddy-1
```

### Step 5: Remove Persistence Mechanisms

```bash
# Check and clean cron jobs
sudo crontab -l | grep -v k3s | sudo crontab -
sudo crontab -u root -l | grep -v k3s | sudo crontab -u root -

# Search for k3s references in startup scripts
sudo grep -r "k3s" /etc/init.d/ 2>/dev/null
sudo grep -r "k3s" /usr/local/bin/ 2>/dev/null
sudo grep -r "k3s" /root/.bashrc 2>/dev/null
sudo grep -r "k3s" /home/*/.bashrc 2>/dev/null
sudo grep -r "k3s" /etc/systemd/system/ 2>/dev/null
```

### Step 6: Address Additional Security Risks

```bash
# Block Docker socket proxy port 2375 (critical security risk)
sudo iptables -A INPUT -p tcp --dport 2375 -j DROP
sudo iptables -A OUTPUT -p tcp --dport 2375 -j DROP

# Alternatively, remove the container entirely
docker stop edge-proxy-socket-proxy-1
docker rm edge-proxy-socket-proxy-1
```

## Verification Checklist

After remediation, verify complete k3s removal:

```bash
# These should all return empty/nothing
ps aux | grep k3s
systemctl list-unit-files | grep k3s
which k3s
ls -la /usr/local/bin/k3s
ls -la /etc/rancher/k3s/

# Monitor CPU usage
htop
# Expected: Normal CPU usage without k3s spikes
```

## Post-Incident Actions

### 1. Next.js Vulnerability Remediation

Check all Next.js applications and update to patched versions:

```bash
# Check Next.js version in containers
docker exec personal-web-v5-app-1 cat package.json | grep '"next"'
docker exec viralkan-app_web_1 cat package.json | grep '"next"'

# Update to patched versions:
# Next.js 15.x → 15.0.5, 15.1.9, 15.2.6, 15.3.6, 15.4.8, or 15.5.7
# Next.js 16.x → 16.0.7 or later

# Or use automated tool
npx fix-react2shell-next
```

### 2. Security Hardening Measures

- **Remove Docker Socket Exposure**: Never expose Docker daemon directly
- **Network Segmentation**: Implement proper firewall rules
- **Container Security**: Use minimal base images, implement least-privilege
- **Regular Updates**: Keep all dependencies patched
- **Security Monitoring**: Deploy IDS/IPS, set up alerts for unusual processes

### 3. Monitoring and Prevention

```bash
# Monitor for k3s reappearance
watch -n 1 'ps aux | grep k3s'

# Set up CPU usage alerts
# Configure monitoring for:
# - Unexpected process launches
# - High CPU/memory usage
# - New network connections
# - Docker socket access
```

## Key Lessons Learned

1. **Attack Vector**: CVE-2025-66478 (Next.js RCE) actively exploited within days of disclosure
2. **Persistence**: k3s installed as systemd service, survives reboots
3. **Detection**: Unusually high CPU usage (k3s processes) is primary indicator
4. **Architecture Mismatch**: Unexpected system components (k3s in Docker-only environment) are critical red flags
5. **Complete Removal Required**: Must remove service files, binaries, cron jobs, and all persistence mechanisms

## Prevention Strategy

### Immediate Actions

- Update all Next.js applications to patched versions
- Remove unnecessary Docker socket exposure
- Implement network firewall rules
- Deploy process monitoring alerts

### Long-term Security Posture

- Regular security audits
- Automated dependency scanning
- Container image vulnerability scanning
- Intrusion detection systems (IDS)
- Regular log analysis and review
- Incident response plan testing

## Related Vulnerabilities and References

- **CVE-2025-66478**: https://nextjs.org/blog/CVE-2025-66478
- **CVE-2025-55182** (React RSC): https://react.dev/blog/2025/12/03/critical-security-vulnerability-in-react-server-components
- **k3s C&C Attack**: https://blog.christophetd.fr/using-k3s-for-command-and-control-on-compromised-linux-hosts/
- **Kubernetes Cryptomining**: https://unit42.paloaltonetworks.com/cve-2025-55182-react-and-cve-2025-66478-next/

## Final Status

**INCIDENT RESOLVED**: Complete k3s removal verified. All compromised processes terminated. System secured.

**Next Steps**: Update Next.js applications, implement security monitoring, conduct full security audit.

---

**Document Version**: 1.0  
**Last Updated**: December 8, 2025  
**Maintained By**: Security Team
