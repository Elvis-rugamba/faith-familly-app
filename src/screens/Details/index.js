import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';

import { Block, Text, Divider } from '../../components';
import theme from '../../constants/theme';

const { height, width } = Dimensions.get('window');

const DetailsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Block width={width} style={styles.imageBlock}>
          <Text>Image</Text>
        </Block>
        <Block width={width} style={styles.contentBlock}>
          <Block flex={1} style={styles.categoryBlock}>
            <Text overline color={theme.COLORS.SECONDARY}>
              GOSPEL
            </Text>
          </Block>
          <Block style={styles.headingBlock}>
            <Text h3>Lorem ipsum dolor sit amet.</Text>
            <Divider style={styles.divider} />
          </Block>
          <Block style={styles.descBlock}>
            <Text body1>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
              ultrices augue lorem, eu luctus ligula mollis sed. Phasellus
              dictum tellus venenatis leo viverra, ac varius nunc interdum.
              Maecenas tincidunt vulputate leo et tincidunt. Sed faucibus leo ut
              libero pharetra sollicitudin. Integer sit amet nisl nisl. Nunc eu
              dui a dui venenatis tempor. Aliquam cursus vitae nisl eu sagittis.
              Maecenas feugiat nunc eu bibendum pretium. Sed non ex ante.
            </Text>
          </Block>
        </Block>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageBlock: {
    height: height / 2.5,
    backgroundColor: theme.COLORS.PLACEHOLDER,
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
  contentBlock: {
    paddingHorizontal: 16,
  },
  categoryBlock: {
    paddingVertical: 16,
  },
  headingBlock: {
    paddingVertical: 16,
  },
  descBlock: {
    paddingVertical: 16,
  },
  divider: {
    height: 4,
    width: width / 5,
    backgroundColor: theme.COLORS.PRIMARY,
  },
});
