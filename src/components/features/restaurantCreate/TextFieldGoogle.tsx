import React, { useCallback, useState } from 'react';
import TextField, {
  TextFieldProps,
} from '@/components/features/shared/TextField';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  TextInput,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native';
import debounce from 'just-debounce-it';
import PlusIcon from '../shared/PlusIcon';

export interface Prediction {
  description: string;
  place_id: string;
}

export interface TextFieldGoogleProps extends Omit<TextFieldProps, 'onPress'> {
  onPress: (
    prediction: Prediction,
    location: {
      latitude: number;
      longitude: number;
    }
  ) => void;
  query?: {
    key: string;
    region: string;
    locale: string;
  };
  onCancel: () => void;
}

const TextFieldGoogle = React.forwardRef<TextInput, TextFieldGoogleProps>(
  ({ onPress, query, onCancel, onBlur, ...props }, ref) => {
    const [inputValue, setInputValue] = useState('');
    const [predictions, setPredictions] = useState<Prediction[]>([]);

    const getResults = useCallback(
      async (text: string) => {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&key=${query?.key ?? process.env.GOOGLE_PLACES_API_KEY}&types=address&region=${query?.region ?? 'es'}&components=country:${query?.region ?? 'es'}&locale=${query?.locale ?? 'es'}`
        );
        const data = await response.json();

        setPredictions(data?.predictions || []);
      },
      [query]
    );

    const getLatLongByPlaceId = useCallback(
      async (placeId: string) => {
        // Fetch place details to get latitude and longitude
        const placeDetailsResponse = await fetch(
          `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${query?.key ?? process.env.GOOGLE_PLACES_API_KEY}`
        );

        const placeDetailsData = await placeDetailsResponse.json();

        const location = placeDetailsData?.result?.geometry?.location;

        if (!location) {
          return null;
        }

        return {
          latitude: location?.lat,
          longitude: location?.lng,
        };
      },
      [query]
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedGetResults = useCallback(
      debounce((queryInput: string) => getResults(queryInput), 500),
      [getResults]
    );

    const handleInputChange = async (text: string) => {
      setInputValue(text);
      if (text.length > 2) {
        debouncedGetResults(text);
        return;
      }

      setPredictions([]);
    };

    const handlePlaceSelect = async (prediction: Prediction) => {
      const location = await getLatLongByPlaceId(prediction.place_id);

      if (!location) {
        return;
      }

      if (typeof onPress === 'function') {
        onPress(prediction, location);
      }

      setInputValue(prediction.description);
      setPredictions([]);
    };

    const handlePressRightIcon = () => {
      setInputValue('');
      setPredictions([]);

      if (typeof onCancel === 'function') {
        onCancel();
      }
    };

    const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setPredictions([]);

      if (typeof onBlur === 'function') {
        onBlur(e);
      }
    };

    return (
      <View className="relative">
        <TextField
          {...props}
          ref={ref}
          onChangeText={handleInputChange}
          value={inputValue}
          onBlur={handleBlur}
          rightIcon={
            inputValue?.length > 0 && (
              <TouchableOpacity onPress={handlePressRightIcon}>
                <View className="flex items-center justify-center">
                  <PlusIcon
                    className="text-primary rotate-45"
                    width={32}
                    height={32}
                  />
                </View>
              </TouchableOpacity>
            )
          }
        />
        {predictions.length > 0 && (
          <FlatList
            keyboardShouldPersistTaps="always"
            className="absolute top-full left-0 right-0 bg-light border z-10 rounded-2xl mt-2"
            data={predictions}
            keyExtractor={(item) => item.place_id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handlePlaceSelect(item)}
                className="py-2 px-4 active:bg-lightGray"
              >
                <Text className="text-body-small font-roobert font-semibold text-black">
                  {item.description}
                </Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    );
  }
);

export default TextFieldGoogle;
