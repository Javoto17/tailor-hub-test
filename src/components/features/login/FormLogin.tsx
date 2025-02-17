import { TouchableWithoutFeedback, View, Text } from 'react-native';

import React from 'react';

import Button from '../shared/Button';
import TextField from '../shared/TextField';

import { useForm, Controller } from 'react-hook-form';

export interface FormLoginProps {
  onPressLink: () => void;
  onSubmit: (data: FormLoginData) => void;
}

export type FormLoginData = {
  email: string;
  password: string;
};

const FormLogin = ({ onPressLink, onSubmit }: FormLoginProps) => {
  const { handleSubmit, control } = useForm<FormLoginData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const thisOnSubmit = (data: FormLoginData) => {
    onSubmit(data);
  };

  return (
    <>
      <View className="items-start justify-start mt-auto gap-y-4">
        <View>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                placeholder="Introduce tu email"
                label="Email"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                autoCapitalize="none"
                textContentType="emailAddress"
                keyboardType="email-address"
                autoCorrect={false}
                autoComplete="email"
              />
            )}
          />
        </View>
        <View>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                placeholder="Introduce tu contraseña"
                label="Contraseña"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                secureTextEntry={true}
              />
            )}
          />
        </View>
        <Button
          variant="filled"
          label="Iniciar sesión"
          size="full"
          onPress={handleSubmit(thisOnSubmit)}
        />
        <View className="flex flex-row items-center justify-center gap-x-2">
          <Text className="text-body-small text-white">
            ¿No tienes una cuenta?
          </Text>
          <TouchableWithoutFeedback onPress={onPressLink}>
            <Text className="text-body-small text-white">Regístrate</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </>
  );
};

export default FormLogin;
