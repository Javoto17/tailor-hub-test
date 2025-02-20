import React from 'react';
import {
  render,
  fireEvent,
  waitFor,
  screen,
} from '@testing-library/react-native';
import FormSignUp from '../FormSignUp';

describe('FormSignUp', () => {
  const mockOnPressLink = jest.fn();
  const mockOnSubmit = jest.fn();

  const renderForm = (props = {}) => {
    return render(
      <FormSignUp
        onPressLink={mockOnPressLink}
        onSubmit={mockOnSubmit}
        {...props}
      />
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('First Step - User Data', () => {
    it('should validate required fields in first step', async () => {
      renderForm();

      fireEvent.press(screen.getByTestId('signup-next-button'));

      await waitFor(() => {
        expect(screen.getByText('Email es requerido')).toBeTruthy();
        expect(screen.getByText('Nombre es requerido')).toBeTruthy();
      });
    });

    it('should validate email format', async () => {
      renderForm();
      fireEvent.changeText(
        screen.getByTestId('signup-email-input'),
        'invalid-email'
      );
      fireEvent.changeText(screen.getByTestId('signup-name-input'), 'John Doe');
      fireEvent.press(screen.getByTestId('signup-next-button'));

      await waitFor(() => {
        expect(screen.getByText('Email no válido')).toBeTruthy();
      });
    });

    it('should proceed to password step with valid data', async () => {
      renderForm();
      fireEvent.changeText(
        screen.getByTestId('signup-email-input'),
        'test@example.com'
      );
      fireEvent.changeText(screen.getByTestId('signup-name-input'), 'John Doe');
      fireEvent.press(screen.getByTestId('signup-next-button'));

      await waitFor(() => {
        expect(screen.getByTestId('signup-password-input')).toBeTruthy();
        expect(screen.getByText('Finalizar')).toBeTruthy();
      });
    });

    it('should clear field errors on submit', async () => {
      renderForm();

      fireEvent.press(screen.getByTestId('signup-next-button'));

      await waitFor(() => {
        expect(screen.getByText('Email es requerido')).toBeTruthy();
      });

      fireEvent.changeText(
        screen.getByTestId('signup-email-input'),
        'test@example.com'
      );

      fireEvent.press(screen.getByTestId('signup-next-button'));

      await waitFor(() => {
        expect(screen.queryByText('Email es requerido')).toBeNull();
      });
    });
  });

  describe('Second Step - Password', () => {
    it('should validate password requirements', async () => {
      renderForm();

      // Move to password step
      fireEvent.changeText(
        screen.getByTestId('signup-email-input'),
        'test@example.com'
      );
      fireEvent.changeText(screen.getByTestId('signup-name-input'), 'John Doe');
      fireEvent.press(screen.getByTestId('signup-next-button'));

      // Try to submit with invalid password
      await waitFor(() => {
        fireEvent.changeText(
          screen.getByTestId('signup-password-input'),
          '12345'
        );
        fireEvent.press(screen.getByTestId('signup-finish-button'));
      });

      await waitFor(() => {
        expect(
          screen.getByText('La contraseña debe tener al menos 6 caracteres')
        ).toBeTruthy();
      });
    });

    it('should submit form with valid data', async () => {
      renderForm();

      // Fill first step
      fireEvent.changeText(
        screen.getByTestId('signup-email-input'),
        'test@example.com'
      );
      fireEvent.changeText(screen.getByTestId('signup-name-input'), 'John Doe');
      fireEvent.press(screen.getByTestId('signup-next-button'));

      // Fill password and submit
      await waitFor(() => {
        fireEvent.changeText(
          screen.getByTestId('signup-password-input'),
          'password123'
        );
        fireEvent.press(screen.getByTestId('signup-finish-button'));
      });

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith({
          email: 'test@example.com',
          name: 'John Doe',
          password: 'password123',
        });
      });
    });

    it('should handle submission loading state', async () => {
      mockOnSubmit.mockImplementation(
        () => new Promise((resolve) => setTimeout(resolve, 100))
      );
      renderForm();

      // Complete form and submit
      fireEvent.changeText(
        screen.getByTestId('signup-email-input'),
        'test@example.com'
      );
      fireEvent.changeText(screen.getByTestId('signup-name-input'), 'John Doe');
      fireEvent.press(screen.getByTestId('signup-next-button'));

      await waitFor(() => {
        fireEvent.changeText(
          screen.getByTestId('signup-password-input'),
          'password123'
        );
        fireEvent.press(screen.getByTestId('signup-finish-button'));
      });

      expect(screen.getByTestId('spinner')).toBeTruthy();
      await waitFor(() => {
        expect(screen.queryByTestId('spinner')).toBeNull();
      });
    });
  });

  describe('Navigation', () => {
    it('should return to first step when back button is pressed', async () => {
      renderForm();

      // Move to password step
      fireEvent.changeText(
        screen.getByTestId('signup-email-input'),
        'test@example.com'
      );

      fireEvent.changeText(screen.getByTestId('signup-name-input'), 'John Doe');
      fireEvent.press(screen.getByTestId('signup-next-button'));

      // Press back button
      await waitFor(() => {
        fireEvent.press(screen.getByTestId('back-button'));
      });

      // Should show first step fields
      expect(screen.getByTestId('signup-email-input')).toBeTruthy();
      expect(screen.getByTestId('signup-name-input')).toBeTruthy();
    });
  });
});
