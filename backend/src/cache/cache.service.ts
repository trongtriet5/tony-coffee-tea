import { Injectable } from '@nestjs/common';

export interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

interface GlobalCache {
  cache: Map<string, CacheEntry<any>>;
}

declare const global: GlobalCache;

@Injectable()
export class CacheService {
  private static readonly TTL = 60000;

  constructor() {
    if (!global.cache) {
      global.cache = new Map<string, CacheEntry<any>>();
    }
  }

  get<T>(key: string): T | null {
    const entry = global.cache.get(key);
    if (!entry) return null;

    if (Date.now() - entry.timestamp > CacheService.TTL) {
      global.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  set<T>(key: string, data: T): void {
    global.cache.set(key, { data, timestamp: Date.now() });
  }

  invalidate(key: string): void {
    global.cache.delete(key);
  }

  invalidatePattern(pattern: string): void {
    for (const key of global.cache.keys()) {
      if (key.includes(pattern)) {
        global.cache.delete(key);
      }
    }
  }

  clear(): void {
    global.cache.clear();
  }
}
