import { SetMetadata } from '@nestjs/common';

export const AUTHORIZE_KEY = Symbol('AUTHORIZE_KEY');
export enum Permission {
    View,
    Insert,
    Update,
    Delete,
    All,
}
export const Authorize = (featureName: string, permission: Permission) => {
    return SetMetadata(AUTHORIZE_KEY, { featureName, permission });
};
