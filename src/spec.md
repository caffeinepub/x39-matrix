# Specification

## Summary
**Goal:** Replace all green accent styling in the X39 Matrix launch section with a celestial sky blue while keeping existing red accents unchanged.

**Planned changes:**
- Update `frontend/src/components/X39MatrixLaunchHeroBlock.tsx` to swap all green Tailwind accent classes (text/border/gradient stops) and any green glow/text-shadow RGBA values to celestial sky blue equivalents, preserving layout and copy.
- Update the launch CTA gradient so the start color is celestial sky blue and still blends into red (no green gradient stops remain).
- Update supporting cards in the hero so any green borders/icons/headings become celestial sky blue, keeping the middle red card unchanged.
- Update `frontend/src/components/X39MatrixLaunchAmbientEffects.tsx` so any green code-rain/particle colors are replaced with celestial sky blue while red particles remain red, preserving reduced-motion behavior.

**User-visible outcome:** The launch hero and its ambient effects no longer show green accents; they use a celestial sky blue accent alongside the existing red styling, with no other behavior or layout changes.
