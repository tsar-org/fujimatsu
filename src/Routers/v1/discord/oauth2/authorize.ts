import type { Variables } from '@/index';
import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';

export const authorize = new OpenAPIHono<Variables>();

const authorizeRoute = createRoute({
	path: '/authorize',
	method: 'get',
	description: 'Authorize',
	request: {},
	responses: {
		302: {
			description: 'Redirect to Discord Login URL',
		},
		500: {
			description: 'Internal Server Error',
			content: {
				'application/json': {
					schema: z.object({
						message: z.literal('Internal server error'),
					}),
				},
			},
		},
	},
});

authorize.openapi(authorizeRoute, (c) => {
	const discordOauth2Controller = c.get('DiscordOauth2Controller');
	return discordOauth2Controller.authorize(c);
});
