import { api } from '@/Routers/docs/api';
import { health } from '@/Routers/health';
import { v1 } from '@/Routers/v1';
import type { ExtendVariables } from '@/index';
import { OpenAPIHono } from '@hono/zod-openapi';

export const route = new OpenAPIHono<ExtendVariables>();

route.route('/', health);
route.route('/docs', api);
route.route('/v1', v1);
