import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface LayoutProps {
  children: React.ReactNode;
  withHeader?: boolean;
  withTabs?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  withHeader = false,
  withTabs = false,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      className={`flex-1 bg-light relative`}
      style={{
        paddingTop: withHeader ? 0 : insets.top,
        paddingBottom: withTabs ? 0 : insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      {children}
    </View>
  );
};

export default Layout;
