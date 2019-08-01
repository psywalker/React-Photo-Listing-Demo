import { registerValidSW, unregister } from './serviceWorker';

Object.defineProperty(global.navigator, 'serviceWorker', {
  value: {
    register: jest.fn() // Choose your favourite mocking library
  }
});

describe('Test ServiseWorkers', () => {
  it(' ', () => {
    
  });
});