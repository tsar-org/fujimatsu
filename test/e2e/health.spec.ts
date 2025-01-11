import { createExecutionContext } from 'cloudflare:test';
import worker from '@/../src';
import { IncomingRequest } from 'test/helpers/incomingRequest';
import { mockEnv } from 'test/helpers/mockEnv';
import { describe, expect, it } from 'vitest';

describe('test GET /', () => {
	it('success', async () => {
		// arrange
		const request = new IncomingRequest('http://localhost:8787/');
		const env = mockEnv();
		const ctx = createExecutionContext();

		// act
		const response = await worker.fetch(request, env, ctx);

		// assert
		expect(await response.status).toBe(200);
		expect(await response.json()).toEqual({ message: 'OK' });
	});
});
