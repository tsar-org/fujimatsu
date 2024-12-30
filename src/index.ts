import type { DiscordOauth2Controller } from '@/Controllers/v1/DiscordOauth2Controller';
import { route } from '@/Routers/route';
import { OpenAPIHono } from '@hono/zod-openapi';
import { injectDependencies } from './Middlewares/injectDependencies';

export type Variables = {
	Bindings: {
		DISCORD_ID: string;
		DISCORD_SECRET: string;
	};
	Variables: {
		DiscordOauth2Controller: DiscordOauth2Controller;
	};
};

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
