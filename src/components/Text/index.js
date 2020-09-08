import React from 'react';
import { Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import normalize from '../../utils/normalize';
import theme from '../../constants/theme';

const Typography = ({
  style,
  h1,
  h2,
  h3,
  h4,
  h5,
  title,
  subtitle1,
  subtitle2,
  body1,
  body2,
  button,
  caption,
  overline,
  muted,
  neutral,
  size,
  color,
  bold,
  italic,
  center,
  children,
  ...rest
}) => (
  <Text
    style={[
      h1 && styles.h1,
      h2 && styles.h2,
      h3 && styles.h3,
      h4 && styles.h4,
      h5 && styles.h5,
      title && styles.title,
      subtitle1 && styles.subtitle1,
      subtitle2 && styles.subtitle2,
      body1 && styles.body1,
      body2 && styles.body2,
      button && styles.button,
      caption && styles.caption,
      overline && styles.overline,
      muted && { color: theme.COLORS.MUTED },
      neutral && { color: theme.COLORS.NEUTRAL },
      size && { fontSize: size },
      color && { color },
      italic && styles.italic,
      bold && styles.bold,
      center && styles.center,
      style && style,
    ]}
    {...rest}>
    {children}
  </Text>
);

Typography.defaultProps = {
  children: null,
  style: null,
  h1: false,
  h2: false,
  h3: false,
  h4: false,
  h5: false,
  title: false,
  subtitle1: false,
  subtitle2: false,
  body1: false,
  body2: false,
  button: false,
  caption: false,
  overline: false,
  size: 0,
  color: null,
  muted: false,
  bold: false,
  italic: false,
};

Typography.propTypes = {
  children: PropTypes.any,
  style: PropTypes.any,
  h1: PropTypes.bool,
  h2: PropTypes.bool,
  h3: PropTypes.bool,
  h4: PropTypes.bool,
  h5: PropTypes.bool,
  title: PropTypes.bool,
  subtitle1: PropTypes.bool,
  subtitle2: PropTypes.bool,
  body1: PropTypes.bool,
  body2: PropTypes.bool,
  button: PropTypes.bool,
  caption: PropTypes.bool,
  overline: PropTypes.bool,
  size: PropTypes.number,
  color: PropTypes.string,
  muted: PropTypes.bool,
  bold: PropTypes.bool,
  italic: PropTypes.bool,
};

const styles = StyleSheet.create({
  h1: {
    fontSize: normalize(theme.SIZES.H1),
    fontWeight: '300',
    letterSpacing: theme.SIZES.H1_LETTER_SPACING,
    lineHeight: theme.SIZES.H1_LINE_HEIGHT,
  },
  h2: {
    fontSize: normalize(theme.SIZES.H2),
    fontWeight: '300',
    letterSpacing: theme.SIZES.H2_LETTER_SPACING,
    lineHeight: theme.SIZES.H2_LINE_HEIGHT,
  },
  h3: {
    fontSize: normalize(theme.SIZES.H3),
    lineHeight: theme.SIZES.H3_LINE_HEIGHT,
  },
  h4: {
    fontSize: normalize(theme.SIZES.H4),
    lineHeight: theme.SIZES.H4_LINE_HEIGHT,
  },
  h5: {
    fontSize: normalize(theme.SIZES.H5),
    letterSpacing: theme.SIZES.H5_LETTER_SPACING,
    lineHeight: theme.SIZES.H5_LINE_HEIGHT,
  },
  title: {
    fontSize: normalize(theme.SIZES.TITLE),
    fontWeight: '500',
    letterSpacing: theme.SIZES.TITLE_LETTER_SPACING,
    lineHeight: theme.SIZES.TITLE_LINE_HEIGHT,
  },
  subtitle1: {
    fontSize: normalize(theme.SIZES.SUBTITLE_1),
    letterSpacing: theme.SIZES.SUBTITLE_1_LETTER_SPACING,
    lineHeight: theme.SIZES.SUBTITLE_1_LINE_HEIGHT,
  },
  subtitle2: {
    fontSize: normalize(theme.SIZES.SUBTITLE_2),
    fontWeight: '500',
    letterSpacing: theme.SIZES.SUBTITLE_2_LETTER_SPACING,
    lineHeight: theme.SIZES.SUBTITLE_2_LINE_HEIGHT,
  },
  body1: {
    fontSize: normalize(theme.SIZES.BODY_1),
    letterSpacing: theme.SIZES.BODY_1_LETTER_SPACING,
    lineHeight: theme.SIZES.BODY_1_LINE_HEIGHT,
  },
  body2: {
    fontSize: normalize(theme.SIZES.BODY_2),
    letterSpacing: theme.SIZES.H1_LETTER_SPACING,
    lineHeight: theme.SIZES.H1_LINE_HEIGHT,
  },
  button: {
    fontSize: normalize(theme.SIZES.BUTTON),
    fontWeight: '500',
    letterSpacing: theme.SIZES.BUTTON_LETTER_SPACING,
    lineHeight: theme.SIZES.BUTTON_LINE_HEIGHT,
  },
  caption: {
    fontSize: normalize(theme.SIZES.CAPTION),
    letterSpacing: theme.SIZES.CAPTION_LETTER_SPACING,
    lineHeight: theme.SIZES.CAPTION_LINE_HEIGHT,
  },
  overline: {
    fontSize: normalize(theme.SIZES.OVERLINE),
    fontWeight: '500',
    letterSpacing: theme.SIZES.OVERLINE_LETTER_SPACING,
    lineHeight: theme.SIZES.OVERLINE_LINE_HEIGHT,
  },
  italic: { fontStyle: 'italic' },
  bold: { fontWeight: 'bold' },
  center: { textAlign: 'center' },
});

export default Typography;
