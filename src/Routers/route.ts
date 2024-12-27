import type { Variables } from '@/index';
import { Hono } from 'hono';
import { health } from './health';

export const route = new Hono<Variables>();

route.route('/', health);
