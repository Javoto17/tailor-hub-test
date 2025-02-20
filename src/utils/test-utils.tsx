import React from 'react';
import { render as rtlRender } from '@testing-library/react-native';

const customRender = (ui: React.ReactElement, options = {}) =>
  rtlRender(ui, {
    wrapper: ({ children }) => children,
    ...options,
  });

// Utilidades comunes para tests
const createTestProps = (props: object) => ({
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
  },
  ...props,
});

export * from '@testing-library/react-native';
export { customRender as render, createTestProps };
