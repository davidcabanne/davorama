// COLORS
//
export const clr_light = "#D2D1CB";
export const clr_dark = "#191718";

export const primary_000 = "#171717";
export const primary_010 = "#2e2e2e";
export const primary_020 = "#454545";
export const primary_030 = "#5d5d5d";
export const primary_040 = "#747474";
export const primary_050 = "#8b8b8b";
export const primary_060 = "#a2a2a2";
export const primary_070 = "#b9b9b9";
export const primary_080 = "#d1d1d1";
export const primary_090 = "#e8e8e8";
export const primary_100 = "#ffffff";

export const clr_danger = "#f34213";

// MEDIA QUERIES
//
const deviceSize = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  tablet: "768px",
  laptop: "1024px",
  laptopL: "1440px",
  desktop: "2560px",
};

export const device = {
  mobileS_min: `(min-width: ${deviceSize.mobileS})`,
  mobileM_min: `(min-width: ${deviceSize.mobileM})`,
  mobileL_min: `(min-width: ${deviceSize.mobileL})`,
  tablet_min: `(min-width: ${deviceSize.tablet})`,
  laptop_min: `(min-width: ${deviceSize.laptop})`,
  laptopL_min: `(min-width: ${deviceSize.laptopL})`,
  desktop_min: `(min-width: ${deviceSize.desktop})`,
  desktopL_min: `(min-width: ${deviceSize.desktop})`,
  mobileS_max: `(max-width: ${deviceSize.mobileS})`,
  mobileM_max: `(max-width: ${deviceSize.mobileM})`,
  mobileL_max: `(max-width: ${deviceSize.mobileL})`,
  tablet_max: `(max-width: ${deviceSize.tablet})`,
  laptop_max: `(max-width: ${deviceSize.laptop})`,
  laptopL_max: `(max-width: ${deviceSize.laptopL})`,
  desktop_max: `(max-width: ${deviceSize.desktop})`,
  desktopL_max: `(max-width: ${deviceSize.desktop})`,
};

// SPACING
//
export const spaceXS = "8px";
export const spaceS = "16px";
export const spaceM = "32px";
export const spaceML = "40px";
export const spaceL = "64px";
export const spaceXL = "128px";

export const headerHeight = "64px";

export const rootMargin = "0px 100% 0px 0px";
export const threshold = 0;

// ANIMATION STYLES
export const cubicBezier = "cubic-bezier(0.79, 0.14, 0.15, 0.86)";

// SHADOWS
//
export const cardShadowXSmall = `0 2px 5px -1px rgba(50, 50, 93, 0.25),
  0 1px 3px -1px rgba(0, 0, 0, 0.3)`;
export const cardShadowSmall = `0 6px 12px -2px rgba(50, 50, 93, 0.25),
  0 3px 7px -3px rgba(0, 0, 0, 0.3)`;
export const cardShadowMedium = `0 13px 27px -5px rgba(50, 50, 93, 0.25),
  0 8px 16px -8px rgba(0, 0, 0, 0.3)`;
export const cardShadowLarge = `0 30px 60px -12px rgba(50, 50, 93, 0.25),
  0 18px 36px -18px rgba(0, 0, 0, 0.3)`;
export const cardShadowLargeInset = `inset 0 30px 60px -12px rgba(50, 50, 93, 0.25),
  inset 0 18px 36px -18px rgba(0, 0, 0, 0.3)`;
export const cardShadowXLarge = `0 50px 100px -20px rgba(50, 50, 93, 0.25),
  0 30px 60px -30px rgba(0, 0, 0, 0.3)`;
