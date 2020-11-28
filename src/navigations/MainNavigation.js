import React from 'react';
import { StatusBar, Image, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import i18n from '../utils/i18n';
import {
  HomeScreen,
  NewsScreen,
  TvScreen,
  RadioScreen,
  MusicScreen,
  DetailsScreen,
  MusicPlayerScreen,
  TvPlayerScreen,
  SearchScreen,
  SettingsScreen,
  DrawerContent,
} from '../screens';
import { ShareButton, Block } from '../components';
import theme from '../constants/theme';
import share from '../utils/share';
import { selectLanguage } from '../store/modules/language/selectors';

const LogoTitle = () => (
  <Image
    style={{ width: 100, height: 50 }}
    source={require('../../assets/logo.png')}
  />
);

const NewsStack = createStackNavigator();
const NewsStackScreen = ({ navigation }) => (
  <NewsStack.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerStyle: {
        backgroundColor: theme.COLORS.PRIMARY,
      },
      headerTintColor: theme.COLORS.WHITE,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <NewsStack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        headerTitle: (props) => <LogoTitle {...props} />,
        headerLeft: () => (
          <MaterialCommunityIcons
            name="menu"
            color="#fff"
            size={theme.SIZES.NAVBAR_ICON_SIZE * 1.25}
            onPress={() => navigation.openDrawer()}
          />
        ),
        headerRight: () => (
          <Block flex={1} row space="between" style={{ alignItems: 'center' }}>
            <MaterialCommunityIcons
              name="magnify"
              color="#fff"
              size={theme.SIZES.NAVBAR_ICON_SIZE * 1.25}
              style={{ marginRight: 24 }}
              onPress={() => navigation.navigate('Search')}
            />
            <MaterialCommunityIcons
              name="settings-outline"
              color="#fff"
              size={theme.SIZES.NAVBAR_ICON_SIZE * 1.25}
              onPress={() => navigation.navigate('Settings')}
            />
          </Block>
        ),
        headerLeftContainerStyle: { marginLeft: theme.SIZES.BASE },
        headerRightContainerStyle: { marginRight: theme.SIZES.BASE },
        headerTitleContainerStyle: { paddingRight: theme.SIZES.BASE * 3 },
        headerTitleAlign: 'center',
      }}
    />
    <NewsStack.Screen
      name="Details"
      component={DetailsScreen}
      options={(props) => ({
        title: props.route.params.title,
        headerRight: () => <ShareButton {...props} />,
        headerRightContainerStyle: { marginRight: theme.SIZES.BASE },
      })}
    />
    <NewsStack.Screen
      name="News"
      component={NewsScreen}
      options={({ route }) => ({
        title: route.params.title,
        headerTitleAlign: 'center',
      })}
    />
    <NewsStack.Screen
      name="Search"
      component={SearchScreen}
      options={{
        headerShown: false,
      }}
    />
    <NewsStack.Screen
      name="Settings"
      component={SettingsScreen}
      options={() => ({ title: i18n.t('settingsLabel') })}
    />
  </NewsStack.Navigator>
);

const Drawer = createDrawerNavigator();
const NewsDrawer = () => (
  <Drawer.Navigator
    initialRouteName="Home"
    drawerContent={(props) => <DrawerContent {...props} />}>
    <Drawer.Screen name="Home" component={NewsStackScreen} />
  </Drawer.Navigator>
);

const TvStack = createStackNavigator();
const TvStackScreen = ({ navigation }) => (
  <TvStack.Navigator
    initialRouteName="Tv"
    screenOptions={{
      headerStyle: {
        backgroundColor: theme.COLORS.PRIMARY,
      },
      headerTintColor: theme.COLORS.WHITE,
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <TvStack.Screen
      name="Tv"
      component={TvScreen}
      options={() => ({ title: i18n.t('tvLabel') })}
    />
    <TvStack.Screen
      name="Tv player"
      component={TvPlayerScreen}
      //options={({ route }) => ({ title: route.params.name })}
    />
  </TvStack.Navigator>
);

const RadioStack = createStackNavigator();
const RadioStackScreen = ({ navigation }) => (
  <RadioStack.Navigator
    initialRouteName="Radio"
    screenOptions={{
      headerStyle: {
        backgroundColor: theme.COLORS.PRIMARY,
      },
      headerTintColor: theme.COLORS.WHITE,
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <RadioStack.Screen
      name="Radio"
      component={RadioScreen}
      options={() => ({ title: i18n.t('radioLabel') })}
    />
    {/* <TvStack.Screen
      name="Tv player"
      component={TvPlayerScreen}
      //options={({ route }) => ({ title: route.params.name })}
    /> */}
  </RadioStack.Navigator>
);

const MusicStack = createStackNavigator();
const MusicStackScreen = ({ navigation }) => (
  <MusicStack.Navigator
    initialRouteName="Music"
    screenOptions={{
      headerStyle: {
        backgroundColor: theme.COLORS.PRIMARY,
      },
      headerTintColor: theme.COLORS.WHITE,
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <MusicStack.Screen
      name="Music"
      component={MusicScreen}
      options={() => ({ title: i18n.t('musicLabel') })}
    />
    <MusicStack.Screen
      name="Music player"
      component={MusicPlayerScreen}
      options={({ route }) => ({ title: route.params.name })}
    />
  </MusicStack.Navigator>
);

const MainTab = createMaterialBottomTabNavigator();
const MainTabScreen = () => {
  const language = useSelector((state) => selectLanguage(state));
  i18n.locale = language;

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.COLORS.PRIMARY}
        animated
      />
      <MainTab.Navigator
        initialRouteName="Home"
        swipeEnabled={true}
        activeTintColor={theme.COLORS.WHITE}
        inactiveTintColor={theme.COLORS.SECONDARY}
        barStyle={{ backgroundColor: theme.COLORS.PRIMARY }}>
        <MainTab.Screen
          name="Home"
          component={NewsDrawer}
          options={{
            tabBarLabel: i18n.t('newsLabel'),
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="newspaper"
                color={color}
                size={24}
              />
            ),
          }}
        />
        <MainTab.Screen
          name="Tv"
          component={TvStackScreen}
          options={{
            tabBarLabel: i18n.t('tvLabel'),
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="television"
                color={color}
                size={24}
              />
            ),
          }}
        />
        <MainTab.Screen
          name="Radio"
          component={RadioStackScreen}
          options={{
            tabBarLabel: i18n.t('radioLabel'),
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="radio" color={color} size={24} />
            ),
          }}
        />
        <MainTab.Screen
          name="Music"
          component={MusicStackScreen}
          options={{
            tabBarLabel: i18n.t('musicLabel'),
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="music-note"
                color={color}
                size={24}
              />
            ),
          }}
        />
      </MainTab.Navigator>
    </>
  );
};

export default MainTabScreen;
