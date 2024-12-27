import type { Variables } from '@/index';
import { Hono } from 'hono';

export const health = new Hono<Variables>();

// health check
health.get('/', (c) => {
	return c.newResponse('OK', { status: 200 });
});
