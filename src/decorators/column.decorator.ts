import "reflect-metadata";

const columnMetadataKey = Symbol("column");

export function Column(name: string) {
    return Reflect.metadata(columnMetadataKey, name);
}

export function getColumn(target: any, propertyKey: string) {
    return Reflect.getMetadata(columnMetadataKey, target, propertyKey);
}