import type { Variables } from '@/index';
import { Hono } from 'hono';
import { oauth2 } from './discord/oauth2';

export const discord = new Hono<Variables>().basePath('/discord');

discord.route('/', oauth2);
