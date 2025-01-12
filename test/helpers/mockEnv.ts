import type { EnvType } from '@/Middlewares/validateEnvMiddleware';

/**
 * Mock cloudflare worker Env
 * @param {Partial<EnvType>} overrides
 * @returns {EnvType} mock env
 */
export function mockEnv(overrides: Partial<EnvType> = {}): EnvType {
  return {
    DISCORD_OAUTH_BASE_URL: 'https://discord-oauth-base-url',
    DISCORD_ID: 'discord-id',
    DISCORD_SECRET: 'discord-secret',
    DISCORD_REDIRECT_URL: 'https://discord-redirect-url',
    ...overrides,
  };
}
