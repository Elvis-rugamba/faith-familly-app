import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Platform,
  ActivityIndicator,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Block, Text, NewsCard } from '../../components';
import theme from '../../constants/theme';
import config from '../../config/config';
import {
  getNewsByCategory,
  loadMoreNewsByCategory,
} from '../../store/modules/news/actions';
import {
  selectNewsByCategory,
  selectIsLoadingNews,
  selectIsLoadingMoreNews,
  selectErrorMessage,
} from '../../store/modules/news/selectors';
import { selectLanguage } from '../../store/modules/language/selectors';

const NewsScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { category } = route.params;
  const [page, setPage] = useState(1);
  const language = useSelector((state) => selectLanguage(state));
  const news = useSelector((state) => selectNewsByCategory(state));
  const isLoadingNews = useSelector((state) => selectIsLoadingNews(state));
  const isLoadingMoreNews = useSelector((state) =>
    selectIsLoadingMoreNews(state),
  );
  const errorMessage = useSelector((state) => selectErrorMessage(state));

  console.log(isLoadingNews, isLoadingMoreNews);

  useEffect(() => {
    dispatch(getNewsByCategory(category, page, language));
  }, [dispatch, category, page, language]);

  const handleRefresh = () => {
    setPage(1);
    dispatch(getNewsByCategory(category, page, language));
  };

  const handleLoadMore = () => {
    setPage(page + 1);
    dispatch(loadMoreNewsByCategory(category, page, language));
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

  const renderFooter = () =>
    isLoadingMoreNews ? (
      <View style={styles.loadMore}>
        <ActivityIndicator
          color={theme.COLORS.PRIMARY}
          animating
          size="large"
        />
      </View>
    ) : null;

  return (
    <View style={styles.container}>
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
          onRefresh={() => handleRefresh()}
          refreshing={isLoadingNews}
          onEndReached={() => handleLoadMore()}
          onEndReachedThreshold={0.5}
          ListFooterComponent={() => renderFooter()}
        />
      )}
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
});
