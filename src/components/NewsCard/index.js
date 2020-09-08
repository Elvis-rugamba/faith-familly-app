import React from 'react';
import { StyleSheet, TouchableOpacity, Platform } from 'react-native';

import Block from '../Block';
import Text from '../Text';
import theme from '../../constants/theme';

const NewsCard = ({ title, caption, onPress, style }) => {
  const cardStyles = [styles.card, style && style];

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => onPress()}>
      <Block row style={cardStyles}>
        <Block style={styles.newsImageBlock} />
        <Block flex={1} style={styles.newsContentBlock}>
          <Text
            subtitle1
            color={theme.COLORS.BLACK}
            style={styles.newsHeading}
            numberOfLines={2}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
          <Text
            caption
            color={theme.COLORS.SECONDARY}
            style={styles.newsCaption}>
            Gospel - 1m ago
          </Text>
        </Block>
      </Block>
    </TouchableOpacity>
  );
};

export default NewsCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.COLORS.WHITE,
    borderRadius: 8,
    ...Platform.select({
      android: { elevation: theme.SIZES.CARD_ELEVATION },
      ios: {
        shadowColor: theme.COLORS.CARD_SHADOW_COLOR,
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: theme.SIZES.CARD_SHADOW_OPACITY,
        shadowRadius: theme.SIZES.CARD_SHADOW_RADIUS,
      },
    }),
  },
  newsImageBlock: {
    width: 78,
    height: 78,
    borderRadius: 4,
    backgroundColor: theme.COLORS.PLACEHOLDER,
    borderColor: theme.COLORS.PRIMARY,
    borderWidth: 1,
  },
  newsContentBlock: {
    paddingLeft: 16,
  },
  newsHeading: {},
  newsCaption: {
    lineHeight: 20,
  },
});
