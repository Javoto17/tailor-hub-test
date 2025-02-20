import React from 'react';
import { render } from '@testing-library/react-native';
import Spinner from '../Spinner';

describe('Spinner', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<Spinner />);
    expect(getByTestId('spinner')).toBeTruthy();
  });

  it('applies custom className', () => {
    const { getByTestId } = render(<Spinner className="custom-class" />);
    const spinner = getByTestId('spinner');
    expect(spinner.props.className).toContain('custom-class');
  });

  it('uses correct size prop', () => {
    const { getByTestId } = render(<Spinner size="small" />);
    const spinner = getByTestId('spinner');
    expect(spinner.props.size).toBe('small');
  });

  it('has default size of large', () => {
    const { getByTestId } = render(<Spinner />);
    const spinner = getByTestId('spinner');
    expect(spinner.props.size).toBe('large');
  });
});
