export function Table(name: string) {
    return function (target: any): void {
        target._table = name;
    }
}