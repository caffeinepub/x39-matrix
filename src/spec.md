# Specification

## Summary
**Goal:** Add an in-app “Connectivity & Domain Diagnostics” view to help users verify reachability and domain consistency for https://x39matrix.com, plus a lightweight backend health endpoint for troubleshooting.

**Planned changes:**
- Add a user-accessible “Connectivity & Domain Diagnostics” view (reachable via a documented mechanism like a footer link or URL parameter).
- Display basic environment info in the view: current origin, HTTPS status, configured OFFICIAL_PORTAL_URL (https://x39matrix.com), and a client-side timestamp.
- Implement client-side diagnostics checks with pass/fail results and readable English error messages: canonical domain consistency and a browser-safe reachability test that loads a known static asset from https://x39matrix.com.
- Add a copy-to-clipboard button to export a compact diagnostics report (origin, HTTPS yes/no, check results).
- Implement a backend query health endpoint returning canister/server timestamp, canister identifier, and app version; show these values (or a clear error) in the Diagnostics view.

**User-visible outcome:** Users can open a Diagnostics screen to see whether they’re on the canonical domain, confirm basic asset/backend reachability for x39matrix.com, and copy a compact report to share for support/troubleshooting.
