import mariadb from 'mariadb'
import { DalHelper } from '../helpers/dal.helper';
import { ScopeVariable } from '../modules/scope-variable';
import * as config from '../config'

export class BaseQueries {
    private scopeVariable: ScopeVariable;

    protected _connection: mariadb.Connection | mariadb.Pool;
    protected isJoinTransaction: boolean;

    public joinTransaction(connection: mariadb.Connection | mariadb.Pool) {
        this._connection = connection;
        this.isJoinTransaction = true;
    }

    public escTransaction() {
        this._connection = undefined;
        this.isJoinTransaction = false
    }

    get connection() : Promise<mariadb.Connection | mariadb.Pool> {
        return new Promise(async (resolve) => {
            if (this._connection) return resolve(this._connection);

            const connectStr = this.scopeVariable.secondarySQLConnectionString || config.get('secondarySQLConnectionString')
            this._connection = await DalHelper.getConnection(connectStr)
            resolve(this._connection);
        })
    }
}