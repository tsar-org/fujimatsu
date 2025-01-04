import type { ExtendVariables } from '@/index';
import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';

export const authorize = new OpenAPIHono<ExtendVariables>();

const authorizeRoute = createRoute({
	path: '/authorize',
	method: 'get',
	description: 'Authorize',
	request: {},
	responses: {
		302: {
			description: 'Redirect to Discord Login URL',
			content: undefined,
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

authorize.openapi(authorizeRoute, async (c) => {
	const authorizeUsecase = c.get('AuthorizeUsecase');
	const authorizeUrl = await authorizeUsecase.execute();

	if (authorizeUrl instanceof Error) {
		return c.json({ message: 'Internal server error' }, 500);
	}

	return c.redirect(authorizeUrl, 302);
});
