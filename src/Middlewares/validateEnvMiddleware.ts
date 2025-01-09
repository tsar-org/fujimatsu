import type { ExtendedBindings } from '@/index';
import type { MiddlewareHandler } from 'hono';
import { env } from 'hono/adapter';

export const validateEnvMiddleware: MiddlewareHandler = async (c, next) => {
	type defaultEnvType = Record<string, unknown>;
	type extendDefaultEnvType = defaultEnvType & ExtendedBindings;

	const envVars = env<extendDefaultEnvType>(c);

	for (const key in envVars) {
		if (!envVars[key]) {
			return c.json({ error: 'Missing environment variable' }, 503);
		}
	}

	await next();
};
