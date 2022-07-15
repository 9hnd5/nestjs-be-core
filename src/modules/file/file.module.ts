import { DynamicModule, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { FILE_OPTION } from '~/modules/file/const';
import { FileService } from '~/modules/file/file.service';
import { FileOption } from '~/modules/file/type';
@Module({})
export class FileModule {
    static register(option: FileOption): DynamicModule {
        const { url, isGlobal = false } = option;
        return {
            module: FileModule,
            imports: [MulterModule.register()],
            providers: [
                FileService,
                {
                    provide: FILE_OPTION,
                    useValue: url,
                },
            ],
            exports: [FileService],
            global: isGlobal,
        };
    }
}
