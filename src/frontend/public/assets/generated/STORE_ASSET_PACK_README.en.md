# X39 Matrix - Store Asset Pack

This folder contains all required assets for Google Play Store and Apple App Store submissions.

## 📱 Asset Inventory

### App Icons

**app-icon.dim_1024x1024.png**
- **Dimensions:** 1024×1024 pixels
- **Format:** PNG with transparency
- **Usage:** 
  - Google Play: High-res icon
  - App Store: App icon
  - Web: Favicon and social preview
- **Description:** Triangle-with-eye mark on dark background

### Android-Specific Assets

**android-adaptive-foreground.dim_1024x1024.png**
- **Dimensions:** 1024×1024 pixels
- **Format:** PNG with transparency
- **Usage:** Google Play adaptive icon foreground layer
- **Description:** Triangle-with-eye mark only, transparent background
- **Note:** Must work with various mask shapes (circle, squircle, rounded square)

**android-adaptive-background.dim_1024x1024.png**
- **Dimensions:** 1024×1024 pixels
- **Format:** PNG
- **Usage:** Google Play adaptive icon background layer
- **Description:** Subtle dark tech pattern
- **Note:** Should complement foreground without competing for attention

**play-feature-graphic.dim_1024x500.png**
- **Dimensions:** 1024×500 pixels
- **Format:** PNG or JPEG
- **Usage:** Google Play Store feature graphic (banner)
- **Description:** Dark cyber/tech banner with triangle-with-eye mark and minimal title text
- **Note:** Displayed prominently in Play Store listing

### iOS-Specific Assets

**appstore-screenshot-1.dim_1290x2796.png**
- **Dimensions:** 1290×2796 pixels (iPhone 6.7" display)
- **Format:** PNG or JPEG
- **Usage:** App Store screenshot 1
- **Description:** Dark cyberpunk UI mock screenshot with title area and device frame
- **Note:** First screenshot is most important for conversion

**appstore-screenshot-2.dim_1290x2796.png**
- **Dimensions:** 1290×2796 pixels (iPhone 6.7" display)
- **Format:** PNG or JPEG
- **Usage:** App Store screenshot 2
- **Description:** Dark cyberpunk UI mock screenshot with title area and device frame

**appstore-screenshot-3.dim_1290x2796.png**
- **Dimensions:** 1290×2796 pixels (iPhone 6.7" display)
- **Format:** PNG or JPEG
- **Usage:** App Store screenshot 3
- **Description:** Dark cyberpunk UI mock screenshot with title area and device frame

## 🎯 Upload Mapping

### Google Play Console

1. **Store Listing** → **Graphic assets**
   - **App icon:** Upload `app-icon.dim_1024x1024.png`
   - **Feature graphic:** Upload `play-feature-graphic.dim_1024x500.png`

2. **Store Listing** → **Phone screenshots**
   - Upload at least 2 screenshots (you can use iOS screenshots or create Android-specific ones)

3. **App releases** → **Production** → **App bundle**
   - **Adaptive icon:** Configured in Android project using:
     - Foreground: `android-adaptive-foreground.dim_1024x1024.png`
     - Background: `android-adaptive-background.dim_1024x1024.png`

### App Store Connect

1. **App Information** → **App Icon**
   - Upload `app-icon.dim_1024x1024.png`

2. **Version Information** → **Screenshots**
   - **iPhone 6.7" Display:**
     - Upload `appstore-screenshot-1.dim_1290x2796.png`
     - Upload `appstore-screenshot-2.dim_1290x2796.png`
     - Upload `appstore-screenshot-3.dim_1290x2796.png`
   - **Note:** You need at least 3 screenshots for the largest device size

3. **Additional Sizes (Optional but Recommended)**
   - Create and upload screenshots for other device sizes:
     - iPhone 6.5" Display: 1284×2778
     - iPhone 5.5" Display: 1242×2208
     - iPad Pro (6th Gen) 12.9": 2048×2732

## 🎨 Design Guidelines

### Brand Identity
- **Primary Symbol:** Triangle with eye (X39 Matrix iconic mark)
- **Color Palette:** Dark backgrounds with neon red/blue accents
- **Style:** Cyberpunk, Matrix-inspired, futuristic tech aesthetic

### Icon Design Principles
- **Recognizable:** Triangle-eye symbol is distinctive and memorable
- **Scalable:** Works at all sizes from 16px to 1024px
- **Consistent:** Maintains brand identity across all platforms
- **Dark Theme:** Optimized for dark mode interfaces

### Screenshot Guidelines
- **Showcase Key Features:** Portfolio, Staking, Governance
- **Professional Quality:** High-resolution, no pixelation
- **Consistent Branding:** Use X39 Matrix color scheme and typography
- **Device Frames:** Include device frames for context (optional but recommended)
- **Text Overlays:** Add feature descriptions or benefits (keep minimal)

## ✅ Quality Checklist

Before uploading assets, verify:

- [ ] All files are in correct dimensions
- [ ] PNG files have transparency where needed
- [ ] No compression artifacts or pixelation
- [ ] Colors are consistent with brand guidelines
- [ ] Text is readable at all sizes
- [ ] Icons work on both light and dark backgrounds
- [ ] Screenshots show actual app functionality
- [ ] All assets follow platform-specific guidelines

## 📐 Technical Specifications

### File Formats
- **Icons:** PNG with alpha channel (transparency)
- **Feature Graphic:** PNG or JPEG (PNG preferred for quality)
- **Screenshots:** PNG or JPEG (PNG preferred for quality)

### Color Space
- **sRGB** color space for all assets
- Avoid using CMYK or other color spaces

### File Size
- Keep individual files under 5MB for faster uploads
- Optimize images without sacrificing quality

## 🔄 Asset Updates

When updating assets for new releases:

1. Maintain consistent branding and style
2. Update version-specific screenshots if UI changes significantly
3. Keep file naming convention: `[asset-name].dim_[width]x[height].png`
4. Update this README if new assets are added
5. Archive old assets in a separate folder for reference

## 📞 Support

For questions about store assets:
- Review platform-specific guidelines:
  - [Google Play Asset Guidelines](https://support.google.com/googleplay/android-developer/answer/9866151)
  - [App Store Screenshot Specifications](https://developer.apple.com/help/app-store-connect/reference/screenshot-specifications)
- Check submission guides in `frontend/docs/store-submission/`

---

**Asset Pack Version:** 1.0.0  
**Last Updated:** February 3, 2026  
**Total Assets:** 7 files
