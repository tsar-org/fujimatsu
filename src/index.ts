import { injectDependenciesMiddleware } from '@/Middlewares/injectDependenciesMiddleware';
import {
	type EnvType,
	validateEnvMiddleware,
} from '@/Middlewares/validateEnvMiddleware';
import { route } from '@/Routers/route';
import type { AuthorizeUsecaseInterface } from '@/Usecases/AuthorizeUsecase';
import { OpenAPIHono } from '@hono/zod-openapi';
import type { Variables } from 'hono/types';

export interface ExtendedVariables extends Variables {
	safeEnv: EnvType;
	AuthorizeUsecase: AuthorizeUsecaseInterface;
}

export interface ExtendVariables extends Variables {
	Bindings: EnvType;
	Variables: ExtendedVariables;
}

const app = new OpenAPIHono<Variables>();

// middleware
app.use(injectDependenciesMiddleware);
app.use(validateEnvMiddleware);

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
