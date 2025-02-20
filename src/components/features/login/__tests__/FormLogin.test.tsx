import React from 'react';
import {
  render,
  fireEvent,
  waitFor,
  screen,
} from '@testing-library/react-native';
import FormLogin from '../FormLogin';

describe('FormLogin', () => {
  const mockOnPressLink = jest.fn();
  const mockOnSubmit = jest.fn();

  const renderForm = () => {
    return render(
      <FormLogin onPressLink={mockOnPressLink} onSubmit={mockOnSubmit} />
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Form Validation', () => {
    it('should show validation errors for empty required fields', async () => {
      renderForm();
      fireEvent.press(screen.getByText('Iniciar sesión'));

      await waitFor(() => {
        expect(screen.getByText('Email es requerido')).toBeTruthy();
        expect(screen.getByText('Contraseña es requerida')).toBeTruthy();
      });
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('should validate email format', async () => {
      renderForm();
      fireEvent.changeText(screen.getByTestId('email-input'), 'invalid-email');
      fireEvent.changeText(screen.getByTestId('password-input'), 'valid123');
      fireEvent.press(screen.getByText('Iniciar sesión'));

      await waitFor(() => {
        expect(screen.getByText('Email no válido')).toBeTruthy();
      });
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('should validate minimum password length', async () => {
      renderForm();
      fireEvent.changeText(
        screen.getByTestId('email-input'),
        'test@example.com'
      );
      fireEvent.changeText(screen.getByTestId('password-input'), '12345');
      fireEvent.press(screen.getByText('Iniciar sesión'));

      await waitFor(() => {
        expect(
          screen.getByText('La contraseña debe tener al menos 6 caracteres')
        ).toBeTruthy();
      });
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });
  });

  describe('Form Submission', () => {
    it('should submit form with valid data', async () => {
      renderForm();
      fireEvent.changeText(
        screen.getByTestId('email-input'),
        'test@example.com'
      );
      fireEvent.changeText(screen.getByTestId('password-input'), 'password123');
      fireEvent.press(screen.getByText('Iniciar sesión'));

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith({
          email: 'test@example.com',
          password: 'password123',
        });
      });
    });

    it('should show loading state while submitting', async () => {
      mockOnSubmit.mockImplementation(
        () => new Promise((resolve) => setTimeout(resolve, 100))
      );
      renderForm();

      fireEvent.changeText(
        screen.getByTestId('email-input'),
        'test@example.com'
      );
      fireEvent.changeText(screen.getByTestId('password-input'), 'password123');
      fireEvent.press(screen.getByText('Iniciar sesión'));

      expect(screen.getByTestId('spinner')).toBeTruthy();
      await waitFor(() => {
        expect(screen.queryByTestId('spinner')).toBeNull();
      });
    });
  });

  describe('Form Field Behavior', () => {
    it('should clear field errors on input change', async () => {
      renderForm();

      // Trigger validation errors
      fireEvent.press(screen.getByText('Iniciar sesión'));

      await waitFor(() => {
        expect(screen.getByText('Email es requerido')).toBeTruthy();
      });

      // Type in field
      fireEvent.changeText(
        screen.getByTestId('email-input'),
        'test@example.com'
      );

      await waitFor(() => {
        expect(screen.queryByText('Email es requerido')).toBeNull();
      });
    });
  });

  describe('Navigation', () => {
    it('should call onPressLink when register link is pressed', () => {
      renderForm();
      fireEvent.press(screen.getByText('Regístrate'));
      expect(mockOnPressLink).toHaveBeenCalledTimes(1);
    });
  });
});
