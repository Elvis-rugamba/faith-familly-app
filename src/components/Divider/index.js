import React from 'react';
import { StyleSheet } from 'react-native';

import Block from '../Block';

const Divider = ({ style }) => {
  const dividerStyles = [styles.divider, style && style];

  return <Block style={dividerStyles} />;
};

export default Divider;

const styles = StyleSheet.create({
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.12)',
  },
});
