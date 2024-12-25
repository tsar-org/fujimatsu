import type { Variables } from '@/index';
import { Hono } from 'hono';

export const oauth2 = new Hono<Variables>().basePath('/oauth2');

oauth2.get('/authorize', (c) => {
	const oauth2Controller = c.get('Oauth2Controller');
	return oauth2Controller.authorize(c);
});

oauth2.get('/token', (c) => {
	const oauth2Controller = c.get('Oauth2Controller');
	return oauth2Controller.exchangeCodeForToken(c);
});
