# X39 Matrix - Store Listing Assets

This document maps all required store listing assets to the pre-generated files in `frontend/public/assets/generated/`.

## 📱 Asset Inventory

All assets have been pre-generated and are ready for upload to Google Play Console and Apple App Store Connect.

### App Icons

#### Universal App Icon (1024×1024)
- **File**: `frontend/public/assets/generated/app-icon.dim_1024x1024.png`
- **Dimensions**: 1024×1024 pixels
- **Format**: PNG with transparency
- **Usage**: 
  - Apple App Store: Primary app icon
  - Google Play: High-resolution icon
  - Web: Social media preview, favicon source

#### Android Adaptive Icons (1024×1024 each)
- **Background**: `frontend/public/assets/generated/android-adaptive-background.dim_1024x1024.png`
  - Dimensions: 1024×1024 pixels
  - Format: PNG
  - Usage: Google Play Console → Store presence → App icon → Background layer
  
- **Foreground**: `frontend/public/assets/generated/android-adaptive-foreground.dim_1024x1024.png`
  - Dimensions: 1024×1024 pixels
  - Format: PNG with transparency
  - Usage: Google Play Console → Store presence → App icon → Foreground layer

### Feature Graphics

#### Google Play Feature Graphic (1024×500)
- **File**: `frontend/public/assets/generated/play-feature-graphic.dim_1024x500.png`
- **Dimensions**: 1024×500 pixels
- **Format**: PNG or JPEG
- **Usage**: Google Play Console → Store presence → Feature graphic
- **Note**: Displayed at the top of your store listing on Google Play

### Screenshots

#### Apple App Store Screenshots (1290×2796)
Three pre-generated screenshots optimized for iPhone 15 Pro Max and similar devices:

1. **Screenshot 1**: `frontend/public/assets/generated/appstore-screenshot-1.dim_1290x2796.png`
   - Dimensions: 1290×2796 pixels
   - Format: PNG or JPEG
   - Content: Portfolio/Staking interface showcase

2. **Screenshot 2**: `frontend/public/assets/generated/appstore-screenshot-2.dim_1290x2796.png`
   - Dimensions: 1290×2796 pixels
   - Format: PNG or JPEG
   - Content: Governance module showcase

3. **Screenshot 3**: `frontend/public/assets/generated/appstore-screenshot-3.dim_1290x2796.png`
   - Dimensions: 1290×2796 pixels
   - Format: PNG or JPEG
   - Content: Market intelligence dashboard showcase

**Upload Instructions**:
- App Store Connect → App Information → Screenshots
- Select "6.7" iPhone Display" (iPhone 15 Pro Max)
- Upload all three screenshots in order
- These screenshots will also work for other iPhone sizes (App Store will scale appropriately)

#### Google Play Screenshots
You can use the same three screenshots for Google Play:
- Google Play Console → Store presence → Phone screenshots
- Recommended dimensions: 1080×1920 or higher
- The 1290×2796 screenshots will work perfectly (Google Play accepts various aspect ratios)

## 📋 Upload Checklist

### Google Play Console

**Store Presence → App Icon**
- [ ] Upload `app-icon.dim_1024x1024.png` as high-resolution icon
- [ ] Upload `android-adaptive-background.dim_1024x1024.png` as background layer
- [ ] Upload `android-adaptive-foreground.dim_1024x1024.png` as foreground layer

**Store Presence → Feature Graphic**
- [ ] Upload `play-feature-graphic.dim_1024x500.png`

**Store Presence → Phone Screenshots**
- [ ] Upload `appstore-screenshot-1.dim_1290x2796.png`
- [ ] Upload `appstore-screenshot-2.dim_1290x2796.png`
- [ ] Upload `appstore-screenshot-3.dim_1290x2796.png`

### Apple App Store Connect

**App Information → App Icon**
- [ ] Upload `app-icon.dim_1024x1024.png`

**App Store → Screenshots (6.7" Display)**
- [ ] Upload `appstore-screenshot-1.dim_1290x2796.png`
- [ ] Upload `appstore-screenshot-2.dim_1290x2796.png`
- [ ] Upload `appstore-screenshot-3.dim_1290x2796.png`

## 🎨 Asset Specifications

### Technical Requirements

**App Icons**
- Format: PNG-24 with alpha channel (transparency)
- Color space: sRGB
- No rounded corners (platforms apply their own masks)
- No transparency in background layer (Android adaptive)

**Feature Graphic**
- Format: PNG or JPEG
- Max file size: 1 MB
- No transparency required
- Should be visually striking and represent your brand

**Screenshots**
- Format: PNG or JPEG
- Max file size: 8 MB per screenshot
- No alpha channel required
- Should showcase key features and UI

### Quality Guidelines

1. **Consistency**: All assets use the X39 Matrix triangular eye symbol and cyberpunk aesthetic
2. **Clarity**: High-resolution assets ensure crisp display on all devices
3. **Branding**: Consistent color scheme (black, red neon, blue accents)
4. **Compliance**: All assets meet platform requirements and guidelines

## 🔍 Asset Verification

Before uploading, verify each asset:

