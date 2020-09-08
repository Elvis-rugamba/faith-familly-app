import React from 'react';
import { StyleSheet, View, FlatList, Platform } from 'react-native';

import { Block, Text, NewsCard } from '../../components';
import theme from '../../constants/theme';

const DATA = [
  {
    date: '1m',
    title: 'First Article',
  },
  {
    date: '1m',
    title: 'Second Article',
  },
  {
    date: '5m',
    title: 'Third Article',
  },
  {
    date: '1h',
    title: 'First Article',
  },
  {
    date: '1h',
    title: 'Second Article',
  },
  {
    date: '2h',
    title: 'Third Article',
  },
  {
    date: '4h',
    title: 'First Article',
  },
  {
    date: '4h',
    title: 'Second Article',
  },
  {
    date: '6h',
    title: 'Third Article',
  },
];

const NewsScreen = ({ navigation }) => {
  const renderHeaderComponent = () => (
    <Block flex={1} style={styles.headlineBlock}>
      <Text>Image</Text>
    </Block>
  );
  const renderItem = ({ item, index }) => (
    <NewsCard
      key={index}
      style={styles.newsCard}
      onPress={() => navigation.navigate('Details')}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeaderComponent}
        ListHeaderComponentStyle={styles.headerComponent}
      />
    </View>
  );
};

export default NewsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.COLORS.WHITE,
  },
  headerComponent: {
    padding: 16,
    backgroundColor: theme.COLORS.PLACEHOLDER,
  },
  headlineBlock: {
    height: 170,
    backgroundColor: theme.COLORS.WHITE,
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
  newsCard: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
});
