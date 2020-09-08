import React from 'react';
import { StyleSheet, View, Dimensions, Platform } from 'react-native';

import { Block, Text } from '../../components';
import theme from '../../constants/theme';

const { height, width } = Dimensions.get('window');

const MusicPlayerScreen = () => {
  return (
    <View style={styles.container}>
      <Block width={width} style={styles.detailsBlock}>
        <Block style={styles.imageBlock}>
          <Text>Image</Text>
        </Block>
        <Block flex={1} style={styles.songContentBlock}>
          <Text
            title
            bold
            color={theme.COLORS.PRIMARY}
            style={styles.songHeading}>
            Song name
          </Text>
          <Text
            body2
            color={theme.COLORS.SECONDARY_TEXT}
            style={styles.songBody}>
            Artist name
          </Text>
        </Block>
      </Block>
    </View>
  );
};

export default MusicPlayerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.COLORS.WHITE, // '#A5AEBA',
  },
  detailsBlock: {
    paddingHorizontal: 40,
    paddingVertical: 16,
  },
  imageBlock: {
    height: 280,
    backgroundColor: theme.COLORS.PLACEHOLDER,
    borderRadius: 16,
    ...Platform.select({
      android: { elevation: theme.SIZES.CARD_ELEVATION },
      ios: {
        shadowColor: theme.COLORS.CARD_SHADOW_COLOR,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 8,
      },
    }),
  },
  songContentBlock: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  songHeading: {},
  songBody: {
    lineHeight: 20,
  },
});
