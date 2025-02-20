import React from 'react';
import { render } from '@testing-library/react-native';
import FormWrapper from '../FormWrapper';
import { Text } from 'react-native';

describe('FormWrapper', () => {
  it('should render children correctly', () => {
    const testMessage = 'Test Content';
    const { getByText } = render(
      <FormWrapper>
        <Text>{testMessage}</Text>
      </FormWrapper>
    );

    expect(getByText(testMessage)).toBeTruthy();
  });

  it('should apply custom className prop', () => {
    const customClass = 'custom-class';
    const { getByTestId } = render(
      <FormWrapper testID="wrapper" className={customClass}>
        <Text>Content</Text>
      </FormWrapper>
    );

    const wrapper = getByTestId('wrapper');
    expect(wrapper.props.className).toContain(customClass);
  });

  it('should merge default and custom className', () => {
    const customClass = 'custom-class';
    const { getByTestId } = render(
      <FormWrapper testID="wrapper" className={customClass}>
        <Text>Content</Text>
      </FormWrapper>
    );

    const wrapper = getByTestId('wrapper');
    expect(wrapper.props.className).toContain('bg-primary');
    expect(wrapper.props.className).toContain('rounded-[32px]');
    expect(wrapper.props.className).toContain('min-h-[250px]');
    expect(wrapper.props.className).toContain(customClass);
  });

  it('should pass additional props to View component', () => {
    const testID = 'test-wrapper';
    const { getByTestId } = render(
      <FormWrapper testID={testID}>
        <Text>Content</Text>
      </FormWrapper>
    );

    expect(getByTestId(testID)).toBeTruthy();
  });
});
