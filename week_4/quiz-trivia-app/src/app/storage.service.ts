export class StorageService {
  saveData(key: string, data: any): void {
    if (data === undefined || data === null) {
      localStorage.removeItem(key);
    } else {
      if (typeof data === 'object') {
        localStorage.setItem(key, JSON.stringify(data));
      } else {
        localStorage.setItem(key, String(data));
      }
    }
  }

  getData<T>(key: string): T | null {
    const data = localStorage.getItem(key);
    if (data === null) return null;

    try {
      return JSON.parse(data);
    } catch (error) {
      return data as unknown as T;
    }
  }
}
