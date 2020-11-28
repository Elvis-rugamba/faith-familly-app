import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  Platform,
  ActivityIndicator,
  Dimensions,
  StatusBar,
} from 'react-native';
import { Searchbar, Chip } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import i18n from '../../utils/i18n';

import { Block, Text, NewsCard } from '../../components';
import theme from '../../constants/theme';
import config from '../../config/config';
import { searchNews, searchMoreNews } from '../../store/modules/news/actions';
import {
  selectResults,
  selectIsLoadingNews,
  selectIsLoadingMoreNews,
  selectErrorMessage,
} from '../../store/modules/news/selectors';
import { selectLanguage } from '../../store/modules/language/selectors';

const { width } = Dimensions.get('window');

const SearchScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  // const { category } = route.params;
  const [query, setQuery] = useState('');
  const language = useSelector((state) => selectLanguage(state));
  const news = useSelector((state) => selectResults(state));
  const isLoadingNews = useSelector((state) => selectIsLoadingNews(state));
  const isLoadingMoreNews = useSelector((state) =>
    selectIsLoadingMoreNews(state),
  );
  const errorMessage = useSelector((state) => selectErrorMessage(state));

  const onChangeQuery = (value) => setQuery(value);

  const handleSearch = () => {
    dispatch(searchNews(query, language));
  };

  const renderItem = ({ item, index }) => {
    const data = item;
    return (
      <NewsCard
        item={data}
        key={`news-${index}`}
        style={styles.newsCard}
        onPress={() =>
          navigation.navigate('Details', {
            newsId: item.news_id,
            title: item.title,
            category: item.category,
            link: `${config.hostUrl}/article?locale=${item.language}&slug=${item.news_id}`,
          })
        }
      />
    );
  };

  const renderEmpty = () => {
    return (
      <Block flex={1} style={styles.listEmpty}>
        <Text body1 bold color={theme.COLORS.SECONDARY}>
          {i18n.t('errorMessage404Route')}
        </Text>
      </Block>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.COLORS.PRIMARY}
        animated
      />
      <Block width={width} style={styles.searchBlock}>
        <Searchbar
          placeholder={i18n.t('searchLabel')}
          autoFocus={true}
          icon="arrow-left"
          iconColor={theme.COLORS.PRIMARY}
          onChangeText={onChangeQuery}
          value={query}
          onIconPress={() => navigation.goBack()}
          onSubmitEditing={() => handleSearch()}
          style={styles.searchBar}
        />
      </Block>
      {isLoadingNews ? (
        <ActivityIndicator
          size="large"
          color={theme.COLORS.PRIMARY}
          style={styles.activityIndicator}
        />
      ) : (
        <FlatList
          data={news}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          onRefresh={() => handleSearch()}
          refreshing={isLoadingNews}
          ListEmptyComponent={renderEmpty}
        />
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.COLORS.WHITE,
  },
  headerComponent: {
    padding: 16,
    paddingHorizontal: 4,
    // backgroundColor: theme.COLORS.PLACEHOLDER,
  },
  headlineBlock: {
    height: 270,
    backgroundColor: theme.COLORS.WHITE,
    borderRadius: 16,
    // borderWidth: 1,
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
  headlineTextBlock: {
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,1)',
  },
  headlineText: {
    padding: 8,
    backgroundColor: 'rgba(250,250,250,0.3)',
  },
  headlineImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
    borderRadius: 16,
    overflow: 'hidden',
  },
  newsCard: {
    margin: 8,
  },
  activityIndicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadMore: {
    paddingVertical: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  listEmpty: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
});
