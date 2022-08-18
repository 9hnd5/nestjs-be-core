import { ConfigurableModuleBuilder } from '@nestjs/common';
import { HttpOption } from '~/modules/http/type';

export const HTTP_OPTION = Symbol('HTTP_OPTION');

export const {
    ConfigurableModuleClass: HttpConfigurableModuleClass,
    MODULE_OPTIONS_TOKEN: HTTP_MODULE_OPTIONS_TOKEN,
    OPTIONS_TYPE: HTTP_OPTIONS_TYPE,
    ASYNC_OPTIONS_TYPE: HTTP_ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<HttpOption>()
    .setExtras({ isGlobal: false } as { isGlobal?: boolean }, (definition, extras) => ({
        ...definition,
        global: extras.isGlobal,
    }))
    .build();
