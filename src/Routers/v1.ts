import { authorize } from '@/Routers/v1/discord/oauth2/authorize';
import type { Variables } from '@/index';
import { OpenAPIHono } from '@hono/zod-openapi';

export const v1 = new OpenAPIHono<Variables>();

v1.route('/discord/oauth2', authorize);
