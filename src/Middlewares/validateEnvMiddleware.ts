import { z } from '@hono/zod-openapi';
import type { MiddlewareHandler } from 'hono';
import { env } from 'hono/adapter';

const EnvSchema = z.object({
	DISCORD_OAUTH_BASE_URL: z.string().nonempty(),
	DISCORD_ID: z.string().nonempty(),
	DISCORD_SECRET: z.string().nonempty(),
	DISCORD_REDIRECT_URL: z.string().nonempty(),
});

export type EnvType = z.infer<typeof EnvSchema>;

export const validateEnvMiddleware: MiddlewareHandler = async (c, next) => {
	const envVars = env(c);

	const parsed = EnvSchema.safeParse(envVars);
	if (!parsed.success) {
		return c.json({ error: 'Missing environment variable' }, 503);
	}

	c.set('safeEnv', parsed.data);

	await next();
};
