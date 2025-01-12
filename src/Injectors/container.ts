import 'reflect-metadata';
import { DiscordOauth2Client } from '@/Clients/DiscordOauth2Client';
import {
  AuthorizeUsecase,
  type AuthorizeUsecaseInterface,
} from '@/Usecases/AuthorizeUsecase';
import { Container } from 'inversify';
import { DependencyInjectionType } from './container.type';

export const DependencyInjectionContainer = new Container();

DependencyInjectionContainer.bind<DiscordOauth2Client>(
  DependencyInjectionType.DiscordOauth2Client,
).to(DiscordOauth2Client);

DependencyInjectionContainer.bind<AuthorizeUsecaseInterface>(
  DependencyInjectionType.AuthorizeUsecase,
).to(AuthorizeUsecase);
