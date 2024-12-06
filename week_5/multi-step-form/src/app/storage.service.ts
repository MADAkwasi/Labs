type StorageData = string | object | number | boolean;

export class StorageService {
  saveData(key: string, data: unknown): void {
    if (data === undefined || data === null) {
      localStorage.removeItem(key);
    } else if (typeof data === 'object') {
      localStorage.setItem(key, JSON.stringify(data));
    } else {
      localStorage.setItem(key, String(data));
    }
  }

  getData<T extends StorageData>(key: string): T | null {
    const data = localStorage.getItem(key);
    if (data === null) return null;

    try {
      return JSON.parse(data) as T;
    } catch (error) {
      return data as T;
    }
  }
}
