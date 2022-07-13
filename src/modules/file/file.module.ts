import { DynamicModule, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { FileService } from 'modules/file/file.service';
@Module({})
export class FileModule {
    static register(url: string): DynamicModule {
        return {
            module: FileModule,
            imports: [MulterModule.register()],
            providers: [
                FileService,
                {
                    provide: 'FILE_OPTION',
                    useValue: url,
                },
            ],
            exports: [FileService],
        };
    }
}
