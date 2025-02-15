import { View } from 'react-native';

import React, { useState } from 'react';

import Button from '../shared/Button';
import ArrowIcon from '../shared/ArrowIcon';
import TextField from '../shared/TextField';

import { useForm, Controller } from 'react-hook-form';

export type FormSignUpData = {
  email: string;
  name: string;
  password: string;
};

interface FormSignUpProps {
  onPressLink: () => void;
  onSubmit: (data: FormSignUpData) => void;
}

enum FormSignUpSteps {
  DATA = 'data',
  PASSWORD = 'password',
}

const FormSignUp = ({ onPressLink, onSubmit }: FormSignUpProps) => {
  const { handleSubmit, control } = useForm<FormSignUpData>({
    defaultValues: {
      email: '',
      name: '',
      password: '',
    },
  });

  const [step, setStep] = useState<FormSignUpSteps>(FormSignUpSteps.DATA);

  const isDataStep = step === FormSignUpSteps.DATA;

  const thisOnSubmit = (data: FormSignUpData) => {
    onSubmit(data);
  };

  const renderStep = () => {
    if (isDataStep) {
      return (
        <>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                placeholder="Añade tu email"
                label="Email"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                placeholder="Añade tu nombre"
                label="Nombre de usuario"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
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
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            placeholder="Añade tu contraseña"
            label="Contraseña"
          />
        )}
      />
    );
  };

  return (
    <>
      <View className="items-start justify-start flex flex-row">
        <Button
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
      <View className="items-start justify-start mt-auto gap-y-4">
        {renderStep()}
        <Button
          variant="filled"
          label={isDataStep ? 'Siguiente' : 'Finalizar'}
          size="full"
          onPress={
            !isDataStep
              ? handleSubmit(thisOnSubmit)
              : () => setStep(FormSignUpSteps.PASSWORD)
          }
        />
      </View>
    </>
  );
};

export default FormSignUp;
