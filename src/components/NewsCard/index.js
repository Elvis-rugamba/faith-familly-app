import React from 'react';
import { StyleSheet, TouchableOpacity, Platform, Image } from 'react-native';
import moment from 'moment';

import Block from '../Block';
import Text from '../Text';
import theme from '../../constants/theme';

const NewsCard = ({ item, onPress, style }) => {
  const cardStyles = [styles.card, style && style];

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => onPress()}>
      <Block row style={cardStyles}>
        <Block style={styles.newsImageBlock}>
          <Image
            style={styles.newsImage}
            source={{ uri: item.image }}
            resizeMethod="resize"
          />
        </Block>
        <Block flex={1} style={styles.newsContentBlock}>
          <Text
            subtitle1
            color={theme.COLORS.BLACK}
            style={styles.newsHeading}
            numberOfLines={2}>
            {item.title}
          </Text>
          <Text
            caption
            color={theme.COLORS.SECONDARY}
            style={styles.newsCaption}>
            {item.category} -{' '}
            {moment(item.created_at).format('YYYY-MM-DD HH:mm:ss')}
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
    borderColor: theme.COLORS.SECONDARY,
    borderWidth: 1,
  },
  newsImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
  newsContentBlock: {
    paddingLeft: 16,
  },
  newsHeading: {},
  newsCaption: {
    lineHeight: 20,
  },
});
