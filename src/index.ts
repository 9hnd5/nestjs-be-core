//base
export * from '~/bases/base-schema.base';
export * from '~/bases/base.command';
export * from '~/bases/base.controller';
export * from '~/bases/base.queries';
export * from '~/bases/base.repository';
export * from '~/bases/tenant-schema.base';
//config
export * from '~/config';
//const
export * from '~/constants/const';
export * from '~/constants/message.constant';
//Decorator
export * from '~/decorators/ignore-core-response.decorator';
export * from '~/interceptors/close-connection.interceptor';
export * from '~/interceptors/core-response.interceptor';
//interceptors
export * from '~/interceptors/core.interceptor';
//models
export * from '~/models/common.model';
export * from '~/models/error.model';
export * from '~/models/response.model';
//Auth module
export * from '~/modules/auth/auth.module';
export * from '~/modules/auth/auth.service';
export * from '~/modules/auth/decorators/auth.decorator';
export * from '~/modules/auth/decorators/local.decorator';
export * from '~/modules/auth/enums/permission.enum';
//caching module
export * from '~/modules/cache/cache.module';
export { RedisCacheService as CacheService } from '~/modules/cache/redis-cache.service';
//cqrs module
export * from '~/modules/cqrs/cqrs.implement';
export * from '~/modules/cqrs/cqrs.module';
export * from '~/modules/cqrs/mediator.service';
//File module
export * from '~/modules/file/file.module';
export * from '~/modules/file/file.service';
//Http module
export * from '~/modules/http/http.module';
export * from '~/modules/http/http.service';
//Initial module
export * from '~/modules/initial/initial.module';
//MailModule
export * from '~/modules/mail/mail.module';
export * from '~/modules/mail/mail.service';
export * from '~/modules/migration/migration.controller';
export * from '~/modules/migration/migration.module';
export * from '~/modules/migration/migration.service';
//Session module
export * from '~/modules/session/session.module';
export * from '~/modules/session/session.service';
export * from './script';

export { Context, storage } from '~/storage';

export type Immutable<T> = {
    +readonly [K in keyof T]: T[K];
};
export type Mutable<T> = {
    -readonly [K in keyof T]: T[K];
};

export type primitive = string | number | boolean | undefined | null | Date;
export type DeepImmutable<T> = T extends primitive ? T : DeepImmutableObject<T>;
export type DeepImmutableObject<T> = {
    +readonly [P in keyof T]: DeepImmutable<T[P]>;
};

export type DeepMutable<T> = T extends primitive ? T : DeepMutableObject<T>;
export type DeepMutableObject<T> = {
    -readonly [P in keyof T]: DeepMutable<T[P]>;
};
