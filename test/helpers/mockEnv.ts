import type { ExtendedBindings } from '@/index';

/**
 * Mock cloudflare worker Env
 * @param {Partial<ExtendedBindings>} overrides
 * @returns {ExtendedBindings} mock env
 */
export function mockEnv(
	overrides: Partial<ExtendedBindings> = {},
): ExtendedBindings {
	return {
		DISCORD_OAUTH_BASE_URL: 'https://discord-oauth-base-url',
		DISCORD_ID: 'discord-id',
		DISCORD_SECRET: 'discord-secret',
		DISCORD_REDIRECT_URL: 'https://discord-redirect-url',
		...overrides,
	};
}
