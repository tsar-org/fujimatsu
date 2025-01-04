import { route } from '@/Routers/route';
import { OpenAPIHono } from '@hono/zod-openapi';
import type { Bindings, Variables } from 'hono/types';
import { injectDependencies } from './Middlewares/injectDependencies';
import type { AuthorizeUsecaseInterface } from './Usecases/AuthorizeUsecase';

interface ExtendedBindings extends Bindings {
	DISCORD_ID: string;
	DISCORD_SECRET: string;
}

interface ExtendedVariables extends Variables {
	AuthorizeUsecase: AuthorizeUsecaseInterface;
}

export interface ExtendVariables extends Variables {
	Bindings: ExtendedBindings;
	Variables: ExtendedVariables;
}

const app = new OpenAPIHono<Variables>();

// middleware
app.use(injectDependencies);

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
