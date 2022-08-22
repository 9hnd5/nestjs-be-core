import { DynamicModule, Module } from '@nestjs/common';
import { HTTP_ASYNC_OPTIONS_TYPE, HttpConfigurableModuleClass, HTTP_OPTIONS_TYPE } from './const';
import { HttpService } from './http.service';

@Module({
    providers: [HttpService],
    exports: [HttpService],
})
export class HttpModule extends HttpConfigurableModuleClass {
    static register(options: typeof HTTP_OPTIONS_TYPE): DynamicModule {
        return {
            ...super.register(options),
        };
    }

    static registerAsync(options: typeof HTTP_ASYNC_OPTIONS_TYPE): DynamicModule {
        return {
            ...super.registerAsync(options),
        };
    }
}
