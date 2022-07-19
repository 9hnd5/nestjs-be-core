import { DynamicModule, Module } from '@nestjs/common';
import { ASYNC_OPTIONS_TYPE, ConfigurableModuleClass, OPTIONS_TYPE } from './const';
import { HttpService } from './http.service';

@Module({
    providers: [HttpService],
    exports: [HttpService],
})
export class HttpModule extends ConfigurableModuleClass {
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
