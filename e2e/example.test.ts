import { expect, device, element } from 'detox';

describe('Login Screen', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should login with correct credentials', async () => {
    const email: string = 'test@example.com';
    const password: string = 'password123';

    await element(by.id('emailInput')).typeText(email);
    await element(by.id('passwordInput')).typeText(password);
    await element(by.id('loginButton')).tap();

    expect(await element(by.id('welcomeMessage'))).toBeVisible();
  });
});
