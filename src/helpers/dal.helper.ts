import * as mariadb from 'mariadb'
import * as config from 'config'

export class DalHelper {
    public static async getConnection(connectionString = ''): Promise<mariadb.Connection> {
        if (!connectionString) {
            connectionString = config.get('primarySQLConnectionString')
        }
        return mariadb.createConnection(connectionString)
    }

    public static async getMultipleQueriesConnection(connectionString = ''): Promise<mariadb.Pool> {
        if (!connectionString) {
            connectionString = config.get('primarySQLConnectionString')
        }
        return mariadb.createPool(`${connectionString}&multipleStatements=true`)
    }

    public static async execute(sql: string, connection: mariadb.Connection): Promise<number> {
        let newConn = false;
        try {
            if (!connection) {
                connection = await DalHelper.getConnection()
                newConn = true
            }
    
            return await connection.execute(sql)
        }
        finally {
            if (newConn) {
                connection.destroy()
            }
        }
    }

    public static async query<T>(sql: string, connection: mariadb.Connection = undefined): Promise<T[]> {
        let newConn = false;
        try {
            if (!connection) {
                connection = await DalHelper.getConnection()
                newConn = true
            }
    
            return await connection.query(sql)
        }
        finally {
            if (newConn) {
                connection.destroy()
            }
        }
    }

    public static async queryMultiple(sql: string, connection: mariadb.Pool = undefined): Promise<any[]> {
        let newConn = false;
        try {
            if (!connection) {
                connection = await DalHelper.getMultipleQueriesConnection()
                newConn = true
            }
            return await connection.query(sql)
        }
        finally {
            if (newConn) {
                connection.end()
            }
        }
    }
}