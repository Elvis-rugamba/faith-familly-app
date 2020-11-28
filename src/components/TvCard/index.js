import React from 'react';
import { StyleSheet, TouchableOpacity, Platform, Image } from 'react-native';
import moment from 'moment';

import Block from '../Block';
import Text from '../Text';
import theme from '../../constants/theme';

const TvCard = ({ item, onPress, style }) => {
  const cardStyles = [styles.card, style && style];

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => onPress()}>
      <Block row style={cardStyles}>
        <Block style={styles.coverBlock}>
          <Image
            style={styles.cover}
            source={{ uri: item.cover }}
            resizeMethod="resize"
          />
        </Block>
        <Block flex={1} style={styles.contentBlock}>
          <Text
            color={theme.COLORS.BLACK}
            style={styles.heading}
            numberOfLines={2}>
            {item.title} {item.title} {item.title} {item.title} {item.title}{' '}
            {item.title}
          </Text>
          <Text color={theme.COLORS.SECONDARY} style={styles.caption}>
            {item.category} -{' '}
            {moment(item.created_at).format('YYYY-MM-DD HH:mm:ss')}
          </Text>
        </Block>
      </Block>
    </TouchableOpacity>
  );
};

export default TvCard;

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
  coverBlock: {
    width: 50,
    height: 50,
    borderRadius: 4,
    backgroundColor: theme.COLORS.PLACEHOLDER,
    borderColor: theme.COLORS.SECONDARY,
    borderWidth: 1,
  },
  cover: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
  contentBlock: {
    paddingLeft: 16,
  },
  heading: {
    fontSize: 14,
  },
  caption: {
    fontSize: 12,
    lineHeight: 20,
  },
});
