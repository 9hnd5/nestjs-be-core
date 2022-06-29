import { BaseModel } from "models/base.model";
import { Session } from "models/session.model";
import { AbstractRequestHandler, CQRSRequest } from "modules/cqrs";


export class BaseCommand<T> extends CQRSRequest<T> {
    public session: Session;
}

export abstract class BaseCommandHandler<T extends BaseCommand<R>, R> extends AbstractRequestHandler<T, R> {
    public async handle(command: T) : Promise<R> {
        return this.apply(command);
    }

    public abstract apply(command: T): Promise<R>

    public async createBuild<T extends BaseModel>(data: T, session: Session): Promise<T> {
        data.createdDate = new Date();
        data.createdBy = session?.userId;
        data.isDeleted = false;
        return data;
    }

    public async updateBuild<T extends BaseModel>(data: T, session: Session): Promise<T> {
        data.modifiedDate = new Date();
        data.modifiedBy = session?.userId;
        data.isDeleted = false;
        return data;
    }

    public async deleteBuild<T extends BaseModel>(data: T, session: Session): Promise<T> {
        data.modifiedDate = new Date();
        data.modifiedBy = session?.userId;
        data.isDeleted = true;
        return data;
    }
}