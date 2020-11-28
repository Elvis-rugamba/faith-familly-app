import React, { useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Platform,
  Image,
  ActivityIndicator,
  Linking,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HTML from 'react-native-render-html';
import { WebView } from 'react-native-webview';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import i18n from '../../utils/i18n';

import { Block, Text, Divider, NewsCard } from '../../components';
import theme from '../../constants/theme';
import config from '../../config/config';
import {
  getSingleArticle,
  getRelatedArticles,
} from '../../store/modules/news/actions';
import {
  selectSingleArticle,
  selectRelatedArticles,
  selectIsLoadingArticle,
  selectErrorMessage,
} from '../../store/modules/news/selectors';

const { height, width } = Dimensions.get('window');
const DEFAULT_PROPS = {
  renderers: {
    oembed: () => (
      <WebView
        style={styles.WebViewContainer}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        source={{
          uri:
            'https://www.youtube.com/watch?v=mzXGamwggFY&amp;list=PLCL1mm9mxsAKOBd-61n2tbtQ1UdFiMFcB&amp;index=75',
        }}
      />
    ),
  },
  imagesMaxWidth: width - 32,
  onLinkPress(evt, href) {
    Linking.openURL(href);
  },
  debug: true,
};

const DetailsScreen = ({ route, navigation }) => {
  const { newsId, category } = route.params;
  const dispatch = useDispatch();
  const article = useSelector((state) => selectSingleArticle(state));
  const relatedArticles = useSelector((state) => selectRelatedArticles(state));
  const isLoadingArticle = useSelector((state) =>
    selectIsLoadingArticle(state),
  );
  const errorMessage = useSelector((state) => selectErrorMessage(state));

  useEffect(() => {
    dispatch(getSingleArticle(newsId, category));
    dispatch(getRelatedArticles(newsId, category));
  }, [dispatch, newsId, category]);

  console.log(article);

  return (
    <SafeAreaView style={styles.container}>
      {isLoadingArticle ? (
        <ActivityIndicator
          size="large"
          color={theme.COLORS.PRIMARY}
          style={styles.activityIndicator}
        />
      ) : (
        article && (
          <ScrollView>
            <Block width={width} style={styles.imageBlock}>
              <Image
                style={styles.newsImage}
                source={{ uri: article.image }}
                resizeMethod="resize"
              />
            </Block>
            <Block width={width} style={styles.contentBlock}>
              <Block flex={1} style={styles.categoryBlock}>
                <Block row style={styles.categoryTimeBlock}>
                  <Text
                    overline
                    color={theme.COLORS.SECONDARY}
                    style={styles.category}>
                    {article.category}
                  </Text>
                  <Text
                    overline
                    color={theme.COLORS.SECONDARY}
                    style={styles.time}>
                    {moment(article.created_at).format('YYYY-MM-DD HH:mm:ss')}
                  </Text>
                </Block>
                <Block row style={styles.authorBlock}>
                  <MaterialCommunityIcons
                    name="account"
                    color={theme.COLORS.SECONDARY}
                    size={theme.SIZES.NAVBAR_ICON_SIZE * 0.75}
                  />
                  <Text overline color={theme.COLORS.SECONDARY}>
                    {article.author}
                  </Text>
                </Block>
              </Block>
              <Block style={styles.headingBlock}>
                <Text h5 bold style={styles.title}>
                  {article.title}
                </Text>
                <Divider style={styles.divider} />
                <Text h6 bold style={styles.subtitle}>
                  {article.subtitle}
                </Text>
              </Block>
              <Block style={styles.descBlock}>
                <HTML html={article.bodyhtml} {...DEFAULT_PROPS} />
              </Block>
              <Block style={styles.relatedBlock}>
                <Text h5 bold style={styles.related}>
                  {i18n.t('relatedNewsLabel')}
                </Text>
                {relatedArticles &&
                  relatedArticles.length > 0 &&
                  relatedArticles.map((item, index) => (
                    <NewsCard
                      item={item}
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
                  ))}
              </Block>
            </Block>
          </ScrollView>
        )
      )}
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
  newsImage: {
    width: '100%',
    height: height / 2.5,
    resizeMode: 'stretch',
  },
  contentBlock: {
    paddingHorizontal: 16,
  },
  categoryBlock: {
    paddingVertical: 16,
  },
  categoryTimeBlock: {
    // padding: 4,
  },
  authorBlock: {
    alignItems: 'flex-end',
  },
  category: {
    paddingRight: 4,
    borderRightWidth: 1,
    borderRightColor: theme.COLORS.PRIMARY,
  },
  time: {
    paddingLeft: 4,
  },
  headingBlock: {},
  title: {
    paddingTop: 8,
    lineHeight: 30,
  },
  subtitle: {
    paddingTop: 16,
  },
  descBlock: {
    paddingVertical: 16,
  },
  related: {
    paddingVertical: 16,
  },
  newsCard: {
    marginVertical: 4,
  },
  divider: {
    height: 4,
    width: width / 5,
    backgroundColor: theme.COLORS.PRIMARY,
  },
  activityIndicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  webViewContainer: {
    height: height / 2.5,
    width: width - 32,
    marginTop: 20,
  },
});
