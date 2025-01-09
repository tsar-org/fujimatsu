import {
	DiscordOauth2Client,
	type DiscordOauth2ClientInterface,
} from '@/Clients/DiscordOauth2Client';
import { DependencyInjectionContainer } from '@/Injectors/container';
import { DependencyInjectionType } from '@/Injectors/container.type';
import type { AuthorizeUsecaseInterface } from '@/Usecases/AuthorizeUsecase';
import type { ExchangeCodeForTokenUsecaseInterface } from '@/Usecases/ExchangeCodeForTokenUsecase';
import type { MiddlewareHandler } from 'hono';
import { env } from 'hono/adapter';

export const injectDependenciesMiddleware: MiddlewareHandler = async (
	c,
	next,
) => {
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

	c.set(
		'AuthorizeUsecase',
		DependencyInjectionContainer.get<AuthorizeUsecaseInterface>(
			DependencyInjectionType.AuthorizeUsecase,
		),
	);

	c.set(
		'ExchangeCodeForTokenUsecase',
		DependencyInjectionContainer.get<ExchangeCodeForTokenUsecaseInterface>(
			DependencyInjectionType.ExchangeCodeForTokenUsecase,
		),
	);

	return next();
};
