import { createExecutionContext } from 'cloudflare:test';
import worker from '@/../src';
import { IncomingRequest } from 'test/helpers/incomingRequest';
import { mockEnv } from 'test/helpers/mockEnv';
import { describe, expect, it } from 'vitest';

describe('test validateEnvMiddleware', () => {
  it('should proceed to next middleware if environment variables are present', async () => {
    // arrange
    const request = new IncomingRequest('http://localhost:8787/');
    const env = mockEnv();
    const ctx = createExecutionContext();

    // act
    const response = await worker.fetch(request, env, ctx);

    // assert
    expect(await response.status).not.toBe(503);
  });

  it('should return 503 if environment variable is missing', async () => {
    // arrange
    const request = new IncomingRequest('http://localhost:8787/');
    const env = {};
    const ctx = createExecutionContext();

    // act
    const response = await worker.fetch(request, env, ctx);

    // assert
    expect(await response.status).toBe(503);
  });
});
