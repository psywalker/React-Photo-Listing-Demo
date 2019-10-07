import handleDowloadPhoto from './handleDowloadPhoto';

describe('Test `handleDowloadPhoto` method', () => {
  // Default Data
  const rest = [
    'black motorcycle',
    null,
  ];
  describe('Test `handleDowloadPhoto` result', () => {
    it('Diff result', () => {
      let result = handleDowloadPhoto(...rest);
      expect(result).toEqual('Black-motorcycle');

      result = handleDowloadPhoto(null, null);
      expect(result).toEqual('image.jpg');

      result = handleDowloadPhoto();
      expect(result).toEqual('image.jpg');
    });
  });
});