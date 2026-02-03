# Specification

## Summary
**Goal:** Prepare submission-ready Android (Google Play) and iOS (Apple App Store) release builds, plus a store asset pack with documented upload guidance.

**Planned changes:**
- Generate a Play Store–ready Android App Bundle (AAB) with reproducible build command(s), release package identifiers, and updated version name/code; provide artifact path(s) and short English release notes.
- Document and produce an iOS release archive suitable for App Store Connect submission, including step-by-step signing/provisioning instructions to export an IPA; include short English release notes.
- Add a repository “submission asset pack” under `frontend/public/assets/generated` containing required store visuals (icon(s), feature/promo graphic, and at least 3 screenshots) with exact filenames, plus an English README mapping assets to Google Play Console / App Store Connect fields.

**User-visible outcome:** The project can be built into Play Store (AAB) and App Store (archive/IPA export-ready) submission artifacts with clear versioned release notes and a ready-to-upload store listing asset pack.
