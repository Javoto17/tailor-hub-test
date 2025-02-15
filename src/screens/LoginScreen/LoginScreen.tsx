import React, { useState } from 'react';
import { View } from 'react-native';

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

  const handleSignUp = (data: FormSignUpData) => {
    signUpUser(data.name, data.email, data.password);
  };

  const handleLogin = (data: FormLoginData) => {
    loginUser(data.email, data.password);
  };

  const renderForm = () => {
    if (form === LoginForm.LOGIN) {
      return <FormLogin onPressLink={onPressLink} onSubmit={handleLogin} />;
    }

    return <FormSignUp onPressLink={onPressLink} onSubmit={handleSignUp} />;
  };

  return (
    <Layout withHeader={false}>
      <View className="flex-1 items-center justify-start">
        <TailorIcon className="mt-2 text-primary " height={35} />
      </View>
      <FormWrapper className="mx-2 ">{renderForm()}</FormWrapper>
    </Layout>
  );
};

export default LoginScreen;
