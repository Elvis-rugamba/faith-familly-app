import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Platform,
  ActivityIndicator,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Block, Text, NewsCard } from '../../components';
import theme from '../../constants/theme';
import config from '../../config/config';
import {
  getAllNews,
  loadMoreNews,
  getCategories,
} from '../../store/modules/news/actions';
import {
  selectNews,
  selectNewsToRender,
  selectIsLoadingNews,
  selectIsLoadingMoreNews,
  selectIsLoadingCategories,
  selectErrorMessage,
} from '../../store/modules/news/selectors';
import { selectLanguage } from '../../store/modules/language/selectors';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const language = useSelector((state) => selectLanguage(state));
  const news = useSelector((state) => selectNews(state));
  const newsToRender = useSelector((state) => selectNewsToRender(state));
  const isLoadingNews = useSelector((state) => selectIsLoadingNews(state));
  const isLoadingMoreNews = useSelector((state) =>
    selectIsLoadingMoreNews(state),
  );
  const isLoadingCategories = useSelector((state) =>
    selectIsLoadingCategories(state),
  );
  const errorMessage = useSelector((state) => selectErrorMessage(state));

  useEffect(() => {
    dispatch(getAllNews(page, language));
    dispatch(getCategories());
  }, [dispatch, page, language]);

  const handleRefresh = () => {
    setPage(1);
    dispatch(getAllNews(page, language));
    dispatch(getCategories());
  };

  const handleLoadMore = () => {
    setPage(page + 1);
    dispatch(loadMoreNews(page, language));
  };

  const renderHeaderComponent = () =>
    news &&
    news.length > 0 && (
      <Block flex={1} style={styles.headlineBlock}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate('Details', {
              newsId: news[0].news_id,
              title: news[0].title,
              category: news[0].category,
              link: `${config.hostUrl}/article?locale=${news[0].language}&slug=${news[0].news_id}`,
            })
          }
          // style={styles.headlineBlock}
        >
          <Block flex={1}>
            <Image
              source={{ uri: news[0].image }}
              style={styles.headlineImage}
            />
          </Block>
          <Block flex={1} style={styles.headlineTextBlock}>
            <Text
              subtitle1
              bold
              color={theme.COLORS.BLACK}
              numberOfLines={2}
              center
              style={styles.headlineText}>
              {news[0].title}
            </Text>
          </Block>
        </TouchableOpacity>
      </Block>
    );

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
      {isLoadingNews || isLoadingCategories ? (
        <ActivityIndicator
          size="large"
          color={theme.COLORS.PRIMARY}
          style={styles.activityIndicator}
        />
      ) : (
        <FlatList
          data={newsToRender}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={renderHeaderComponent}
          ListHeaderComponentStyle={styles.headerComponent}
          onRefresh={() => handleRefresh()}
          refreshing={isLoadingNews || isLoadingCategories}
          onEndReached={() => handleLoadMore()}
          onEndReachedThreshold={0.5}
          ListFooterComponent={() => renderFooter()}
        />
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.COLORS.WHITE,
  },
  headerComponent: {
    padding: 8,
    paddingHorizontal: 8,
    // backgroundColor: theme.COLORS.PLACEHOLDER,
  },
  headlineBlock: {
    flex: 1,
    // height: 270,
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
    backgroundColor: theme.COLORS.WHITE,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  headlineText: {
    padding: 16,
    backgroundColor: theme.COLORS.WHITE,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  headlineImage: {
    width: '100%',
    height: 200,
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
