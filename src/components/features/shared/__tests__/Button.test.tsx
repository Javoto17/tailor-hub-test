import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';
import Button from '../Button';

describe('Button', () => {
  it('renders with label', () => {
    const { getByText } = render(<Button label="Test Button" />);
    expect(getByText('Test Button')).toBeOnTheScreen();
  });

  it('handles onPress event', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button label="Test Button" onPress={onPressMock} />
    );

    fireEvent.press(getByText('Test Button'));
    expect(onPressMock).toHaveBeenCalled();
  });

  it('renders with icon', () => {
    const { getByTestId } = render(
      <Button
        icon={{ name: 'trash', size: 24, color: 'black' }}
        testID="button-with-icon"
      />
    );
    expect(getByTestId('button-with-icon')).toBeTruthy();
  });

  it('renders children when provided', () => {
    const { getByText } = render(
      <Button>
        <Text>Test</Text>
      </Button>
    );
    expect(getByText('Test')).toBeOnTheScreen();
  });
});
