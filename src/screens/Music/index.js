import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Searchbar, Chip } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import i18n from '../../utils/i18n';

import { Block, MusicsCard, Divider } from '../../components';
import theme from '../../constants/theme';
import { getAllMusics, getCategories } from '../../store/modules/music/actions';
import {
  selectMusics,
  selectCategories,
  selectIsLoadingMusics,
  selectIsLoadingCategories,
  selectErrorMessage,
} from '../../store/modules/music/selectors';
import { selectLanguage } from '../../store/modules/language/selectors';

const { width } = Dimensions.get('window');

const MusicScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const language = useSelector((state) => selectLanguage(state));
  const musics = useSelector((state) => selectMusics(state));
  const categories = useSelector((state) => selectCategories(state));
  const isLoadingMusics = useSelector((state) => selectIsLoadingMusics(state));
  const isLoadingCategories = useSelector((state) =>
    selectIsLoadingCategories(state),
  );
  const errorMessage = useSelector((state) => selectErrorMessage(state));

  useEffect(() => {
    dispatch(getAllMusics());
    dispatch(getCategories());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(getAllMusics());
    dispatch(getCategories());
  };

  const onChangeSearch = (query) => setSearchQuery(query);

  const renderItem = ({ item, index }) => (
    <MusicsCard
      key={`music-${index}`}
      item={item}
      style={styles.musicsCard}
      onPress={() => navigation.navigate('Music player', { item, index })}
    />
  );

  const renderSeparator = () => <Divider style={styles.separator} />;

  return (
    <View style={styles.container}>
      <Block width={width} style={styles.searchBlock}>
        <Searchbar
          placeholder={i18n.t('searchLabel')}
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchBar}
        />
      </Block>
      {isLoadingMusics || isLoadingCategories ? (
        <ActivityIndicator
          size="large"
          color={theme.COLORS.PRIMARY}
          style={styles.activityIndicator}
        />
      ) : (
        <View>
          {categories && categories.length > 0 && (
            <Block width={width} style={styles.chipBlock}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.chipScroll}>
                {categories.map((item, index) => (
                  <Chip
                    key={`music-${index}`}
                    style={styles.chip}
                    textStyle={styles.chipText}
                    onPress={() => console.log('Pressed')}>
                    {language === 'ki-RW'
                      ? item.rwandan_name
                      : language === 'en-GB'
                      ? item.category_name
                      : language === 'fr-FR'
                      ? item.french_name
                      : item.rwandan_name}
                  </Chip>
                ))}
              </ScrollView>
            </Block>
          )}
          <FlatList
            data={musics}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={renderSeparator}
            onRefresh={() => handleRefresh()}
            refreshing={isLoadingMusics || isLoadingCategories}
          />
        </View>
      )}
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
  chipBlock: {
    paddingVertical: 12,
  },
  chipScroll: {
    paddingHorizontal: 12,
  },
  chip: {
    margin: 4,
  },
  chipText: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.COLORS.BLACK,
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
  activityIndicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
