import { api } from '@/Routers/docs/api';
import type { Variables } from '@/index';
import { OpenAPIHono } from '@hono/zod-openapi';
import { health } from './health';

export const route = new OpenAPIHono<Variables>();

route.route('/', health);
route.route('/docs', api);
