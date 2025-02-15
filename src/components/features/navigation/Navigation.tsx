import React from 'react';

import { useAuth } from '@/hooks/auth/useAuth';
import HomeScreen from '@/screens/HomeScreen/HomeScreen';
import LoginScreen from '@/screens/LoginScreen/LoginScreen';
import RestaurantsScreen from '@/screens/RestaurantsScreen/RestaurantsScreen';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

export type MainStackParamList = {
  Home: undefined;
  Login: undefined;
};

export type AuthStackParamList = {
  Detail: { id: number };
  Favorites: undefined;
  Restaurants: undefined;
};

const Stack = createNativeStackNavigator<MainStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();

export type HomeScreenProps = NativeStackScreenProps<
  MainStackParamList,
  'Home'
>;

export type DetailScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'Detail'
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

export const Navigation = () => {
  const { isAuthenticated } = useAuth();
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
        <AuthStack.Navigator>
          <AuthStack.Screen name="Restaurants" component={RestaurantsScreen} />
        </AuthStack.Navigator>
      )}
    </NavigationContainer>
  );
};
