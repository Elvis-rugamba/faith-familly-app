import React from 'react';
import { StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  NewsScreen,
  TvScreen,
  RadioScreen,
  MusicScreen,
  DeatailsScreen,
  MusicPlayerScreen,
  TvPlayerScreen,
} from '../screens';
import theme from '../constants/theme';

const NewsStack = createStackNavigator();
const NewsStackSreen = ({ navigation }) => (
  <NewsStack.Navigator
    initialRouteName="News"
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
    <NewsStack.Screen name="News" component={NewsScreen} />
    <NewsStack.Screen
      name="Details"
      component={DeatailsScreen}
      //options={({ route }) => ({ title: route.params.name })}
    />
  </NewsStack.Navigator>
);

const TvStack = createStackNavigator();
const TvStackSreen = ({ navigation }) => (
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
      options={{ title: 'TV Show' }}
    />
    <TvStack.Screen
      name="Tv player"
      component={TvPlayerScreen}
      //options={({ route }) => ({ title: route.params.name })}
    />
  </TvStack.Navigator>
);

const MusicStack = createStackNavigator();
const MusicStackSreen = ({ navigation }) => (
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
      options={{ title: 'Music Library' }}
    />
    <MusicStack.Screen
      name="Music player"
      component={MusicPlayerScreen}
      //options={({ route }) => ({ title: route.params.name })}
    />
  </MusicStack.Navigator>
);

const MainTab = createMaterialBottomTabNavigator();
const MainTabScreen = () => (
  <>
    <StatusBar
      barStyle="light-content"
      backgroundColor={theme.COLORS.PRIMARY}
      animated
    />
    <MainTab.Navigator
      initialRouteName="News"
      swipeEnabled={true}
      activeTintColor={theme.COLORS.WHITE}
      inactiveTintColor={theme.COLORS.SECONDARY}
      barStyle={{ backgroundColor: theme.COLORS.PRIMARY }}>
      <MainTab.Screen
        name="News"
        component={NewsStackSreen}
        options={{
          tabBarLabel: 'News',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="newspaper" color={color} size={24} />
          ),
        }}
      />
      <MainTab.Screen
        name="Tv"
        component={TvStackSreen}
        options={{
          tabBarLabel: 'TV Show',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="television" color={color} size={24} />
          ),
        }}
      />
      <MainTab.Screen
        name="Radio"
        component={RadioScreen}
        options={{
          tabBarLabel: 'Radio',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="radio" color={color} size={24} />
          ),
        }}
      />
      <MainTab.Screen
        name="Music"
        component={MusicStackSreen}
        options={{
          tabBarLabel: 'Music',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="music-note" color={color} size={24} />
          ),
        }}
      />
    </MainTab.Navigator>
  </>
);

export default MainTabScreen;
