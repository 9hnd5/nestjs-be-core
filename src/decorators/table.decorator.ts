let metaData = {}

export function Table(name: string) {
    return function (target: any): void {
        target._table = name;
    }
}

export function TableColumns(columns: string[]) {
    return function (target: any): void {
        if (!metaData[target.name]) {
            metaData[target.name] = columns
        }
    }
}

export function getTableName(object: any) {
    return object.constructor._table
}

function internalGetColumnList(object: any, currentList: string[]): string[] {
    const parent = Object.getPrototypeOf(object)
    if (parent && parent.constructor.name) {
        currentList = internalGetColumnList(parent, currentList)
    }
    const columns = metaData[object.constructor.name]
    if (Array.isArray(columns)) {
        return [
            ...currentList,
            ...columns
        ]
    }
    else {
        return currentList
    }
}

export function getColumnList(object: any) {
    return [...new Set(internalGetColumnList(object, []))]
}