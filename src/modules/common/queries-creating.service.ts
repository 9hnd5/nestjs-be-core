import { Inject, Injectable, Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { getColumn } from "decorators/column.decorator";
import { getKey } from "decorators/key.decorator";
import { getColumnList, getTableName } from "decorators/table.decorator";
import { BaseModel } from "models/base.model";
import { TenantBaseModel } from "models/tenant-base.model";
import { TenantModel } from "models/tenant.model";
import { ScopeVariable } from "modules/scope-variable/scope-variable.model";
import * as moment from 'moment'
@Injectable({ scope: Scope.REQUEST })
export class QueriesCreatingService {
    public scopeVariable!: ScopeVariable;

    constructor(@Inject(REQUEST) req: any) {
        this.scopeVariable = req.scopeVariable
    }

    public getSQLValue(valueObj: any)
    {
        if (valueObj == null) {
            return "NULL";
        }
        if (typeof valueObj === "boolean") {
            return valueObj === true ? "1" : "0";
        }
        else if (valueObj instanceof Date) {
            return `'${moment(valueObj).format('YYYY-MM-DD HH:mm:ss')}'`;
        }
        else if (typeof valueObj === 'number') {
            return `${valueObj}`;
        }
        else {
            return `'${valueObj.toString().replace(/'/g, "''").replace(/\\/g, "\\\\")}'`;
        }
    }

    public createQueryInsert(obj: any) 
    {
        let columnNames = '';
        let values = '';

        obj.companyId = this.scopeVariable.tenantId;

        getColumnList(obj).forEach((c) => {
            if (!getKey(obj, c)) {
                columnNames +=  `${getColumn(obj, c) || c},`;
                values += `${this.getSQLValue(obj[c])},`;
            }
        })

        if (columnNames.length > 0)
        {
            columnNames = columnNames.substring(0, columnNames.length - 1);
            values = values.substring(0, values.length - 1);
        }
        return `INSERT INTO ${getTableName(obj)} (${columnNames}) VALUES (${values});SELECT LAST_INSERT_ID();`;
    }

    public createQueryUpdate(obj: any) {
        let columnValues = '';
        let condition = "WHERE 1 = 1";

        obj.companyId = this.scopeVariable.tenantId;

        getColumnList(obj).forEach((c) => 
        {
            if (!getKey(obj, c)) {
                columnValues += `${getColumn(obj,c) || c} = ${this.getSQLValue(obj[c])},`;
            }
            else {
                condition += ` AND ${getColumn(obj,c) || c} = ${this.getSQLValue(obj[c])}`;
            }
        })

        if (columnValues.length > 0)
        {
            columnValues = columnValues.substring(0, columnValues.length - 1);
        }
        return `UPDATE ${getTableName(obj)} SET ${columnValues} ${condition}`;
    }

    public createQueryDelete(obj: any, conditions: string) 
    {
        if(obj instanceof BaseModel || obj instanceof TenantBaseModel) 
        {
            let sql = `UPDATE ${getTableName(obj)} SET is_deleted = 1 WHERE 1 = 1`;
            if (obj instanceof TenantBaseModel)
            {
                conditions += ` AND company_id = ${this.scopeVariable.tenantId}`;
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
                conditions += ` AND company_id = ${this.scopeVariable.tenantId}`;
            }
            if (conditions)
            {
                sql = `${sql} AND ${conditions}`;
            }
            return sql;
        }
    }

    public createQuerySelect<T>(TCreator: new() => T, condition: string = '', isGetDeletedData: boolean = false) 
    {
        if (!condition) {
            condition = `WHERE 1`;
        }
        else {
            condition = `WHERE ${condition}`;
        }

        const obj: T  = new TCreator()

        if (obj instanceof BaseModel && !isGetDeletedData) {
            condition += ` AND is_deleted = 0`;
        }

        if (obj instanceof TenantBaseModel || obj instanceof TenantModel)
        {
            condition += ` AND company_id = ${this.scopeVariable.tenantId}`;
        }
        let columnNames = '';
        getColumnList(obj).forEach((c) => 
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

    public createQuerySelectCount<T>(TCreator: new() => T, condition: string = '', isGetDeletedData: boolean = false){
        
        if (!condition) {
            condition = "WHERE 1";
        }
        else {
            condition = `WHERE ${condition}`;
        }

        const obj: T  = new TCreator()

        if (obj instanceof BaseModel && !isGetDeletedData)
        {
            condition += ` AND is_deleted = 0`;
        }

        if (obj instanceof TenantBaseModel || obj instanceof TenantModel)
        {
            condition += ` AND company_id = ${this.scopeVariable.tenantId}`;
        }
        return `SELECT COUNT(*) FROM ${getTableName(obj)} ${condition}`;
    }

    public createQuerySelectTop<T>(TCreator: new() => T, top: number, skip: number, orderBy: string = 'CreatedDate', condition: string = '', isGetDeletedData: boolean = false){

        if (!condition) {
            condition = "WHERE 1";
        }
        else {
            condition = `WHERE ${condition}`;
        }

        const obj: T  = new TCreator()

        if (obj instanceof BaseModel && !isGetDeletedData) {
            condition += ` AND is_deleted = 0`;
        }

        if (obj instanceof TenantBaseModel || obj instanceof TenantModel) {
            condition += ` AND company_id = ${this.scopeVariable.tenantId}`;
        }

        let columnNames = '';
        getColumnList(obj).forEach((c) => 
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

        return `SELECT ${columnNames} FROM ${getTableName(obj)} ${condition} ORDER BY ${orderBy} LIMIT ${top} OFFSET ${skip};`; 
    }

    public createQueryUpdateWithCondition(obj: any, condition: string) 
    {
            if (!condition) {
                condition = `WHERE 1`;
            }
            else {
                condition = `WHERE ${condition}`;
            }
            let columnValues = '';
            getColumnList(obj).forEach((c) => 
            {
                let columnName = '';
                if (getColumn(obj,c))
                {
                    columnName = getColumn(obj,c);
                }
                columnValues += `${columnName} = ${this.getSQLValue(obj[c])},`;
            })

            if (columnValues) {
                columnValues = columnValues.substring(0, columnValues.length - 1);
            }

            return `UPDATE ${getTableName(obj)} SET ${columnValues} ${condition}`;
    }

    public createQuerySelectId(obj: any, condition: string ,isGetDeletedData: boolean = false)
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
            condition += ` AND company_id = ${this.scopeVariable.tenantId}`;
        }
        return `SELECT id FROM ${getTableName(obj)} ${condition}`;
    }
}


