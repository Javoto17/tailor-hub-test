import React from 'react';
import { Text } from 'react-native';
import {
  fireEvent,
  render,
  RenderAPI,
  waitFor,
} from '@testing-library/react-native';
import ButtonIcon from '../ButtonIcon';

describe('ButtonIcon', () => {
  const onPressMock = jest.fn();
  let getByTestId: RenderAPI['getByTestId'];

  beforeEach(() => {
    const renderResult = render(
      <ButtonIcon
        icon="bookmark"
        testID="button-icon"
        className="bg-gray p-2 rounded-full"
        onPress={onPressMock}
      />
    );
    getByTestId = renderResult.getByTestId;
  });

  it('renders', () => {
    expect(getByTestId('button-icon')).toBeOnTheScreen();
  });

  it('should render the icon', async () => {
    await waitFor(() => {
      expect(getByTestId('bookmark-icon')).toBeOnTheScreen();
    });
  });

  it('handles onPress event', async () => {
    fireEvent.press(getByTestId('button-icon'));

    await waitFor(() => {
      expect(onPressMock).toHaveBeenCalled();
    });
  });

  it('renders children when provided', () => {
    const { getByText } = render(
      <ButtonIcon>
        <Text>Custom Content</Text>
      </ButtonIcon>
    );
    expect(getByText('Custom Content')).toBeOnTheScreen();
  });
});
