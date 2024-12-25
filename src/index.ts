import type { Oauth2Controller } from '@/Controllers/v1/discord/Oauth2Controller';
import { route } from '@/Routers/route';
import { Hono } from 'hono';

export type Variables = {
	Bindings: {
		DISCORD_ID: string;
		DISCORD_SECRET: string;
	};
	Variables: {
		Oauth2Controller: Oauth2Controller;
	};
};

const app = new Hono<Variables>();

app.route('/', route);

export default app;
