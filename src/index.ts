import { route } from '@/Routers/route';
import { Hono } from 'hono';

export type Variables = {
	Bindings: {
		DISCORD_ID: string;
		DISCORD_SECRET: string;
	};
};

const app = new Hono<Variables>();

app.route('/', route);

export default app;
