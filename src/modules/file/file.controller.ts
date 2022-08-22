import {
    Controller,
    Delete,
    Get,
    Param,
    Post,
    UploadedFile,
    UseInterceptors,
    StreamableFile,
    Header,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from '~/modules/file/file.service';

@Controller('file')
export class FileController {
    constructor(private fileService: FileService) {}

    @Get(':id')
    @Header('Content-Type', 'image')
    async download(@Param() id: string) {
        const file = await this.fileService.download(id);
        return new StreamableFile(file);
    }
    @Get('/buffer/:id')
    async downloadBuffer(@Param() id: string) {
        return this.fileService.download(id);
    }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    upload(@UploadedFile() file: Express.Multer.File) {
        return this.fileService.upload(file);
    }

    @Delete(':id')
    delete(@Param() id: string) {
        return this.fileService.delete(id);
    }
}
