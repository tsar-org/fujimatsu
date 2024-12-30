import {
	createExecutionContext,
	waitOnExecutionContext,
} from 'cloudflare:test';
import worker from '@/../src';
import { describe, expect, it } from 'vitest';

const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;

describe('test GET /docs/api', () => {
	it('snapshot test', async () => {
		// act
		const request = new IncomingRequest('http://localhost:8787/docs/api');
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, {}, ctx);
		await waitOnExecutionContext(ctx);

		// assert
		expect(await response.status).toBe(200);
		expect(await response.text()).toMatchSnapshot();
	});
});
