import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Dimensions } from 'react-native';
import { Searchbar } from 'react-native-paper';

import { Block, MusicsCard, Divider } from '../../components';
import theme from '../../constants/theme';

const { width } = Dimensions.get('window');

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

const MusicScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = (query) => setSearchQuery(query);

  const renderItem = ({ item, index }) => (
    <MusicsCard
      key={index}
      style={styles.musicsCard}
      onPress={() => navigation.navigate('Music player')}
    />
  );

  const renderSeparator = () => <Divider style={styles.separator} />;

  return (
    <View style={styles.container}>
      <Block width={width} style={styles.searchBlock}>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchBar}
        />
      </Block>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={renderSeparator}
      />
    </View>
  );
};

export default MusicScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.COLORS.WHITE,
  },
  searchBlock: {
    padding: 16,
    backgroundColor: theme.COLORS.PRIMARY,
  },
  searchBar: {
    // backgroundColor: '#FFF',
  },
  musicsCard: {
    marginVertical: 8,
  },
  separator: {
    width: width - 16 * 2 - 40,
    alignSelf: 'flex-end',
  },
});
