import React from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

import Button from '../shared/Button';
import PlusIcon from '../shared/PlusIcon';
import Spinner from '../shared/Spinner';
import TextField from '../shared/TextField';
import TextFieldGoogle from './TextFieldGoogle';

export interface RestaurantFormData {
  name: string;
  address: string;
  location: {
    latitude: number;
    longitude: number;
  } | null;
  description: string;
  image: string;
}

interface RestaurantFormProps {
  onSubmit: (data: RestaurantFormData) => void;
}

const RestaurantForm = ({ onSubmit }: RestaurantFormProps) => {
  const { control, setValue, handleSubmit, formState, getValues } =
    useForm<RestaurantFormData>({
      defaultValues: {
        address: '',
        description: '',
        image: '',
        name: '',
      },
    });
  const watchImage = useWatch({ control, name: 'image' });

  const { isSubmitting, isValid } = formState;

  const handleImagePicker = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
      includeBase64: false,
      maxWidth: 250,
      maxHeight: 250,
    });

    if (result.didCancel) {
      return;
    }

    setValue('image', result.assets?.[0]?.uri ?? '');
  };

  const handlePickerButton = () => {
    const image = getValues('image');

    if (image) {
      setValue('image', '');
    }
  };

  const thisOnSubmit = (data: RestaurantFormData) => {
    onSubmit(data);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled
      className="flex-1"
    >
      <ScrollView keyboardShouldPersistTaps="handled">
        <View className="flex flex-col gap-y-8 px-2 flex-1">
          <View className="flex flex-col justify-center items-center">
            <TouchableWithoutFeedback onPress={handleImagePicker}>
              <View className="rounded-[32px] h-[204px] w-[204px] bg-secondary relative border border-black flex flex-col justify-center items-center gap-y-2 overflow-hidden">
                {!watchImage ? (
                  <>
                    <PlusIcon className="text-black" width={24} height={24} />
                    <Text className="text-body-small text-black text-center font-roobert-semi font-semibold">
                      Agregar imagen
                    </Text>
                  </>
                ) : (
                  <>
                    <Button
                      label="Eliminar"
                      color="secondary"
                      variant="outline"
                      size="large"
                      onPress={handlePickerButton}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 rounded-[24px]"
                    />
                    <Image
                      source={{ uri: watchImage }}
                      className="w-full h-full object-cover absolute inset-0"
                    />
                    <View className="absolute inset-0 bg-black/20" />
                  </>
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View className="flex flex-col gap-y-4">
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  variant="primary"
                  placeholder="Nombre del restaurante"
                  label="Nombre del restaurante"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />

            <TextFieldGoogle
              variant="primary"
              placeholder="Dirección"
              label="Dirección del restaurante"
              onPress={(prediction, location) => {
                setValue('location', location);
                setValue('address', prediction?.description ?? '');
              }}
            />

            <Controller
              control={control}
              name="description"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  variant="primary"
                  placeholder="Escribe información del restaurante"
                  label="Descripción del restaurante"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  multiline={true}
                />
              )}
            />
            <Button
              label={isSubmitting ? undefined : 'Guardar'}
              variant="outline"
              size="full"
              onPress={handleSubmit(thisOnSubmit)}
              disabled={!isValid || isSubmitting}
            >
              {isSubmitting && <Spinner size="small" className="text-black" />}
            </Button>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RestaurantForm;
