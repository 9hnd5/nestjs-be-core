import { BaseModel } from "src/bases";
import { getColumn, getColumnList, getKey, getTableName } from "src/decorators";
import { TenantBaseModel, TenantModel } from "src/models";


export class QueriesCreatingHelper
{
    public static GetSQLValue(valueObj: object)
    {
        if (valueObj == null) {
            return "NULL";
        }
        if (typeof valueObj === "boolean") {
            return valueObj === true ? "1" : "0";
        }
        else if (valueObj instanceof Date) {
            return `'${valueObj.toDateString()}'`;
        }
        else if (typeof valueObj === 'number') {
            return `${valueObj}`;
        }
        else {
            return `'${valueObj.toString().replace("'", "''").replace("\\", "\\\\")}'`;
        }
    }

    public static CreateQueryInsert(obj: any) {
        let columnNames = '';
        let values = '';
        getColumnList(obj).map((c) => {
            columnNames +=  `${getColumn(obj, c) || c},`;
            values += `${this.GetSQLValue(obj[c])},`;
        })

        if (columnNames.length > 0)
        {
            columnNames = columnNames.substring(0, columnNames.length - 1);
            values = values.substring(0, values.length - 1);
        }
        return `INSERT INTO ${getTableName(obj)} (${columnNames}) VALUES (${values});SELECT LAST_INSERT_ID();`;
    }

    public static CreateQueryUpdate(obj: any) {
        let columnValues = '';
        let condition = "WHERE 1";
        getColumnList(obj).map((c) => 
        {
            if (getKey(obj, c)) {
                columnValues += `${getColumn(obj,c) || c} = ${this.GetSQLValue(obj[c])},`;
            }
            else {
                condition += ` AND ${getColumn(obj,c) || c} = ${this.GetSQLValue(obj[c])}`;
            }
        })

        if (columnValues.length > 0)
        {
            columnValues = columnValues.substring(0, columnValues.length - 1);
        }
        return `UPDATE ${getTableName(obj)} SET ${columnValues} ${condition}`;
    }

    public static CreateQueryDelete(obj: any, conditions: string) 
    {
        if(obj instanceof BaseModel || obj instanceof TenantBaseModel) 
        {
            let sql = `UPDATE ${getTableName(obj)} SET is_deleted = 1 WHERE 1 = 1`;
            if (obj instanceof TenantBaseModel)
            {
                conditions += ` AND company_id = ${0}`;
            }
            if (conditions)
            {
                sql = `${sql} AND ${conditions}`;
            }
            return sql;
        } 
        else 
        {
            let sql = `DELETE FROM ${getTableName(obj)} WHERE 1 = 1`;
            if (obj instanceof TenantBaseModel)
            {
                conditions += ` AND company_id = 0`;
            }
            if (conditions)
            {
                sql = `${sql} AND ${conditions}`;
            }
            return sql;
        }
    }

    public static CreateQuerySelect(obj: any, condition: string, isGetDeletedData: boolean = false) 
    {
        if (!condition) {
            condition = `WHERE 1`;
        }
        else {
            condition = `WHERE ${condition}`;
        }

        if (obj instanceof BaseModel && !isGetDeletedData) {
            condition += ` AND is_deleted = 0`;
        }

        if (obj instanceof TenantBaseModel || obj instanceof TenantModel)
        {
            condition += ` AND company_id = 0`;
        }
        let columnNames = '';
        getColumnList(obj).map((c) => 
        {
            let columnName = '';
            if (getColumn(obj,c))
            {
                columnName = getColumn(obj,c);
            }
            columnNames += `${columnName} AS ${c} ,`;
        })

        if (columnNames) {
            columnNames = columnNames.substring(0, columnNames.length - 1);
        }

        return `SELECT ${columnNames} FROM ${getTableName(obj)} ${condition}`;
    }

    public static CreateQuerySelectCount(obj: any, condition: string, isGetDeletedData: boolean = false){
        
        if (!condition) {
            condition = "WHERE 1";
        }
        else {
            condition = `WHERE ${condition}`;
        }

        if (obj instanceof BaseModel && !isGetDeletedData)
        {
            condition += ` AND is_deleted = 0`;
        }

        if (obj instanceof TenantBaseModel || obj instanceof TenantModel)
        {
            condition += ` AND company_id = 0`;
        }
        return `SELECT COUNT(*) FROM ${getTableName(obj)} ${condition}`;
    }

    public static CreateQuerySelectTop(obj: any, top: number, skip: number, orderBy: string = 'CreatedDate', condition: string = '', isGetDeletedData: boolean = false){

        if (!condition) {
            condition = "WHERE 1";
        }
        else {
            condition = `WHERE ${condition}`;
        }

        if (obj instanceof BaseModel && !isGetDeletedData) {
            condition += ` AND is_deleted = 0`;
        }

        if (obj instanceof TenantBaseModel || obj instanceof TenantModel) {
            condition += ` AND company_id = 0`;
        }

        let columnNames = '';
        getColumnList(obj).map((c) => 
        {
            var columnName = '';
            if (getColumn(obj,c))
            {
                columnName = getColumn(obj,c);
            }
            columnNames += `${columnName} AS ${c} ,`;
        })

        if (columnNames) {
            columnNames = columnNames.substring(0, columnNames.length - 1);
        }

        return `SELECT ${columnNames} FROM ${getTableName(obj)} ${condition}
                ORDER BY ${orderBy}
                LIMIT ${top} OFFSET ${skip};`; 
    }

    public static CreateQueryUpdateWithCondition(obj: any, condition: string) 
    {
            if (!condition) {
                condition = `WHERE 1`;
            }
            else {
                condition = `WHERE ${condition}`;
            }
            let columnValues = '';
            getColumnList(obj).map((c) => 
            {
                let columnName = '';
                if (getColumn(obj,c))
                {
                    columnName = getColumn(obj,c);
                }
                columnValues += `${columnName} = ${this.GetSQLValue(obj[c])},`;
            })

            if (columnValues) {
                columnValues = columnValues.substring(0, columnValues.length - 1);
            }

            return `UPDATE ${getTableName(obj)} SET ${columnValues} ${condition}`;
    }

    public static CreateQuerySelectId(obj: any, condition: string ,isGetDeletedData: boolean = false)
    {
        if (!condition) {
            condition = `WHERE 1`;
        }
        else {
            condition = `WHERE ${condition}`;
        }

        if (obj instanceof BaseModel && !isGetDeletedData)
        {
            condition += ` AND is_deleted = 0`;
        }

        if (obj instanceof TenantBaseModel || obj instanceof TenantModel)
        {
            condition += ` AND company_id = 0`;
        }
        return `SELECT id FROM ${getTableName(obj)} {condition}`;
    }
}