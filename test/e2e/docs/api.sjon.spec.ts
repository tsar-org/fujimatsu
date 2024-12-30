import {
	createExecutionContext,
	env,
	waitOnExecutionContext,
} from 'cloudflare:test';
import worker from '@/../src';
import { describe, expect, it } from 'vitest';

const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;

describe('test GET /docs/api.json', () => {
	it('snapshot test', async () => {
		// act
		const request = new IncomingRequest('http://localhost:8787/docs/api.json');
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		await waitOnExecutionContext(ctx);

		// assert
		expect(await response.status).toBe(200);
		expect(await response.json()).toMatchSnapshot();
	});
});
