export const THEME = {
  DEFAULT: '#B23AFC',
  PRIMARY: '#032A63',
  PRIMARY_VARIANT: '#0786B4',
  SECONDARY: '#AAB2BD',
  INFO: '#1232FF',
  ERROR: '#FE2472',
  WARNING: '#FF9C09',
  SUCCESS: '#45DF31',
  BACKGROUND: '#FFFFFF',
  SURFACE: '#FFFFFF',
};

export const COMPONENTS = {
  INPUT: '#808080',
  PLACEHOLDER: '#9FA5AA',
  NAVBAR: '#A1EA19E6',
  BLOCK: '#808080',
  ICON: '#000000',
  CARD_SHADOW_COLOR: 'rgba(0, 0, 0, 0.12)',
  SECONDARY_TEXT: 'rgba(0, 0, 0, 0.6)',
};

const COLORS = {
  WHITE: '#FFFFFF',
  BLACK: '#000000',
  GREY: '#898989',
  MUTED: '#9FA5AA',
  TRANSPARENT: 'transparent',
  NEUTRAL: 'rgba(255,255,255, 0.65)',
  ...COMPONENTS,
  ...THEME,
};

export default COLORS;