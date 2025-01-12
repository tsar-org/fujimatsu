import 'reflect-metadata';
import { injectable } from 'inversify';

export interface DiscordOauth2ClientInterface {
  generateAuthorizeUrl(): Promise<string>;
}

@injectable()
export class DiscordOauth2Client implements DiscordOauth2ClientInterface {
  constructor(
    private readonly DISCORD_OAUTH_BASE_URL: string,
    private readonly CLIENT_ID: string,
    private readonly CLIENT_SECRET: string,
    private readonly DISCORD_REDIRECT_URL: string,
  ) {}

  public async generateAuthorizeUrl(): Promise<string> {
    const encodedRedirectUrl = encodeURIComponent(this.DISCORD_REDIRECT_URL);
    return `${this.DISCORD_OAUTH_BASE_URL}/authorize?client_id=${this.CLIENT_ID}&redirect_uri=${encodedRedirectUrl}&response_type=code&scope=identify`;
  }
}
