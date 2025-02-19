/* eslint-disable react/no-unstable-nested-components */
import React from 'react';

import { useAuth } from '@/hooks/auth/useAuth';

import CreateRestaurantScreen from '@/screens/CreateRestaurantScreen/CreateRestaurantScreen';
import DetailRestaurantScreen from '@/screens/DetailRestaurantScreen/DetailRestaurantScreen';
import FavoritesScreen from '@/screens/FavoritesScreen/FavoritesScreen';
import HomeScreen from '@/screens/HomeScreen/HomeScreen';
import LoginScreen from '@/screens/LoginScreen/LoginScreen';
import ProfileScreen from '@/screens/ProfileScreen/ProfileScreen';
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
import Header from '../shared/Header';

export type MainStackParamList = {
  Home: undefined;
  Login: undefined;
  Tab: undefined;
  RestaurantCreate: undefined;
  RestaurantDetail: { id: string };
};

export type TabParamList = {
  Restaurants: undefined;
  Favorites: undefined;
  Profile: undefined;
  RestaurantCreate: undefined;
  RestaurantDetail: { id: string };
};

const Stack = createNativeStackNavigator<MainStackParamList>();
const AuthTabStack = createBottomTabNavigator<TabParamList>();

export type HomeScreenProps = NativeStackScreenProps<
  MainStackParamList,
  'Home'
>;

export type ProfileScreenProps = NativeStackScreenProps<
  TabParamList,
  'Profile'
>;

export type FavoritesScreenProps = NativeStackScreenProps<
  TabParamList,
  'Favorites'
>;

export type LoginScreenProps = NativeStackScreenProps<
  MainStackParamList,
  'Login'
>;

export type RestaurantsScreenProps = NativeStackScreenProps<
  TabParamList,
  'Restaurants'
>;

export type RestaurantDetailScreenProps = NativeStackScreenProps<
  MainStackParamList,
  'RestaurantDetail'
>;

export type CreateRestaurantScreenProps = NativeStackScreenProps<
  MainStackParamList,
  'RestaurantCreate'
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

const AuthStackScreen = () => {
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
    <AuthTabStack.Navigator
      initialRouteName="Restaurants"
      screenOptions={({ route }) => ({
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
        component={RestaurantsScreen}
        options={{
          header: (props) => <Header {...props} />,
        }}
      />
      <AuthTabStack.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          header: (props) => <Header {...props} />,
        }}
      />
      <AuthTabStack.Screen name="Profile" component={ProfileScreen} />
    </AuthTabStack.Navigator>
  );
};

export const Navigation = () => {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isAuthenticated ? (
          <Stack.Group
            screenOptions={{
              headerShown: false,
            }}
          >
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
          </Stack.Group>
        ) : (
          <Stack.Group
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Tab" component={AuthStackScreen} />
            <Stack.Screen
              name="RestaurantCreate"
              component={CreateRestaurantScreen}
            />
            <Stack.Screen
              name="RestaurantDetail"
              component={DetailRestaurantScreen}
            />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
