import { route } from '@/Routers/route';
import { Hono } from 'hono';
import { logger } from 'hono/logger';

export type Variables = {
	Bindings: {
		DISCORD_ID: string;
		DISCORD_SECRET: string;
	};
};

const app = new Hono<Variables>();

app.use(logger());

app.route('/', route);

export default app;
