import { vi } from 'vitest';

/**
 * Mock console.error
 */
export function mockConsole() {
  vi.spyOn(console, 'error').mockImplementation(() => {});
}
