export type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;
export class File {
    constructor(public name: string) {}
}

export class Folder {
    constructor(public name: string) {}
}
export class Variable {
    constructor(public name: string) {}
}