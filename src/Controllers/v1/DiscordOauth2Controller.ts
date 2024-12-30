import 'reflect-metadata';
import { DependencyInjectionType } from '@/Injectors/container.type';
import type { AuthorizeUsecaseInterface } from '@/Usecases/DiscordOauth2Controller/AuthorizeUsecase';
import type { Context } from 'hono';
import { inject, injectable } from 'inversify';

export interface DiscordOauth2ControllerInterface {
	authorize(req: Context): Promise<Response>;
}

@injectable()
export class DiscordOauth2Controller
	implements DiscordOauth2ControllerInterface
{
	constructor(
		@inject(DependencyInjectionType.AuthorizeUsecase)
		private authorizeUsecase: AuthorizeUsecaseInterface,
	) {}

	public async authorize(req: Context): Promise<Response> {
		const authorizeUrl = await this.authorizeUsecase.execute();

		if (authorizeUrl instanceof Error) {
			return req.json({ message: 'Internal server error' }, 500);
		}

		return req.redirect(authorizeUrl, 302);
	}
}
