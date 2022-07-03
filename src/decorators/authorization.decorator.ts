import { BaseCommand } from "bases/base.command";
import { BaseController } from "bases/base.controller";
import { BaseQueries } from "bases/base.queries";
import { BaseRepository } from "bases/base.repository";
import { Permissions } from "constants/const";
import { NoPermissionException } from "exceptions/error.exception";
import { Session } from "models/session.model";

const executeRequest = (controller: BaseController, args: any[], originalMethod: any) => {
    for(const item of args) {
        const baseClass = Object.getPrototypeOf(item) && Object.getPrototypeOf(Object.getPrototypeOf(item)) 
            ? Object.getPrototypeOf(Object.getPrototypeOf(item)).constructor 
            : null;
        if (baseClass === BaseCommand) {
            item.session = controller.scopeVariable.session;
        }
    }
    Object.keys(controller).forEach((key) => {
        try {
            const item = controller[key];
            const baseClass = Object.getPrototypeOf(item) && Object.getPrototypeOf(Object.getPrototypeOf(item))
                ? Object.getPrototypeOf(Object.getPrototypeOf(item)).constructor 
                : null;
            if (baseClass === BaseQueries || baseClass === BaseRepository) {
                item.scopeVariable = controller.scopeVariable;
            }
        }
        catch {}
    })
    const result = originalMethod.apply(controller, args);
    return result;
}

export function Authorization (featureName: string, permission: number, isDontNeedLogin: boolean = false) : MethodDecorator {
    return (target: BaseController, propertyKey: string, descriptor: PropertyDescriptor) => {
        const originalMethod = descriptor.value;

        descriptor.value = async function (...args: any[]) {
            const accessToken = this.scopeVariable.accessToken;

            if (!accessToken) {
                throw new NoPermissionException();
            }


            const session: Session = typeof this.getUserSession === 'function' ? await this.getUserSession(accessToken) : null;
            this.scopeVariable.session = session;

            if (isDontNeedLogin) {
                return executeRequest(this, args, originalMethod);
            }

            if (!session) throw new NoPermissionException();

            if (permission === Permissions.All) {
                return executeRequest(this, args, originalMethod);
            }

            if (Array.isArray(session.roles) && !!session.roles.find((r) => r.name === 'Administrator')) {
                return executeRequest(this, args, originalMethod);
            }

            if (Array.isArray(session.allPermissionFeatures) && session.allPermissionFeatures.includes(featureName)) {
                return executeRequest(this, args, originalMethod);
            }

            if (permission === Permissions.View && Array.isArray(session.viewPermissionFeatures) && session.viewPermissionFeatures.includes(featureName)) {
                return executeRequest(this, args, originalMethod);
            }

            if (permission === Permissions.Insert && Array.isArray(session.allPermissionFeatures) && session.insertPermissionFeatures.includes(featureName)) {
                return executeRequest(this, args, originalMethod);
            }

            if (permission === Permissions.Update && Array.isArray(session.updatePermissionFeatures) && session.updatePermissionFeatures.includes(featureName)) {
                return executeRequest(this, args, originalMethod);
            }

            if (permission === Permissions.Delete && Array.isArray(session.deletePermissionFeatures) && session.deletePermissionFeatures.includes(featureName)) {
                return executeRequest(this, args, originalMethod);
            }

            if (permission === Permissions.View && Array.isArray(session.viewPermissionFeatures) && session.viewPermissionFeatures.includes(featureName)) {
                return executeRequest(this, args, originalMethod);
            }

            throw new NoPermissionException();
        };
    };
}