import {
	DiscordOauth2Client,
	type DiscordOauth2ClientInterface,
} from '@/Clients/DiscordOauth2Client';
import {
	DiscordOauth2Controller,
	type DiscordOauth2ControllerInterface,
} from '@/Controllers/v1/DiscordOauth2Controller';
import { DependencyInjectionContainer } from '@/Injectors/container';
import { DependencyInjectionType } from '@/Injectors/container.type';
import type { MiddlewareHandler } from 'hono';
import { env } from 'hono/adapter';

export const injectDependencies: MiddlewareHandler = async (c, next) => {
	const {
		DISCORD_OAUTH_BASE_URL,
		DISCORD_ID,
		DISCORD_SECRET,
		DISCORD_REDIRECT_URL,
	} = env<{
		DISCORD_OAUTH_BASE_URL: string;
		DISCORD_ID: string;
		DISCORD_SECRET: string;
		DISCORD_REDIRECT_URL: string;
	}>(c);

	DependencyInjectionContainer.rebind<DiscordOauth2ClientInterface>(
		DependencyInjectionType.DiscordOauth2Client,
	).toDynamicValue(() => {
		return new DiscordOauth2Client(
			DISCORD_OAUTH_BASE_URL,
			DISCORD_ID,
			DISCORD_SECRET,
			DISCORD_REDIRECT_URL,
		);
	});

	DependencyInjectionContainer.rebind<DiscordOauth2ControllerInterface>(
		DependencyInjectionType.DiscordOauth2Controller,
	).to(DiscordOauth2Controller);

	c.set(
		'DiscordOauth2Controller',
		DependencyInjectionContainer.get<DiscordOauth2ControllerInterface>(
			DependencyInjectionType.DiscordOauth2Controller,
		),
	);

	return next();
};
