import { expect, device, element, by, waitFor } from 'detox';

describe('Authentication Flow', () => {
  beforeAll(async () => {
    await device.launchApp({
      newInstance: true,
      launchArgs: {
        detoxURLBlacklistRegex:
          '\\("^https://technical-review-api-tailor.netlify.app/api/"\\)',
      },
    });
  });

  it('should navigate to Login screen when the button is pressed', async () => {
    await waitFor(element(by.text('Iniciar')))
      .toBeVisible()
      .withTimeout(5000);

    await element(by.text('Iniciar')).tap();
  });

  describe('Login Flow', () => {
    it('should show validation errors for empty fields', async () => {
      await waitFor(element(by.id('email-input')))
        .toBeVisible()
        .withTimeout(1000);
      await waitFor(element(by.id('password-input')))
        .toBeVisible()
        .withTimeout(1000);

      await element(by.id('email-input')).typeText('');
      await element(by.id('password-input')).typeText('');

      await element(by.id('login-button')).tap();

      await waitFor(element(by.text('Email es requerido')))
        .toBeVisible()
        .withTimeout(1000);
      await waitFor(element(by.text('Contraseña es requerida')))
        .toBeVisible()
        .withTimeout(1000);
    });

    it('should show error for invalid email format', async () => {
      await waitFor(element(by.id('email-input')))
        .toBeVisible()
        .withTimeout(1000);
      await waitFor(element(by.id('password-input')))
        .toBeVisible()
        .withTimeout(1000);

      await element(by.id('email-input')).typeText('invalid-email');
      await element(by.id('login-button')).tap();

      await expect(element(by.text('Email no válido'))).toBeVisible();

      await element(by.id('email-input')).clearText();
      await element(by.id('password-input')).clearText();
    });

    it('should login successfully with valid credentials', async () => {
      await element(by.id('email-input')).typeText('test1@gmail.com');
      await element(by.id('password-input')).typeText('123456');

      await expect(element(by.text('Email no válido'))).not.toBeVisible();
      await expect(
        element(by.text('Contraseña es requerida'))
      ).not.toBeVisible();

      await element(by.id('login-button')).tap();

      await waitFor(element(by.text('Restaurantes')))
        .toBeVisible()
        .withTimeout(50000);
    });
  });
});

// describe('Authentication Flow', () => {
//   beforeAll(async () => {
//     await device.launchApp();
//   });

//   beforeEach(async () => {
//     await device.reloadReactNative();
//   });

//   describe('Home Screen', () => {
//     it('should navigate to Login screen when the button is pressed', async () => {
//       await element(by.text('Iniciar')).tap();
//       await expect(element(by.id('LoginScreen'))).toBeVisible();
//     });
//   });

//   describe('SignUp Flow', () => {
//     beforeEach(async () => {
//       await element(by.text('Regístrate')).tap();
//     });

//     it('should navigate through signup steps', async () => {
//       // Step 1: Email and Name
//       await element(by.id('signup-email-input')).typeText('new@example.com');
//       await element(by.id('signup-name-input')).typeText('John Doe');
//       await element(by.id('signup-next-button')).tap();

//       // Step 2: Password
//       await expect(element(by.id('signup-password-input'))).toBeVisible();
//       await element(by.id('signup-password-input')).typeText('password123');
//       await element(by.id('signup-finish-button')).tap();

//       await expect(element(by.id('restaurantsScreen'))).toBeVisible();
//     });

//     it('should show validation errors in signup form', async () => {
//       await element(by.id('signup-next-button')).tap();

//       await expect(element(by.text('Email es requerido'))).toBeVisible();
//       await expect(element(by.text('Nombre es requerido'))).toBeVisible();
//     });
//   });
// });
