
// Simple in-memory cache for development
// In production, this could use Redis

class SimpleCache {
  private store = new Map<string, { value: any; expires: number }>();

  set(key: string, value: any, ttlSeconds = 300) {
    this.store.set(key, {
      value,
      expires: Date.now() + ttlSeconds * 1000
    });
  }

  get(key: string) {
    const item = this.store.get(key);
    if (!item) return null;
    
    if (Date.now() > item.expires) {
      this.store.delete(key);
      return null;
    }
    
    return item.value;
  }

  delete(key: string) {
    this.store.delete(key);
  }

  clear() {
    this.store.clear();
  }
}

export const cache = new SimpleCache();
