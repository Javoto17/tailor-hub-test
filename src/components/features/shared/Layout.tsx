import { tv } from '@/lib/tv';
import { vars } from 'nativewind';
import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface LayoutProps {
  children: React.ReactNode;
  withHeader?: boolean;
  withTabs?: boolean;
  className?: string;
}

const layoutTv = tv({
  base: 'flex-1 bg-light relative pl-[--layout-left] pr-[--layout-right] pt-[--layout-top] pb-[--layout-bottom]',
  variants: {
    withHeader: { true: 'pt-0', false: 'pt-[--layout-top]' },
    withTabs: { true: 'pb-0', false: 'pb-[--layout-bottom]' },
  },
});

const Layout: React.FC<LayoutProps> = ({
  children,
  withHeader = false,
  withTabs = false,
  className,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      className={layoutTv({ withHeader, withTabs, className })}
      style={vars({
        '--layout-top': withHeader ? 0 : insets.top,
        '--layout-bottom': withTabs ? 0 : insets.bottom,
        '--layout-left': insets.left,
        '--layout-right': insets.right,
      })}
    >
      {children}
    </View>
  );
};

export default Layout;
