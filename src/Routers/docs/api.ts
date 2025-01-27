import type { ExtendVariables } from '@/index';
import { swaggerUI } from '@hono/swagger-ui';
import { OpenAPIHono } from '@hono/zod-openapi';

export const api = new OpenAPIHono<ExtendVariables>();

api.get(
  '/api',
  swaggerUI({
    url: '/docs/api.json',
  }),
);
