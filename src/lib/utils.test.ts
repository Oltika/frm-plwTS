import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn', () => {
  it('merges class names and resolves Tailwind conflicts', () => {
    const result = cn('p-2', 'text-red-500', 'p-4', false && 'hidden');
    expect(result).toBe('text-red-500 p-4');
  });
});


