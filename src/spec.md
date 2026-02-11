# Specification

## Summary
**Goal:** Document and implement operator-facing support for connecting and verifying the satellite domains `x39matrix.com` and `www.x39matrix.com` to the existing Internet Computer frontend canister, while keeping `https://x39matrix.org` as the canonical domain and ensuring correct redirect/diagnostics behavior.

**Planned changes:**
- Update release documentation to include operator-ready steps for DNS setup and IC Dashboard custom-domain registration/verification for `x39matrix.com` and `www.x39matrix.com`, aligned with the canonical-domain strategy (`https://x39matrix.org`).
- Extend go-live runbook and launch verification checklist with explicit satellite-domain cutover checks, including expected behavior that `https://www.x39matrix.com` reaches the app and redirects to `https://x39matrix.org` while preserving path/query/hash.
- Enhance the in-app Domain & DNS verification UX to recognize when the app is accessed via `x39matrix.com`/`www.x39matrix.com`, clearly label them as satellite domains, and provide English guidance for common failure modes (DNS mismatch, default Nginx page, TLS delay, missing IC Dashboard registration).
- Update domain/connectivity diagnostics logic to be satellite-domain-aware for `x39matrix.com`/`www.x39matrix.com`, report whether current behavior matches the redirect strategy, and avoid redirect loops while preserving deep links.

**User-visible outcome:** Operators can follow English documentation to map and verify `x39matrix.com`/`www.x39matrix.com` to the deployed IC frontend and, when visiting via those domains, see diagnostics that correctly explain satellite-domain status and expected redirects to `https://x39matrix.org` (with deep links preserved).
