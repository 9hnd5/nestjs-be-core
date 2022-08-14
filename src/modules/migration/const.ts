import { ConfigurableModuleBuilder } from '@nestjs/common';
import { MigrationOption } from '~/modules/migration/type';

export const MIGRATION_OPTION = Symbol('MIGRATION_OPTION');

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN, OPTIONS_TYPE, ASYNC_OPTIONS_TYPE } =
    new ConfigurableModuleBuilder<MigrationOption>()
        .setExtras({ isGlobal: false } as { isGlobal?: boolean }, (definition, extras) => ({
            ...definition,
            global: extras.isGlobal,
        }))
        .build();
