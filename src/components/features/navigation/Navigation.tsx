/* eslint-disable react/no-unstable-nested-components */
import React from 'react';

import Header from '@/components/features/shared/Header';
import { useAuth } from '@/hooks/auth/useAuth';

import DetailRestaurantScreen from '@/screens/DetailRestaurantScreen/DetailRestaurantScreen';
import FavoritesScreen from '@/screens/FavoritesScreen/FavoritesScreen';
import HomeScreen from '@/screens/HomeScreen/HomeScreen';
import LoginScreen from '@/screens/LoginScreen/LoginScreen';
import ProfileScreen from '@/screens/ProfileScreen/profileScreen';
import RestaurantsScreen from '@/screens/RestaurantsScreen/RestaurantsScreen';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import HearthIcon from '../shared/HearthIcon';
import MarkerIcon from '../shared/MarkerIcon';
import ProfileIcon from '../shared/ProfileIcon';

export type MainStackParamList = {
  Home: undefined;
  Login: undefined;
};

export type AuthStackParamList = {
  Favorites: undefined;
  Restaurants: undefined;
  Profile: undefined;
  RestaurantDetail: { id: string };
};

const Stack = createNativeStackNavigator<MainStackParamList>();
const AuthTabStack = createBottomTabNavigator<AuthStackParamList>();

export type HomeScreenProps = NativeStackScreenProps<
  MainStackParamList,
  'Home'
>;

export type RestaurantDetailScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'RestaurantDetail'
>;

export type ProfileScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'Profile'
>;

export type FavoritesScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'Favorites'
>;

export type LoginScreenProps = NativeStackScreenProps<
  MainStackParamList,
  'Login'
>;

export type RestaurantsScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'Restaurants'
>;

export type RestaurantsStackParamList = {
  Restaurants: undefined;
  RestaurantDetail: { id: string };
};

export type FavoritesStackParamList = {
  Favorites: undefined;
  RestaurantDetail: { id: string };
};

export type ProfileStackParamList = {
  Profile: undefined;
};

const RestaurantsStack =
  createNativeStackNavigator<RestaurantsStackParamList>();

const RestaurantsStackScreen = () => (
  <RestaurantsStack.Navigator>
    <RestaurantsStack.Screen
      name="Restaurants"
      component={RestaurantsScreen}
      options={{
        header: (props) => <Header {...props} />,
      }}
    />
    <RestaurantsStack.Screen
      name="RestaurantDetail"
      component={DetailRestaurantScreen}
      options={{
        headerShown: false,
      }}
    />
  </RestaurantsStack.Navigator>
);

const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

const ProfileStackScreen = () => (
  <ProfileStack.Navigator initialRouteName="Profile">
    <ProfileStack.Screen name="Profile" component={ProfileScreen} />
  </ProfileStack.Navigator>
);

const FavoritesStack = createNativeStackNavigator<FavoritesStackParamList>();

const FavoritesStackScreen = () => (
  <FavoritesStack.Navigator initialRouteName="Favorites">
    <FavoritesStack.Screen
      name="Favorites"
      component={FavoritesScreen}
      options={{
        header: (props) => <Header {...props} />,
      }}
    />
    <FavoritesStack.Screen
      name="RestaurantDetail"
      component={DetailRestaurantScreen}
      options={{
        headerShown: false,
      }}
    />
  </FavoritesStack.Navigator>
);

export const Navigation = () => {
  const { isAuthenticated } = useAuth();

  const iconsByRoute: Record<
    string,
    ({
      className,
      size,
    }: {
      className: string;
      size: number;
    }) => React.ReactNode
  > = {
    Restaurants: ({ className, size }) => (
      <MarkerIcon className={className} width={size} height={size} />
    ),
    Favorites: ({ className, size }) => (
      <HearthIcon className={className} width={size} height={size} />
    ),
    Profile: ({ className, size }) => (
      <ProfileIcon className={className} width={size} height={size} />
    ),
  };
  return (
    <NavigationContainer>
      {!isAuthenticated ? (
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      ) : (
        <AuthTabStack.Navigator
          initialRouteName="Restaurants"
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {},
            tabBarIcon: ({ focused }) => {
              const Icon = iconsByRoute[route.name];

              return (
                <Icon
                  className={focused ? 'text-primary' : 'text-text'}
                  size={28}
                />
              );
            },
          })}
        >
          <AuthTabStack.Screen
            name="Restaurants"
            component={RestaurantsStackScreen}
          />
          <AuthTabStack.Screen
            name="Favorites"
            component={FavoritesStackScreen}
            options={{
              headerShown: false,
            }}
          />
          <AuthTabStack.Screen
            name="Profile"
            component={ProfileStackScreen}
            options={{
              headerShown: false,
            }}
          />
        </AuthTabStack.Navigator>
      )}
    </NavigationContainer>
  );
};
