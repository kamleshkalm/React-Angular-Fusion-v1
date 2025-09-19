// Event Bus for cross-framework communication
export interface EventBus {
  on(event: string, callback: Function): void;
  off(event: string, callback: Function): void;
  emit(event: string, data?: any): void;
  once(event: string, callback: Function): void;
  removeAllListeners(event?: string): void;
}

/**
 * A simple event bus for cross-framework communication
 * @example
 * // JavaScript
 * const bus = new EventBusImpl();
 * bus.on('data', (data) => console.log(data));
 * bus.emit('data', { message: 'Hello' });
 * 
 * // TypeScript
 * import { EventBusImpl } from '@react-angular-fusion/core';
 * const bus = new EventBusImpl();
 * bus.on('userUpdate', (user: User) => updateUI(user));
 */
export class EventBusImpl implements EventBus {
  private events: Map<string, Function[]> = new Map();

  on(event: string, callback: Function): void {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event)!.push(callback);
  }

  off(event: string, callback: Function): void {
    const callbacks = this.events.get(event);
    if (!callbacks) return;
    
    this.events.set(
      event, 
      callbacks.filter(cb => cb !== callback)
    );
  }

  emit(event: string, data?: any): void {
    const callbacks = this.events.get(event);
    if (!callbacks) return;
    
    // Create a copy to avoid issues if callbacks are removed during iteration
    const callbacksCopy = [...callbacks];
    callbacksCopy.forEach(callback => {
      try {
        callback(data);
      } catch (error) {
        console.error(`Error in event handler for ${event}:`, error);
      }
    });
  }

  once(event: string, callback: Function): void {
    const onceWrapper = (data: any) => {
      this.off(event, onceWrapper);
      callback(data);
    };
    this.on(event, onceWrapper);
  }

  removeAllListeners(event?: string): void {
    if (event) {
      this.events.delete(event);
    } else {
      this.events.clear();
    }
  }
}

// Shared context for global state management
export interface SharedContext {
  set<T>(key: string, value: T): void;
  get<T>(key: string): T | undefined;
  watch<T>(key: string, callback: (value: T) => void): () => void;
  remove(key: string): void;
  clear(): void;
  has(key: string): boolean;
  keys(): string[];
}

/**
 * Shared context for global state management between frameworks
 * @example
 * // JavaScript
 * const context = new SharedContextImpl();
 * context.set('user', { name: 'John' });
 * const user = context.get('user');
 * 
 * // TypeScript
 * import { SharedContextImpl } from '@react-angular-fusion/core';
 * interface User { name: string; }
 * const context = new SharedContextImpl();
 * context.set<User>('user', { name: 'John' });
 */
export class SharedContextImpl implements SharedContext {
  private data: Map<string, any> = new Map();
  private watchers: Map<string, Function[]> = new Map();

  set<T>(key: string, value: T): void {
    this.data.set(key, value);
    this.notifyWatchers(key, value);
  }

  get<T>(key: string): T | undefined {
    return this.data.get(key);
  }

  watch<T>(key: string, callback: (value: T) => void): () => void {
    if (!this.watchers.has(key)) {
      this.watchers.set(key, []);
    }
    this.watchers.get(key)!.push(callback);

    // Return unsubscribe function
    return () => {
      const callbacks = this.watchers.get(key);
      if (callbacks) {
        this.watchers.set(
          key, 
          callbacks.filter(cb => cb !== callback)
        );
      }
    };
  }

  remove(key: string): void {
    this.data.delete(key);
    this.watchers.delete(key);
  }

  clear(): void {
    this.data.clear();
    this.watchers.clear();
  }

  has(key: string): boolean {
    return this.data.has(key);
  }

  keys(): string[] {
    return Array.from(this.data.keys());
  }

  private notifyWatchers(key: string, value: any): void {
    const callbacks = this.watchers.get(key);
    if (!callbacks) return;
    
    // Create a copy to avoid issues if callbacks are removed during iteration
    const callbacksCopy = [...callbacks];
    callbacksCopy.forEach(callback => {
      try {
        callback(value);
      } catch (error) {
        console.error(`Error in watcher for ${key}:`, error);
      }
    });
  }
}

// Singleton instances for global access
export const globalEventBus: EventBus = new EventBusImpl();
export const globalSharedContext: SharedContext = new SharedContextImpl();

// Utility functions
export const frameworkUtils = {
  /**
   * Check if running in a browser environment
   */
  isBrowser: (): boolean => {
    return typeof window !== 'undefined' && typeof document !== 'undefined';
  },

  /**
   * Check if running in a server environment
   */
  isServer: (): boolean => {
    return !frameworkUtils.isBrowser();
  },

  /**
   * Safe JSON stringify with error handling
   */
  safeStringify: (obj: any, indent?: number): string => {
    try {
      return JSON.stringify(obj, null, indent);
    } catch (error) {
      console.error('Error stringifying object:', error);
      return '{}';
    }
  },

  /**
   * Safe JSON parse with error handling
   */
  safeParse: <T>(json: string, defaultValue: T): T => {
    try {
      return JSON.parse(json) as T;
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return defaultValue;
    }
  }
};

const fusionCore = {
  EventBus: EventBusImpl,
  SharedContext: SharedContextImpl,
  globalEventBus,
  globalSharedContext,
  frameworkUtils
};

export default fusionCore;