# X39 Matrix - Release Handoff Document

This document provides a quick reference for release operators to locate all necessary documentation and assets for submitting X39 Matrix to Google Play Store and Apple App Store.

**Public Launch Date**: March 15, 2026

---

## 📚 Documentation Index

### Launch Operations

- **[Go-Live Runbook: March 15, 2026](../release/go-live-runbook-2026-03-15.en.md)** - Complete step-by-step launch sequence including custom domain cutover to x39matrix.org, verification, troubleshooting, and rollback procedures
- **[Launch Verification Checklist](../release/launch-verification-checklist.en.md)** - Post-cutover verification steps with concrete pass/fail criteria for TLS, redirects, robots.txt, sitemap.xml, and app availability
- **[Global Availability Readiness Checklist](../release/global-availability-readiness-checklist.md)** - Pre-launch verification for worldwide availability of https://x39matrix.org

### Domain & Infrastructure

- **[Domain Strategy & Hardening Guide](../release/domain-strategy-and-hardening.en.md)** - Canonical domain strategy (x39matrix.org as mother domain), satellite domains (x39dark.com, x39matrix.com), 301 redirect implementation, and SSL/HSTS verification steps

### Submission Guides

- **[Android Google Play Submission Guide](./android-google-play.md)** - Complete step-by-step guide for building AAB and submitting to Google Play Console
- **[iOS App Store Submission Guide](./ios-app-store.md)** - Complete step-by-step guide for building IPA and submitting to App Store Connect
- **[Store Listing Assets Mapping](./store-listing-assets.md)** - Comprehensive mapping of all required assets to upload slots

### Store Listing Copy

- **[Google Play Listing Copy](./store-listing-copy/google-play.en.md)** - Pre-written app name, descriptions, keywords, and promotional text for Google Play (March 15, 2026 launch date featured)
- **[iOS App Store Listing Copy](./store-listing-copy/ios-app-store.en.md)** - Pre-written app name, subtitle, description, keywords, and promotional text for App Store (March 15, 2026 launch date featured)

### Release Management

- **[Store Submission Checklist](../../release/store-submission-checklist.md)** - Comprehensive checklist covering all pre-build, build, upload, and post-submission steps
- **[Release Notes (English)](../../release/release-notes.en.md)** - Version 1.0.0 release notes for both stores (March 15, 2026 launch date featured)
- **[Release Status Tracker](../../release/release-status-tracker.md)** - Template for tracking submission dates and review status

---

## 🎨 Generated Store Assets

All required store assets are pre-generated and located in:

**`frontend/public/assets/generated/`**

### Android Assets (Google Play Console)

| Asset Type | Filename | Upload Slot | Dimensions |
|------------|----------|-------------|------------|
| App Icon | `android-app-icon.dim_512x512.png` | Store Listing → App icon | 512×512 |
| Adaptive Icon (Foreground) | `android-adaptive-foreground.dim_1024x1024.png` | Store Listing → Adaptive icon (foreground) | 1024×1024 |
| Adaptive Icon (Background) | `android-adaptive-background.dim_1024x1024.png` | Store Listing → Adaptive icon (background) | 1024×1024 |
| Feature Graphic | `play-feature-graphic.dim_1024x500.png` | Store Listing → Feature graphic | 1024×500 |

### iOS Assets (App Store Connect)

| Asset Type | Filename | Upload Slot | Dimensions |
|------------|----------|-------------|------------|
| App Icon | `app-icon.dim_1024x1024.png` | App Store → App Icon | 1024×1024 |
| iPhone 6.7" Screenshot 1 | `appstore-screenshot-1.dim_1290x2796.png` | App Store → iPhone 6.7" Display | 1290×2796 |
| iPhone 6.7" Screenshot 2 | `appstore-screenshot-2.dim_1290x2796.png` | App Store → iPhone 6.7" Display | 1290×2796 |
| iPhone 6.7" Screenshot 3 | `appstore-screenshot-3.dim_1290x2796.png` | App Store → iPhone 6.7" Display | 1290×2796 |

**Note**: For complete asset mapping and upload instructions, see **[Store Listing Assets Mapping](./store-listing-assets.md)**.

---

## 🛠️ Build Commands

### Android (AAB for Google Play)

