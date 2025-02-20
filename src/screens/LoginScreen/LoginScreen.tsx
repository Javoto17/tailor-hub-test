import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';

import FormLogin, {
  FormLoginData,
} from '@/components/features/login/FormLogin';
import FormSignUp, {
  FormSignUpData,
} from '@/components/features/login/FormSignUp';
import FormWrapper from '@/components/features/login/FormWrapper';
import { LoginScreenProps } from '@/components/features/navigation/Navigation';
import Layout from '@/components/features/shared/Layout';
import TailorIcon from '@/components/features/shared/TailorIcon';
import { useAuth } from '@/hooks/auth/useAuth';

enum LoginForm {
  LOGIN = 'login',
  SIGNUP = 'signup',
}

const LoginScreen: React.FC<LoginScreenProps> = () => {
  const { signUpUser, loginUser } = useAuth();

  const [form, setForm] = useState<LoginForm>(LoginForm.LOGIN);

  const onPressLink = () => {
    setForm(form === LoginForm.LOGIN ? LoginForm.SIGNUP : LoginForm.LOGIN);
  };

  const handleSignUp = async (data: FormSignUpData) => {
    await signUpUser.mutate({
      name: data.name,
      email: data.email,
      password: data.password,
    });
  };

  const handleLogin = async (data: FormLoginData) => {
    await loginUser.mutate({
      email: data.email,
      password: data.password,
    });
  };

  const renderForm = () => {
    if (form === LoginForm.LOGIN) {
      return <FormLogin onPressLink={onPressLink} onSubmit={handleLogin} />;
    }

    return (
      <FormSignUp
        onPressLink={onPressLink}
        onSubmit={handleSignUp}
        isLoading={signUpUser?.isLoading || loginUser?.isLoading}
      />
    );
  };

  return (
    <Layout withHeader={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
        enabled
      >
        <ScrollView
          bounces={false}
          keyboardShouldPersistTaps="handled"
          contentContainerClassName="flex-1"
        >
          <View className="flex-1 items-center justify-start">
            <TailorIcon className="mt-2 text-primary " height={35} />
          </View>
          <FormWrapper className="mx-2 ">{renderForm()}</FormWrapper>
        </ScrollView>
      </KeyboardAvoidingView>
    </Layout>
  );
};

export default LoginScreen;
