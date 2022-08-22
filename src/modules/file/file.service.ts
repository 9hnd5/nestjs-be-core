import { Inject, Injectable } from '@nestjs/common';
import { GridFSBucket, MongoClient, ObjectId } from 'mongodb';
import * as stream from 'stream';
import { FILE_OPTION } from '~/modules/file/const';
@Injectable()
export class FileService {
    private gfs: GridFSBucket;
    constructor(@Inject(FILE_OPTION) private url: string) {
        const client = new MongoClient(this.url);
        this.gfs = new GridFSBucket(client.db());
    }

    private streamToBuffer(stream) {
        const buffers: any = [];
        return new Promise((resolve, reject) => {
            stream.on('error', (e) => reject(e));
            stream.on('data', (data: any) => buffers.push(data));
            stream.on('end', () => resolve(buffers));
        });
    }

    upload(file: Express.Multer.File) {
        const fileSteam = stream.Readable.from(file.buffer);
        const result = fileSteam.pipe(
            this.gfs.openUploadStream(file.originalname, {
                contentType: file.mimetype,
            })
        );
        return result.id;
    }

    async download(id: string) {
        const stream = this.gfs.openDownloadStream(new ObjectId(id));
        const buffers = await this.streamToBuffer(stream);
        return Buffer.concat(buffers as any);
    }

    delete(id: string) {
        return this.gfs.delete(new ObjectId(id));
    }
}
