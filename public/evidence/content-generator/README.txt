Content Generator reliability evidence
Verified: 2026-09-05
Source revision: 00411bd5eba9ea2c1cbece3eee1d31dac2d3c40e

Scope
70 tests passed in five selected existing files using local Cloudflare Worker/D1 bindings and fake providers. No production data was mutated and no paid AI request was made by this verification.

Evidence map
- generation-durability.test.ts: overlapping claims; expired ownership; completed checkpoint reuse; ambiguous started request; late result fencing; refund failure before and after commit; lost settlement acknowledgement.
- generation-dispatcher.test.ts: durable delivery, ambiguous queue send and readiness acknowledgement.
- charged-operations.test.ts: debit, persisted result, application/refund exclusivity and recovery.
- astraflow-client.test.ts: provider response validation, cancellation, deadlines and retry hints.
- generation-queue-policy.test.ts: acknowledgement versus retry for typed queue outcomes.

Crash boundary limitation
Tests reconstruct persisted interruption states and expire ownership, then run recovery. They do not kill a production Worker. A passing test is evidence for its assertions, not a proof of exactly-once external billing or reliability at arbitrary scale.

Reproduce with access to the private source
Use the source revision above with its lockfile. Install using pnpm install --frozen-lockfile. From the repository root:

pnpm --filter @content-generator/api exec vitest run src/services/generation-durability.test.ts src/services/generation-dispatcher.test.ts src/services/charged-operations.test.ts src/services/astraflow-client.test.ts src/generation-queue-policy.test.ts --reporter=verbose

The portfolio repository also includes scripts/verify-content-generator.mjs, which accepts a local checkout path, records the source revision and refuses a dirty checkout. It writes sanitized test evidence only after a successful run. Node 22+ and the source repository's pnpm version are required. The test configuration uses fake providers and local D1 bindings. No production credentials are required for these tests.

Files
reliability-tests.txt: fresh selected-test output, reduced to test names and summary.
editor-success.png: earlier local browser evidence from the September 5 Effect remediation. Shows the editor and 88-credit balance. A screenshot alone cannot establish accounting correctness; API/database assertions establish that behavior.

Deployment
The September 5 release record reports successful database/API/web/admin deployment and basic HTTP/auth checks. A fresh read-only /health request returned HTTP 200 with {"ok":true}. The release did not validate live paid AI generation. The earlier remediation report predates this release; the two describe different verification stages.

The source repository is private. This public evidence pack contains selected personal-project details, not credentials, session data, real-user records, or private repository source.
