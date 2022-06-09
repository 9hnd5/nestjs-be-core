import { Session } from "src/models";

export class ScopeVariable {
    accessToken: string;
    refreshToken: string;
    appName: string;
    appBuildNumber: number;
    requestId: string;
    tenantCode: string;
    tenantId: number;
    primarySQLConnectionString: string;
    secondarySQLConnectionString: string;

    // session
    session: Session;
}