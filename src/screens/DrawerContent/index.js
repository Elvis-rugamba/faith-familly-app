import React from 'react';
import {
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useSelector } from 'react-redux';
import i18n from '../../utils/i18n';

import { Block, Text } from '../../components';

import theme from '../../constants/theme';
import normalize from '../../utils/normalize';
import {
  selectCategories,
  selectIsLoadingCategories,
  selectErrorMessage,
} from '../../store/modules/news/selectors';
import { selectLanguage } from '../../store/modules/language/selectors';

const { height } = Dimensions.get('window');

const DrawerContent = (props) => {
  const language = useSelector((state) => selectLanguage(state));
  const categories = useSelector((state) => selectCategories(state));
  const isLoadingCategories = useSelector((state) =>
    selectIsLoadingCategories(state),
  );
  const errorMessage = useSelector((state) => selectErrorMessage(state));

  return (
    <Block flex={1} style={styles.container}>
      <Block style={styles.content}>
        <Block style={styles.header}>
          <Block style={styles.headerImageBlock}>
            <Image
              style={styles.headerImage}
              source={require('../../../assets/logo.png')}
            />
          </Block>
        </Block>
        <ScrollView>
          <Block style={styles.section}>
            {isLoadingCategories ? (
              <ActivityIndicator
                size="large"
                color={theme.COLORS.PRIMARY}
                style={styles.activityIndicator}
              />
            ) : (
              categories &&
              categories.length > 0 &&
              categories.map((category, index) => (
                <TouchableOpacity
                  key={`category-${index}`}
                  activeOpacity={0.8}
                  style={styles.drawerItem}
                  onPress={() =>
                    props.navigation.navigate('News', {
                      category: category.category_name,
                      title:
                        language === 'ki-RW'
                          ? category.rwandan_name
                          : language === 'en-GB'
                          ? category.category_name
                          : language === 'fr-FR'
                          ? category.french_name
                          : category.rwandan_name,
                    })
                  }>
                  <Text subtitle1 style={styles.label}>
                    {language === 'ki-RW'
                      ? category.rwandan_name
                      : language === 'en-GB'
                      ? category.category_name
                      : language === 'fr-FR'
                      ? category.french_name
                      : category.rwandan_name}
                  </Text>
                </TouchableOpacity>
              ))
            )}
          </Block>
          <Block style={styles.bottomSection}>
            <Block style={styles.drawerItem}>
              <Text color={theme.COLORS.SECONDARY} style={styles.copyright}>
                {i18n.t('copyrightLabel')} {'\u00A9'} 2020 Abba Gospel
              </Text>
            </Block>
          </Block>
        </ScrollView>
      </Block>
    </Block>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.WHITE,
  },
  content: {
    flex: 1,
  },
  header: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    justifyContent: 'space-between',
  },
  headerImageBlock: {
    backgroundColor: theme.COLORS.PRIMARY,
    padding: 20,
  },
  headerImage: {
    height: 80,
    width: '100%',
  },
  headerTextBlock: {
    // borderBottomColor: '#ECECEC',
    // borderBottomWidth: 2,
  },
  headerText: {
    paddingTop: 32,
    paddingBottom: 8,
    padding: 16,
  },
  section: {
    flex: 1,
    paddingVertical: 16,
  },
  drawerItem: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    // borderBottomColor: '#ececec',
    // borderBottomWidth: theme.SIZES.BORDER_WIDTH,
  },
  label: {
    fontWeight: '700',
    color: theme.COLORS.SECONDARY,
    textTransform: 'uppercase',
  },
  bottomSection: {
    borderTopColor: '#ECECEC',
    borderTopWidth: 2,
  },
  copyright: {
    fontSize: normalize(14),
    letterSpacing: theme.SIZES.SUBTITLE_1_LETTER_SPACING,
    lineHeight: theme.SIZES.SUBTITLE_1_LINE_HEIGHT,
  },
});
