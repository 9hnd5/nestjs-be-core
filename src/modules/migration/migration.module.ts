import { DynamicModule, Module } from '@nestjs/common';
import { ASYNC_OPTIONS_TYPE, ConfigurableModuleClass, OPTIONS_TYPE } from '~/modules/migration/const';
import { MigrationService } from '~/modules/migration/migration.service';

@Module({
    providers: [MigrationService],
    exports: [MigrationService],
})
export class MigrationModule extends ConfigurableModuleClass {
    static register(options: typeof OPTIONS_TYPE): DynamicModule {
        return {
            ...super.register(options),
        };
    }

    static registerAsync(options: typeof ASYNC_OPTIONS_TYPE): DynamicModule {
        return {
            ...super.registerAsync(options),
        };
    }
}
