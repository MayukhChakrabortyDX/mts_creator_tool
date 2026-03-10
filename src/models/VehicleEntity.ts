import type { CollisionGroup } from "../json/collisionGroup";
import type { ConnectionGroup } from "../json/connectionGroup";
import type { Definition } from "../json/definition";
import type { General } from "../json/general";
import type { InstrumentSlot } from "../json/instrumentSlot";
import { JSONDefs } from "../json/json";
import type { Motorized } from "../json/motorized";
import type { PartSlot } from "../json/partSlot";
import type { Rendering } from "../json/rendering";
import type { VariableModifier } from "../json/variableModifier";
import type { Expand } from "../utils/expand";
import { File } from "../utils/fs";

export type VehicleEntityProps = {
    motorized: Motorized,
    parts: PartSlot[],
    collisionGroups: CollisionGroup[],
    connectionGroups: ConnectionGroup[],
    instruments: InstrumentSlot[],
    definitions: Definition[],
    // initialVariables
    variableModifiers: VariableModifier[],
    rendering: Rendering,
    general: General
    model3D: File
}

//This is used to generate land vehicle specifically
export class VehicleEntity extends JSONDefs {

    constructor(public props: Expand<Partial<VehicleEntityProps>>) {
        super()
    }

}