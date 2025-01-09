import { injectDependenciesMiddleware } from '@/Middlewares/injectDependenciesMiddleware';
import { route } from '@/Routers/route';
import type { AuthorizeUsecaseInterface } from '@/Usecases/AuthorizeUsecase';
import { OpenAPIHono } from '@hono/zod-openapi';
import type { Bindings, Variables } from 'hono/types';

export interface ExtendedBindings extends Bindings {
	DISCORD_OAUTH_BASE_URL: string;
	DISCORD_ID: string;
	DISCORD_SECRET: string;
	DISCORD_REDIRECT_URL: string;
}

export interface ExtendedVariables extends Variables {
	AuthorizeUsecase: AuthorizeUsecaseInterface;
}

export interface ExtendVariables extends Variables {
	Bindings: ExtendedBindings;
	Variables: ExtendedVariables;
}

const app = new OpenAPIHono<Variables>();

// middleware
app.use(injectDependenciesMiddleware);

// route
app.route('/', route);

// OpenAPI documentation
app.doc('/docs/api.json', {
	openapi: '3.1.0',
	info: {
		version: '1.0.0',
		title: 'Fujimatsu API Reference',
	},
});

export default app;
