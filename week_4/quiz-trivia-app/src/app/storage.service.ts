export class StorageService {
  // Save data to localStorage
  saveData(key: string, data: any): void {
    if (data === undefined || data === null) {
      localStorage.removeItem(key);
    } else {
      // Save objects as JSON, others (like strings) as simple strings
      if (typeof data === 'object') {
        localStorage.setItem(key, JSON.stringify(data)); // Save objects as JSON
      } else {
        localStorage.setItem(key, String(data)); // Save strings and primitives as simple strings
      }
    }
  }

  // Get data from localStorage
  getData<T>(key: string): T | null {
    const data = localStorage.getItem(key);
    if (data === null) return null;

    // Try to parse data as JSON if possible, otherwise return it as string
    try {
      return JSON.parse(data); // Attempt to parse as JSON
    } catch (error) {
      return data as unknown as T; // If it's not JSON, return it as string or number
    }
  }
}
