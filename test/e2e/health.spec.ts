import {
	createExecutionContext,
	waitOnExecutionContext,
} from 'cloudflare:test';
import worker from '@/../src';
import { mockEnv } from 'test/helpers/mockEnv';
import { describe, expect, it } from 'vitest';

const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;

describe('test GET /', () => {
	it('success', async () => {
		// arrange
		const env = mockEnv();
		const ctx = createExecutionContext();

		// act
		const request = new IncomingRequest('http://localhost:8787/');
		const response = await worker.fetch(request, env, ctx);
		await waitOnExecutionContext(ctx);

		// assert
		expect(await response.status).toBe(200);
		expect(await response.json()).toEqual({ message: 'OK' });
	});
});
