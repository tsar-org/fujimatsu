import { route } from '@/Routers/route';
import { OpenAPIHono } from '@hono/zod-openapi';

export type Variables = {
	Bindings: {
		DISCORD_ID: string;
		DISCORD_SECRET: string;
	};
};

const app = new OpenAPIHono<Variables>();

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
