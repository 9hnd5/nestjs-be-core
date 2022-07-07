import { DatabaseOption } from 'config';
import { Session } from 'models/session.model';

export class ScopeVariable {
    accessToken: string;
    refreshToken: string;
    appName: string;
    appBuildNumber: number;
    requestId: string;
    tenantCode: string;
    tenantId: number;
    primary: DatabaseOption;
    secondary: DatabaseOption;

    // session
    session: Session;
}
