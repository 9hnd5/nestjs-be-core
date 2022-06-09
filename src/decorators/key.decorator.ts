import "reflect-metadata";

const keyMetadataKey = Symbol("key");

export function Key() {
    return Reflect.metadata(keyMetadataKey, true);
}

export function getKey(target: any, propertyKey: string) {
    return Reflect.getMetadata(keyMetadataKey, target, propertyKey) || false;
}