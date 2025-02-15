import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface LayoutProps {
  children: React.ReactNode;
  withHeader?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, withHeader = false }) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      className={`flex-1 bg-light`}
      style={{
        paddingTop: withHeader ? 0 : insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      {children}
    </View>
  );
};

export default Layout;
