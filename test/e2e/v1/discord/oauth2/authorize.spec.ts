import {
	createExecutionContext,
	waitOnExecutionContext,
} from 'cloudflare:test';
import worker from '@/../src';
import { DiscordOauth2Client } from '@/Clients/DiscordOauth2Client';
import { mockConsole } from 'test/helpers/mockConsole';
import { describe, expect, it, vi } from 'vitest';

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

	it('should return 500 if client throws an error', async () => {
		//mock
		mockConsole();
		const mockEnv = {
			DISCORD_OAUTH_BASE_URL: 'https://discord-oauth-base-url',
			DISCORD_ID: 'discord-id',
			DISCORD_SECRET: 'discord-secret',
			DISCORD_REDIRECT_URL: 'https://discord-redirect-url',
		};
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
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, mockEnv, ctx);
		await waitOnExecutionContext(ctx);

		// assert
		expect(await response.status).toBe(500);
		expect(await response.json()).toEqual({ message: 'Internal server error' });
	});
});
