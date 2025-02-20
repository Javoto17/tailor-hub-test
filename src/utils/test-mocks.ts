// Navigation mocks
export const mockNavigate = jest.fn();
export const mockGoBack = jest.fn();

export const mockNavigation = {
  navigate: mockNavigate,
  goBack: mockGoBack,
};

// Form mocks
export const mockFormSubmit = jest.fn();
export const mockFormError = new Error('Form submission failed');

// Reset all mocks
export const resetMocks = () => {
  mockNavigate.mockReset();
  mockGoBack.mockReset();
  mockFormSubmit.mockReset();
};

// Common test data
export const testFormData = {
  email: 'test@example.com',
  password: 'password123',
  name: 'Test User',
};
