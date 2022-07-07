import { BaseModel } from 'models/base.model';
import { Session } from 'models/session.model';
import { AbstractRequestHandler, CQRSRequest } from 'modules/cqrs/cqrs.implement';

export class BaseCommand<T> extends CQRSRequest<T> {
    public session: Session;
}

export abstract class BaseCommandHandler<
    T extends BaseCommand<R>,
    R
> extends AbstractRequestHandler<T, R> {
    public async handle(command: T): Promise<R> {
        return this.apply(command);
    }

    public abstract apply(command: T): Promise<R>;

    public createBuild<T extends BaseModel>(data: T, session: Session) {
        data.createdDate = new Date();
        data.createdBy = session?.userId || 0;
        data.isDeleted = false;
        return data;
    }

    public updateBuild<T extends BaseModel>(data: T, session: Session) {
        data.modifiedDate = new Date();
        data.modifiedBy = session?.userId || 0;
        data.isDeleted = false;
        return data;
    }

    public deleteBuild<T extends BaseModel>(data: T, session: Session) {
        data.modifiedDate = new Date();
        data.modifiedBy = session?.userId || 0;
        data.isDeleted = true;
        return data;
    }
}
