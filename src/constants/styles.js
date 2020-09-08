import { StyleSheet } from 'react-native';

import normalize from '../utils/normalize';

const textStyles = StyleSheet.create({
  headline1: {
    fontFamily: 'Roboto Light',
    fontSize: normalize(96),
    fontWeight: '300',
    letterSpacing: -1.5,
  },
  headline2: {
    fontFamily: 'Roboto Light',
    fontSize: normalize(60),
    fontWeight: '300',
    letterSpacing: -0.5,
  },
  headline3: {
    fontFamily: 'Roboto',
    fontSize: normalize(48),
    fontWeight: '400',
  },
  headline4: {
    fontFamily: 'Roboto',
    fontSize: normalize(34),
    fontWeight: '400',
    letterSpacing: 0.25,
  },
  headline5: {
    fontFamily: 'Roboto',
    fontSize: normalize(24),
    fontWeight: '400',
  },
  title: {
    fontFamily: 'Roboto Medium',
    fontSize: normalize(20),
    fontWeight: '500',
    letterSpacing: 0.15,
  },
  subtitle1: {
    fontFamily: 'Roboto',
    fontSize: normalize(16),
    fontWeight: '400',
    letterSpacing: 0.15,
    lineHeight: 24,
  },
  subtitle2: {
    fontFamily: 'Roboto Medium',
    fontSize: normalize(14),
    fontWeight: '500',
    letterSpacing: 0.1,
    lineHeight: 24,
  },
  body1: {
    fontFamily: 'Roboto',
    fontSize: normalize(16),
    fontWeight: '400',
    letterSpacing: 0.44,
    lineHeight: 28,
  },
  body2: {
    fontFamily: 'Roboto',
    fontSize: normalize(14),
    fontWeight: '400',
    letterSpacing: 0.25,
    lineHeight: 20,
  },
  button: {
    fontFamily: 'Roboto Medium',
    fontSize: normalize(14),
    fontWeight: '500',
    letterSpacing: 1.35,
  },
  caption: {
    fontFamily: 'Roboto',
    fontSize: normalize(12),
    fontWeight: '400',
    letterSpacing: 0.4,
    lineHeight: 16,
  },
  overline: {
    fontFamily: 'Roboto Medium',
    fontSize: normalize(10),
    fontWeight: '500',
    letterSpacing: 1.5,
    lineHeight: 16,
  },
});

export default textStyles;
