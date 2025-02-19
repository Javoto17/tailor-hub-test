import { useCallback } from 'react';
import { Alert, PermissionsAndroid, Platform } from 'react-native';

import Geolocation from '@react-native-community/geolocation';

export type Location = {
  latitude: number;
  longitude: number;
};

async function getPosition(): Promise<Location | null> {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      (position) => {
        const location: Location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        resolve(location);
      },
      (error) => {
        reject(error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  });
}

export function useUserLocation() {
  // Function to request location permission (Android only)
  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'This App needs to access your location.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    // For iOS, permission is handled via the Info.plist settings
    return true;
  };

  // Function to get current location
  const getCurrentLocation = useCallback(async (): Promise<Location | null> => {
    const hasPermission = await requestLocationPermission();

    if (!hasPermission) {
      Alert.alert(
        'Permission Denied',
        'Cannot access location without permission.'
      );
      return null;
    }

    let location: Location | null = null;

    location = await getPosition();

    return location;
  }, []);

  return { getCurrentLocation };
}
