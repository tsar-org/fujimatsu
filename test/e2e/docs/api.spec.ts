import { createExecutionContext } from 'cloudflare:test';
import worker from '@/../src';
import { IncomingRequest } from 'test/helpers/incomingRequest';
import { mockEnv } from 'test/helpers/mockEnv';
import { describe, expect, it } from 'vitest';

describe('test GET /docs/api', () => {
  it('snapshot test', async () => {
    // arrange
    const request = new IncomingRequest('http://localhost:8787/docs/api');
    const env = mockEnv();
    const ctx = createExecutionContext();

    // act
    const response = await worker.fetch(request, env, ctx);

    // assert
    expect(await response.status).toBe(200);
    expect(await response.text()).toMatchSnapshot();
  });
});
