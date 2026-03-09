//! REVIEW INCOMPLETE

import { JSONDefs, type Versions } from "./json";

// =============================================================================
// Types
// =============================================================================

/**
 * Valid item type filters for crafting definitions.
 * Corresponds to the JSON definition sub-folder types in a pack.
 */
export type CraftingItemType =
    | "vehicle"
    | "part"
    | "instrument"
    | "decor"
    | "bullet"
    | "pole"
    | "road"
    | (string & {}); // allows custom/future types while keeping autocomplete

// =============================================================================
// Props
// =============================================================================

export type CraftingDefinitionProps = {
    /**
     * The first layer of filtering. Restricts the component's crafting GUI to
     * only items whose definition type matches one of these entries.
     * Valid values correspond to the sub-folder type names used in a pack
     * (e.g. `"vehicle"`, `"part"`, `"instrument"`, `"decor"`, `"bullet"`).
     */
    itemTypes: CraftingItemType[];

    /**
     * Optional. Filters the `"part"` item type further by part-type prefix.
     * For example, `["engine"]` allows all engines, while
     * `["engine_car", "engine_boat"]` excludes aircraft engines.
     * Has no effect unless `"part"` is included in `itemTypes`.
     */
    partTypes: string[];

    /**
     * An explicit list of craftable items, overriding all other filters.
     * Use this to specify exactly which items this component can craft.
     * Format for each entry: `packID:systemName`
     * where `systemName` is the item's base name with its `subName` appended.
     */
    items: string[];
}

// =============================================================================
// Class
// =============================================================================

export class CraftingDefinition extends JSONDefs {

    itemTypes?: CraftingItemType[];
    partTypes?: string[];
    items?: string[];

    constructor(properties: Partial<CraftingDefinitionProps>) {
        super();
        this.itemTypes = properties.itemTypes;
        this.partTypes = properties.partTypes;
        this.items     = properties.items;
    }

    override toJSON(version: Versions): object {
        return {
            crafting: {
                itemTypes: this.itemTypes,
                partTypes: this.partTypes,
                items:     this.items,
            }
        };
    }

}