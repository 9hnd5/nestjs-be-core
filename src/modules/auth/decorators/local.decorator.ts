import { SetMetadata } from '@nestjs/common';
import { Permission } from '~/modules/auth/enums/permission.enum';

export const LOCAL_AUTHORIZE_KEY = Symbol('LOCAL_AUTHORIZE_KEY');

export const LocalAuthorize = (featureName: string, permission: Permission) => {
    return SetMetadata(LOCAL_AUTHORIZE_KEY, { featureName, permission });
};
