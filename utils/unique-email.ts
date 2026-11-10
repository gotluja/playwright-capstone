import { randomUUID } from 'node:crypto';

export function uniqueEmail(prefix = 'playwright'): string {
  return `${prefix}.${randomUUID()}@example.com`;
}
