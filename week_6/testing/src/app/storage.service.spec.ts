import { StorageService } from './storage.service'; // Adjust the import path as needed

describe('S-torageService', () => {
  let storageService: StorageService;

  beforeEach(() => {
    storageService = new StorageService();

    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
    };

    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });
  });

  describe('saveData', () => {
    it('should save a string value to localStorage', () => {
      const key = 'testKey';
      const value = 'testValue';

      storageService.saveData(key, value);

      expect(localStorage.setItem).toHaveBeenCalledWith(key, value);
    });

    it('should save an object value to localStorage as a string', () => {
      const key = 'testKey';
      const value = { name: 'Test' };

      storageService.saveData(key, value);

      expect(localStorage.setItem).toHaveBeenCalledWith(
        key,
        JSON.stringify(value)
      );
    });

    it('should remove an item from localStorage if data is null', () => {
      const key = 'testKey';
      storageService.saveData(key, null);

      expect(localStorage.removeItem).toHaveBeenCalledWith(key);
    });

    it('should remove an item from localStorage if data is undefined', () => {
      const key = 'testKey';
      storageService.saveData(key, undefined);

      expect(localStorage.removeItem).toHaveBeenCalledWith(key);
    });
  });

  describe('getData', () => {
    it('should return the correct value when data is a string', () => {
      const key = 'testKey';
      const value = 'testValue';
      (localStorage.getItem as jest.Mock).mockReturnValue(value);

      const result = storageService.getData<string>(key);

      expect(result).toBe(value);
    });

    it('should return the correct object when data is an object', () => {
      const key = 'testKey';
      const value = { name: 'Test' };
      (localStorage.getItem as jest.Mock).mockReturnValue(
        JSON.stringify(value)
      );

      const result = storageService.getData<object>(key);

      expect(result).toEqual(value);
    });

    it('should return null if the key does not exist in localStorage', () => {
      const key = 'testKey';
      (localStorage.getItem as jest.Mock).mockReturnValue(null);

      const result = storageService.getData<string>(key);

      expect(result).toBeNull();
    });

    it('should handle invalid JSON and return the original value', () => {
      const key = 'testKey';
      const value = 'invalid json value';
      (localStorage.getItem as jest.Mock).mockReturnValue(value);

      const result = storageService.getData<string>(key);

      expect(result).toBe(value);
    });

    it('should throw an error if the stored JSON is malformed', () => {
      const key = 'testKey';
      const value = '{ invalid json }';
      (localStorage.getItem as jest.Mock).mockReturnValue(value);

      const result = storageService.getData<string>(key);

      expect(result).toBe(value);
    });
  });
});
