import { View } from 'react-native';

import React, { useState } from 'react';

import Button from '../shared/Button';
import ArrowIcon from '../shared/icons/ArrowIcon';
import TextField from '../shared/TextField';

import { useForm, Controller } from 'react-hook-form';
import Spinner from '../shared/Spinner';

export type FormSignUpData = {
  email: string;
  name: string;
  password: string;
};

interface FormSignUpProps {
  onPressLink: () => void;
  onSubmit: (data: FormSignUpData) => Promise<void>;
  isLoading?: boolean;
}

enum FormSignUpSteps {
  DATA = 'data',
  PASSWORD = 'password',
}

const FormSignUp = ({ onPressLink, onSubmit, isLoading }: FormSignUpProps) => {
  const { handleSubmit, control, formState, trigger } = useForm<FormSignUpData>(
    {
      defaultValues: {
        email: '',
        name: '',
        password: '',
      },
      mode: 'onSubmit',
    }
  );

  const { isSubmitting, errors } = formState;

  const [step, setStep] = useState<FormSignUpSteps>(FormSignUpSteps.DATA);

  const isDataStep = step === FormSignUpSteps.DATA;

  const thisOnSubmit = async (data: FormSignUpData) => {
    await onSubmit(data);
  };

  const handlePress = async () => {
    if (isDataStep) {
      // Validate first step fields before proceeding
      const isValid = await trigger(['email', 'name']);

      if (!isValid) return;

      setStep(FormSignUpSteps.PASSWORD);
      return;
    }

    handleSubmit(thisOnSubmit)();
  };

  const thisIsLoading = isLoading || isSubmitting;

  const renderStep = () => {
    if (isDataStep) {
      return (
        <>
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
                testID="signup-email-input"
                placeholder="Añade tu email"
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
          <Controller
            control={control}
            name="name"
            rules={{
              required: 'Nombre es requerido',
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                testID="signup-name-input"
                placeholder="Añade tu nombre"
                label="Nombre de usuario"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                error={
                  errors.name?.message
                    ? { message: errors.name?.message }
                    : undefined
                }
              />
            )}
          />
        </>
      );
    }

    return (
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
            testID="signup-password-input"
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            placeholder="Añade tu contraseña"
            label="Contraseña"
            secureTextEntry
            error={
              errors.password?.message
                ? { message: errors.password?.message }
                : undefined
            }
          />
        )}
      />
    );
  };

  return (
    <>
      <View className="items-start justify-start flex flex-row">
        <Button
          testID="back-button"
          variant="outline"
          color="secondary"
          size="large"
          onPress={
            isDataStep ? onPressLink : () => setStep(FormSignUpSteps.DATA)
          }
        >
          <ArrowIcon className="text-white" />
        </Button>
      </View>
      <View className="items-start justify-start gap-y-4 mt-12">
        {renderStep()}
        <Button
          variant="filled"
          label={
            isDataStep ? 'Siguiente' : thisIsLoading ? undefined : 'Finalizar'
          }
          size="full"
          onPress={handlePress}
          testID={isDataStep ? 'signup-next-button' : 'signup-finish-button'}
        >
          {!isDataStep && thisIsLoading && (
            <Spinner className="text-black" size="small" />
          )}
        </Button>
      </View>
    </>
  );
};

export default FormSignUp;
