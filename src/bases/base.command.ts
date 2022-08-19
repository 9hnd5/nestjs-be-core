import { Base, Session } from '~/models/common.model';
import { AbstractRequestHandler, CQRSRequest } from '~/modules/cqrs/cqrs.implement';

export class BaseCommand<T> extends CQRSRequest<T> {
    public session: Session;
}

export abstract class BaseCommandHandler<T extends BaseCommand<R>, R> extends AbstractRequestHandler<T, R> {
    public async handle(command: T, request: any): Promise<R> {
        command.session = request.session;
        return this.apply(command);
    }

    public abstract apply(command: T): Promise<R>;

    public createBuild<T extends Base>(data: T, session: Session) {
        data.createdDate = new Date();
        if (typeof session?.userId === 'number') {
            data.createdBy = session?.userId || 0;
        }
        data.isDeleted = false;
        return data;
    }

    public updateBuild<T extends Base>(data: T, session: Session) {
        data.modifiedDate = new Date();
        if (typeof session?.userId === 'number') {
            data.modifiedBy = session?.userId || 0;
        }
        data.isDeleted = false;
        return data;
    }

    public deleteBuild<T extends Base>(data: T, session: Session) {
        data.modifiedDate = new Date();
        if (typeof session?.userId === 'number') {
            data.modifiedBy = session?.userId || 0;
        }
        data.isDeleted = true;
        return data;
    }
}
