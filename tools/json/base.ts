export enum ItemClassification {
    VEHICLE,
    PART,
    INSTRUMENT,
    POLE,
    ROAD,
    DECOR,
    BULLET,
    ITEM,
    BLOCK,
    SKIN,
    PANEL
}

interface JSONBaseInterface {
    packID: string;
    systemName: string;
    prefixFolders: string;
    classification: ItemClassification
}

export abstract class JSONBase {

    constructor() { }
    protected stripUndefined<T extends object>(obj: T): Partial<T> {
        return Object.fromEntries(
            Object.entries(obj).filter(([_, v]) => v !== undefined)
        ) as Partial<T>;
    }
    toJSON() { }

}