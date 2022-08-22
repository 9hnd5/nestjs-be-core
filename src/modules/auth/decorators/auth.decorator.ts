import { SetMetadata } from '@nestjs/common';
import { Permission } from '~/modules/auth/enums/permission.enum';

export const AUTHORIZE_KEY = Symbol('AUTHORIZE_KEY');
/**
 * @deprecated
 */
export const Authorize = (featureName: string, permission: Permission) => {
    return SetMetadata(AUTHORIZE_KEY, { featureName, permission });
};
