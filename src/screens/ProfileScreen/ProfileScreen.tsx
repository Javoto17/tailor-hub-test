import React from 'react';
import Button from '@/components/features/shared/Button';
import Layout from '@/components/features/shared/Layout';

import { useAuth } from '@/hooks/auth/useAuth';

import { View } from 'react-native';

const ProfileScreen = () => {
  const { logoutUser } = useAuth();

  const handleLogout = () => {
    logoutUser.mutate();
  };

  return (
    <Layout withHeader withTabs>
      <View className="flex-1 items-center justify-end">
        <Button
          label="Logout"
          onPress={handleLogout}
          variant="outline"
          color="primary"
          className="my-8"
        />
      </View>
    </Layout>
  );
};

export default ProfileScreen;
