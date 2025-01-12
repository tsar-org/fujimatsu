import {
  DiscordOauth2Client,
  type DiscordOauth2ClientInterface,
} from '@/Clients/DiscordOauth2Client';
import { DependencyInjectionContainer } from '@/Injectors/container';
import { DependencyInjectionType } from '@/Injectors/container.type';
import type { EnvType } from '@/Middlewares/validateEnvMiddleware';
import type { AuthorizeUsecaseInterface } from '@/Usecases/AuthorizeUsecase';
import type { MiddlewareHandler } from 'hono';
import { env } from 'hono/adapter';

export const injectDependenciesMiddleware: MiddlewareHandler = async (
  c,
  next,
) => {
  const envVars: EnvType = env<Record<string, unknown> & EnvType>(c);

  DependencyInjectionContainer.rebind<DiscordOauth2ClientInterface>(
    DependencyInjectionType.DiscordOauth2Client,
  ).toDynamicValue(() => {
    return new DiscordOauth2Client(
      envVars.DISCORD_OAUTH_BASE_URL,
      envVars.DISCORD_ID,
      envVars.DISCORD_SECRET,
      envVars.DISCORD_REDIRECT_URL,
    );
  });

  c.set(
    'AuthorizeUsecase',
    DependencyInjectionContainer.get<AuthorizeUsecaseInterface>(
      DependencyInjectionType.AuthorizeUsecase,
    ),
  );

  return next();
};
