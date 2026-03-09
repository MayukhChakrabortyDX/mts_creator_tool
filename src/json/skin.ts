//! REVIEW INCOMPLETE

import { JSONDefs, type Versions } from "./json";
import { type DefinitionProps } from "./definition";

// =============================================================================
// Skin Props
// =============================================================================

export type SkinProps = {
    /**
     * The packID of the vehicle, part, decor, or other component that this
     * skin targets.
     */
    packID: string;

    /**
     * The registration name of the pack component this skin applies to.
     * Generally matches the filename of the target JSON (without extension).
     * Can be found in the exported JSON from devMode if unsure.
     */
    systemName: string;

    /**
     * Inherited definitions section.
     * Acts as if these definitions were declared directly on the target component
     * in its source pack. Skins will only appear if the target pack is present,
     * and will show in that pack's creative tab.
     */
    definitions: Partial<DefinitionProps>[];
}

// =============================================================================
// Class
// =============================================================================

export class Skin extends JSONDefs {

    packID?: string;
    systemName?: string;
    definitions?: Partial<DefinitionProps>[];

    constructor(properties: Partial<SkinProps>) {
        super();
        this.packID      = properties.packID;
        this.systemName  = properties.systemName;
        this.definitions = properties.definitions;
    }

    override toJSON(version: Versions): object {
        return {
            skin: {
                packID:     this.packID,
                systemName: this.systemName,
            },
            definitions: this.definitions,
        };
    }

}