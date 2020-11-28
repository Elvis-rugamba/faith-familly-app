import React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';

import Block from '../Block';
import Text from '../Text';
import theme from '../../constants/theme';

const MusicsCard = ({ item, onPress, style }) => {
  const cardStyles = [styles.card, style && style];

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => onPress()}>
      <Block row style={cardStyles}>
        <Block style={styles.musicsImageBlock}>
          <Image
            style={styles.musicsImage}
            source={{ uri: item.cover }}
            resizeMethod="resize"
          />
        </Block>
        <Block flex={1} style={styles.musicsContentBlock}>
          <Text
            subtitle1
            bold
            color={theme.COLORS.BLACK}
            style={styles.musicsHeading}
            numberOfLines={1}>
            {item.name}
          </Text>
          <Text
            caption
            color={theme.COLORS.SECONDARY_TEXT}
            style={styles.musicsCaption}>
            {item.artist}
          </Text>
        </Block>
        <Block style={styles.musicsTimeBlock}>
          {/* <Text caption color={theme.COLORS.BLACK} style={styles.musicsTime}>
            03:05
          </Text> */}
        </Block>
      </Block>
    </TouchableOpacity>
  );
};

export default MusicsCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.COLORS.WHITE,
  },
  musicsImageBlock: {
    width: 40,
    height: 40,
    borderRadius: 50,
    borderColor: theme.COLORS.MUTED,
    borderWidth: 1,
  },
  musicsImage: {
    width: 'auto',
    height: '100%',
    borderRadius: 50,
  },
  musicsContentBlock: {
    paddingLeft: 16,
  },
  musicsHeading: {},
  musicsCaption: {
    lineHeight: 20,
  },
  musicsTimeBlock: {},
  musicsTime: {},
});
