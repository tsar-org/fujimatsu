import {
	createExecutionContext,
	waitOnExecutionContext,
} from 'cloudflare:test';
import worker from '@/../src';
import { describe, expect, it } from 'vitest';

const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;

describe('test GET /', () => {
	it('should redirect to discord login URL', async () => {
		//mock
		const mockEnv = {
			DISCORD_OAUTH_BASE_URL: 'https://discord-oauth-base-url',
			DISCORD_ID: 'discord-id',
			DISCORD_SECRET: 'discord-secret',
			DISCORD_REDIRECT_URL: 'https://discord-redirect-url',
		};

		// act
		const request = new IncomingRequest(
			'http://localhost:8787/v1/discord/oauth2/authorize',
		);
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, mockEnv, ctx);
		await waitOnExecutionContext(ctx);

		// assert
		expect(await response.status).toBe(302);
		expect(await response.headers.get('Location')).toBe(
			`${mockEnv.DISCORD_OAUTH_BASE_URL}/authorize?client_id=${mockEnv.DISCORD_ID}&redirect_uri=${encodeURIComponent(mockEnv.DISCORD_REDIRECT_URL)}&response_type=code&scope=identify`,
		);
	});
});
