import 'reflect-metadata';
import { DiscordOauth2Client } from '@/Clients/DiscordOauth2Client';
import {
	DiscordOauth2Controller,
	type DiscordOauth2ControllerInterface,
} from '@/Controllers/v1/DiscordOauth2Controller';
import {
	AuthorizeUsecase,
	type AuthorizeUsecaseInterface,
} from '@/Usecases/DiscordOauth2Controller/AuthorizeUsecase';
import { Container } from 'inversify';
import { DependencyInjectionType } from './container.type';

export const DependencyInjectionContainer = new Container();

DependencyInjectionContainer.bind<DiscordOauth2Client>(
	DependencyInjectionType.DiscordOauth2Client,
).to(DiscordOauth2Client);

DependencyInjectionContainer.bind<AuthorizeUsecaseInterface>(
	DependencyInjectionType.AuthorizeUsecase,
).to(AuthorizeUsecase);

DependencyInjectionContainer.bind<DiscordOauth2ControllerInterface>(
	DependencyInjectionType.DiscordOauth2Controller,
).to(DiscordOauth2Controller);
