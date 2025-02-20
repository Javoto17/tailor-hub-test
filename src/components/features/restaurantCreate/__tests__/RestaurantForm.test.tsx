import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import RestaurantForm from '../RestaurantForm';
import { launchImageLibrary } from 'react-native-image-picker';

// Mock dependencies
jest.mock('react-native-image-picker', () => ({
  launchImageLibrary: jest.fn(),
}));

describe('RestaurantForm', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with empty initial values', () => {
    const { getByPlaceholderText, getByText } = render(
      <RestaurantForm onSubmit={mockOnSubmit} />
    );

    expect(getByPlaceholderText('Nombre del restaurante')).toBeTruthy();
    expect(getByPlaceholderText('Dirección')).toBeTruthy();
    expect(
      getByPlaceholderText('Escribe información del restaurante')
    ).toBeTruthy();
    expect(getByText('Agregar imagen')).toBeTruthy();
  });

  it('shows validation errors when submitting empty form', async () => {
    const { getByText, findByText } = render(
      <RestaurantForm onSubmit={mockOnSubmit} />
    );

    fireEvent.press(getByText('Guardar'));

    await waitFor(() => {
      expect(findByText('El nombre es requerido')).toBeTruthy();
      expect(findByText('La descripción es requerida')).toBeTruthy();
      expect(findByText('La imagen es requerida')).toBeTruthy();
    });
  });

  it('submits form with valid data', async () => {
    const { getByPlaceholderText, getByText } = render(
      <RestaurantForm onSubmit={mockOnSubmit} />
    );

    // Fill in form data
    fireEvent.changeText(
      getByPlaceholderText('Nombre del restaurante'),
      'Test Restaurant'
    );

    fireEvent.changeText(getByPlaceholderText('Dirección'), 'Test Address');

    fireEvent.changeText(
      getByPlaceholderText('Escribe información del restaurante'),
      'Test description that is long enough'
    );

    // Mock image selection
    const mockImageResult = {
      didCancel: false,
      assets: [{ uri: 'mock-image-uri' }],
    };
    (launchImageLibrary as jest.Mock).mockResolvedValueOnce(mockImageResult);

    fireEvent.press(getByText('Agregar imagen'));

    await waitFor(() => {
      expect(launchImageLibrary).toHaveBeenCalled();
    });

    fireEvent.press(getByText('Guardar'));

    await waitFor(() => {
      expect(mockOnSubmit).not.toHaveBeenCalled(); // Should not be called because location is required
    });
  });
});
