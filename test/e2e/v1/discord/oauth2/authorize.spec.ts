import { createExecutionContext } from 'cloudflare:test';
import worker from '@/../src';
import { DiscordOauth2Client } from '@/Clients/DiscordOauth2Client';
import { IncomingRequest } from 'test/helpers/incomingRequest';
import { mockConsole } from 'test/helpers/mockConsole';
import { mockEnv } from 'test/helpers/mockEnv';
import { describe, expect, it, vi } from 'vitest';

describe('test GET /v1/discord/oauth2/authorize', () => {
	it('should redirect to discord login URL', async () => {
		// arrange
		const env = mockEnv();
		const ctx = createExecutionContext();

		// act
		const request = new IncomingRequest(
			'http://localhost:8787/v1/discord/oauth2/authorize',
		);
		const response = await worker.fetch(request, env, ctx);

		// assert
		expect(await response.status).toBe(302);
		expect(await response.headers.get('Location')).toBe(
			`${env.DISCORD_OAUTH_BASE_URL}/authorize?client_id=${env.DISCORD_ID}&redirect_uri=${encodeURIComponent(env.DISCORD_REDIRECT_URL)}&response_type=code&scope=identify`,
		);
	});

	it('should return 500 if client throws an error', async () => {
		// arrange
		const env = mockEnv();
		const ctx = createExecutionContext();
		mockConsole();
		vi.spyOn(
			DiscordOauth2Client.prototype,
			'generateAuthorizeUrl',
		).mockImplementationOnce(() => {
			throw new Error('Mocked error');
		});

		// act
		const request = new IncomingRequest(
			'http://localhost:8787/v1/discord/oauth2/authorize',
		);
		const response = await worker.fetch(request, env, ctx);

		// assert
		expect(await response.status).toBe(500);
		expect(await response.json()).toEqual({ message: 'Internal server error' });
	});
});
