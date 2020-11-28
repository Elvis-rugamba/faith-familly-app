import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import i18n from '../../utils/i18n';

import { Block, Text, Divider } from '../../components';
import theme from '../../constants/theme';
import config from '../../config/config';
import { setLanguage } from '../../store/modules/language/actions';
import { selectLanguage } from '../../store/modules/language/selectors';

const { height, width } = Dimensions.get('window');

const SettingsScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const [lang, setLang] = useState('ki-RW');
  const language = useSelector((state) => selectLanguage(state));

  const onLanguageChange = (value) => {
    i18n.locale = value;
    setLang(value);
    dispatch(setLanguage(value));
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Block width={width} style={styles.contentBlock}>
          <Block style={styles.settingsBlock}>
            <Text
              title
              bold
              color={theme.COLORS.SECONDARY}
              style={styles.title}>
              {i18n.t('languageLabel')}
            </Text>
            <Block style={styles.itemsBlock}>
              <RadioButton.Group
                onValueChange={(newValue) => onLanguageChange(newValue)}
                value={language}>
                <Block flex={1} row style={styles.itemBlock}>
                  <RadioButton value="ki-RW" color={theme.COLORS.PRIMARY} />
                  <Text body1>Kinyarwanda</Text>
                </Block>
                <Block flex={1} row style={styles.itemBlock}>
                  <RadioButton value="en-GB" color={theme.COLORS.PRIMARY} />
                  <Text body1>English</Text>
                </Block>
                <Block flex={1} row style={styles.itemBlock}>
                  <RadioButton value="fr-FR" color={theme.COLORS.PRIMARY} />
                  <Text body1>French</Text>
                </Block>
              </RadioButton.Group>
            </Block>
          </Block>
        </Block>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;

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
    padding: 16,
  },
  itemsBlock: {
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  itemBlock: {
    alignItems: 'center',
  },
  categoryTimeBlock: {
    // padding: 4,
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
    // paddingTop: 8,
    // lineHeight: 30,
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
