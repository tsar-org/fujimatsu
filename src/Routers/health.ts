import type { ExtendVariables } from '@/index';
import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';

export const health = new OpenAPIHono<ExtendVariables>();

const healthRoute = createRoute({
	path: '/',
	method: 'get',
	description: 'Health check',
	request: {},
	responses: {
		200: {
			description: 'OK',
			content: {
				'application/json': {
					schema: z.object({
						message: z.string({}),
					}),
				},
			},
		},
	},
});

health.openapi(healthRoute, (c) => {
	return c.json({ message: 'OK' }, 200);
});
