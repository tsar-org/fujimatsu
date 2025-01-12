import 'reflect-metadata';
import type { DiscordOauth2ClientInterface } from '@/Clients/DiscordOauth2Client';
import { DependencyInjectionType } from '@/Injectors/container.type';
import { inject, injectable } from 'inversify';

export type AuthorizeUsecaseInterface = {
  execute(): Promise<string | Error>;
};

@injectable()
export class AuthorizeUsecase implements AuthorizeUsecaseInterface {
  constructor(
    @inject(DependencyInjectionType.DiscordOauth2Client)
    private discordOauth2Client: DiscordOauth2ClientInterface,
  ) {}

  public async execute(): Promise<string | Error> {
    try {
      return await this.discordOauth2Client.generateAuthorizeUrl();
    } catch (e) {
      console.error(e);
      return new Error(`Failed to AuthorizeUsecase, error: ${e}`);
    }
  }
}
