# My five-minute reliability walkthrough

## 0:00 — Start with the user

Content Generator creates an editable carousel. Generation also reserves credits, so an interrupted request has consequences beyond an error message.

Show the project case study and its verification status. Explain that the application was deployed, while the failure scenarios use local Worker/D1 tests with fake providers. I am not presenting a paid-provider production outage test.

## 0:45 — Follow one operation

Use the architecture diagram. Follow the editor request into the API, durable job journal, queue, worker, and saved result. Explain which state survives a stopped process.

## 1:30 — Make the failure concrete

In a clean private Content Generator checkout, run the portfolio reproduction script:

```sh
bun scripts/verify-content-generator.mjs /absolute/path/to/content-generator
```

Run it from the portfolio repository after installing the Content Generator lockfile dependencies with pnpm. It takes a local path, refuses a dirty source checkout, and records the revision alongside sanitized results. The public evidence guide lists the equivalent direct test command.

Highlight these existing tests:

- `claims atomically and blocks an overlapping delivery from its provider`: two deliveries, one provider invocation at the checkpoint.
- `reuses a durable paid result after lease expiry and fences the old owner`: reuse the saved result and reject the old owner.
- `recovers after-refund-commit with one refund and no extra provider request`: simulate a lost response after refund commit and assert one ledger refund.
- `records ambiguous in-flight results without repeating the paid call`: preserve uncertainty rather than repeat a paid operation.

The tests reconstruct interruption boundaries. They do not kill a production Worker. The refund fixture includes the initial invalid-JSON call and one repair call; the assertion is that recovery adds no further provider calls, not that the entire fixture calls the provider once.

## 3:30 — Bring it back to the interface

Show the earlier local editor screenshot. Explain the stale sidebar balance: the stored session changed, but its consumer was not subscribed. A reactive subscription connected the visible balance to the updated session state. The screenshot shows the UI; database and API checks establish the accounting behavior.

## 4:15 — Explain the tradeoff

Durable state adds writes and recovery paths. I accepted that cost because an error handler cannot recover after its process is gone. I also prefer an explicit uncertain result over a blind retry that may repeat paid work.

## 4:45 — State the limit

The remaining evidence is live-provider verification and operating measurements. I am not claiming uptime, usage, customer savings, or exactly-once behavior from this demo.
