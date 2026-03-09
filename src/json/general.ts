//! REVIEW INCOMPLETE

import { JSONDefs, type Versions } from "./json";

export type GeneralProps = {
    hideOnCreativeTab: boolean;
    name: string;
    description: string;
    stackSize: number;
    health: number;
    materialLists: (string[])[];
    repairMaterialLists: (string[])[];
    returnedMaterialLists: (string[])[];
    oreDict: string;
    radarRange: number;
    radarWidth: number;
}

export class General extends JSONDefs {

    hideOnCreativeTab?: boolean;
    name?: string;
    description?: string;
    stackSize?: number;
    health?: number;
    materialLists?: (string[])[];
    repairMaterialLists?: (string[])[];
    returnedMaterialLists?: (string[])[];
    oreDict?: string;
    radarRange?: number;
    radarWidth?: number;

    constructor(properties: Partial<GeneralProps>) {
        super();
        this.hideOnCreativeTab = properties.hideOnCreativeTab;
        this.name = properties.name;
        this.description = properties.description;
        this.stackSize = properties.stackSize !== undefined
            ? Math.min(properties.stackSize, 64)
            : undefined;
        this.health = properties.health;
        this.materialLists = properties.materialLists;
        this.repairMaterialLists = properties.repairMaterialLists;
        this.returnedMaterialLists = properties.returnedMaterialLists;
        this.oreDict = properties.oreDict;
        this.radarRange = properties.radarRange;
        this.radarWidth = properties.radarWidth;
    }

    override toJSON(version: Versions): object {
        return {
            general: {
                hideOnCreativeTab: this.hideOnCreativeTab,
                name: this.name,
                description: this.description,
                stackSize: this.stackSize,
                health: this.health,
                materialLists: this.materialLists,
                repairMaterialLists: this.repairMaterialLists,
                returnedMaterialLists: this.returnedMaterialLists,
                oreDict: version === "1.12.2" ? this.oreDict : undefined,
                radarRange: this.radarRange,
                radarWidth: this.radarWidth,
            }
        };
    }

}