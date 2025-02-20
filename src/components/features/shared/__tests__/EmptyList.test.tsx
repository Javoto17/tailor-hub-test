import React from 'react';
import { render } from '@testing-library/react-native';
import EmptyList from '../EmptyList';

describe('EmptyList', () => {
  it('renders with provided text', () => {
    const testText = 'No items found';
    const { getByText } = render(<EmptyList text={testText} />);
    expect(getByText(testText)).toBeTruthy();
  });
});
