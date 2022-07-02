import mariadb from 'mariadb';
import { ScopeVariable } from 'modules/scope-variable/scope-variable.model';

export class BaseQueries {
    private scopeVariable: ScopeVariable;

    protected _connection: mariadb.Connection;
    protected isJoinTransaction: boolean;

    constructor(
        request: any
    ) {
        this.scopeVariable = request.scopeVariable
    }

    public joinTransaction(connection: mariadb.Connection) {
        this._connection = connection;
        this.isJoinTransaction = true;
    }

    public escTransaction() {
        this._connection = undefined;
        this.isJoinTransaction = false
    }

    // get connection() : Promise<mariadb.Connection> {
    //     return new Promise(async (resolve) => {
    //         if (this._connection) return resolve(this._connection);

    //         const connectStr = this.scopeVariable.secondarySQLConnectionString || config.get('secondarySQLConnectionString')
    //         this._connection = await DalHelper.getConnection(connectStr)
    //         resolve(this._connection);
    //     })
    // }
}