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

const NewsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
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
    dispatch(getAllNews());
    dispatch(getCategories());
  }, [dispatch]);

  const handleRefresh = () => {
    setPage(1);
    dispatch(getAllNews());
    dispatch(getCategories());
  };

  const handleLoadMore = () => {
    setPage(page + 1);
    dispatch(loadMoreNews(page));
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
            })
          }
          // style={styles.headlineBlock}
        >
          <ImageBackground
            source={{ uri: news[0].image }}
            style={styles.headlineImage}
          />
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
    marginHorizontal: 16,
    marginVertical: 8,
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
