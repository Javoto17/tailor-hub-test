/* eslint-disable react/no-unstable-nested-components */
import React from 'react';

import { useAuth } from '@/hooks/auth/useAuth';
import { Restaurant } from '@/modules/restaurants/domain/Restaurant';
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

import Header from '../shared/Header';
import HearthIcon from '../shared/icons/HearthIcon';
import MarkerIcon from '../shared/icons/MarkerIcon';
import ProfileIcon from '../shared/icons/ProfileIcon';

export type MainStackParamList = {
  Home: undefined;
  Login: undefined;
  Tab: undefined;
};

export type AuthStackParamList = {
  TabNavigator: undefined;
  RestaurantCreate: {
    restaurant?: Restaurant;
  };
  RestaurantDetail: {
    id: string;
  };
};

export type AuthTabParamList = {
  Restaurants: undefined;
  Favorites: undefined;
  Profile: undefined;
  RestaurantCreate: {
    restaurant?: Restaurant;
  };
  RestaurantDetail: {
    id: string;
  };
};

const Stack = createNativeStackNavigator<MainStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const AuthTabStack = createBottomTabNavigator<AuthTabParamList>();

export type HomeScreenProps = NativeStackScreenProps<
  MainStackParamList,
  'Home'
>;
export type LoginScreenProps = NativeStackScreenProps<
  MainStackParamList,
  'Login'
>;

export type RestaurantsScreenProps = NativeStackScreenProps<
  AuthTabParamList,
  'Restaurants'
>;
export type FavoritesScreenProps = NativeStackScreenProps<
  AuthTabParamList,
  'Favorites'
>;

export type ProfileScreenProps = NativeStackScreenProps<
  AuthTabParamList,
  'Profile'
>;

export type RestaurantDetailScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'RestaurantDetail'
>;
export type CreateRestaurantScreenProps = NativeStackScreenProps<
  AuthStackParamList,
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
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="TabNavigator">
        {() => (
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
            <AuthTabStack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{
                headerShown: false,
              }}
            />
          </AuthTabStack.Navigator>
        )}
      </AuthStack.Screen>
      <AuthStack.Screen
        name="RestaurantCreate"
        component={CreateRestaurantScreen}
      />
      <AuthStack.Screen
        name="RestaurantDetail"
        component={DetailRestaurantScreen}
      />
    </AuthStack.Navigator>
  );
};

export const Navigation = () => {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isAuthenticated ? 'Tab' : 'Home'}
        screenOptions={{}}
      >
        {!isAuthenticated ? (
          <Stack.Group
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Group>
        ) : (
          <Stack.Screen
            name="Tab"
            component={AuthStackScreen}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
