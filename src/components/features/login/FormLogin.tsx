import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text, TouchableWithoutFeedback, View } from 'react-native';

import Button from '../shared/Button';
import Spinner from '../shared/Spinner';
import TextField from '../shared/TextField';

export interface FormLoginProps {
  onPressLink: () => void;
  onSubmit: (data: FormLoginData) => Promise<void>;
}

export type FormLoginData = {
  email: string;
  password: string;
};

const FormLogin = ({ onPressLink, onSubmit }: FormLoginProps) => {
  const { handleSubmit, control, formState } = useForm<FormLoginData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { errors, isSubmitting } = formState;

  const thisOnSubmit = async (data: FormLoginData) => {
    await onSubmit(data);
  };

  return (
    <>
      <View className="items-start justify-start mt-auto gap-y-4">
        <View>
          <Controller
            control={control}
            name="email"
            rules={{
              required: 'Email es requerido',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email no válido',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                testID="email-input"
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
                error={
                  errors.email?.message
                    ? { message: errors.email?.message }
                    : undefined
                }
              />
            )}
          />
        </View>
        <View>
          <Controller
            control={control}
            name="password"
            rules={{
              required: 'Contraseña es requerida',
              minLength: {
                value: 6,
                message: 'La contraseña debe tener al menos 6 caracteres',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                testID="password-input"
                placeholder="Introduce tu contraseña"
                label="Contraseña"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                secureTextEntry={true}
                error={
                  errors.password?.message
                    ? { message: errors.password?.message }
                    : undefined
                }
              />
            )}
          />
        </View>
        <Button
          variant="filled"
          label={isSubmitting ? undefined : 'Iniciar sesión'}
          size="full"
          disabled={isSubmitting}
          onPress={handleSubmit(thisOnSubmit)}
        >
          {isSubmitting && <Spinner className="text-black" size="small" />}
        </Button>
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
