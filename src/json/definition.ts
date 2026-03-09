//! REVIEW INCOMPLETE

import { JSONDefs, type Versions } from "./json";

export type DefinitionProps = {
    /**
     * When true, hides this definition's item from creative tabs.
     */
    hideOnCreativeTab: boolean;

    /**
     * Appended to the JSON filename to form the component name, used by MTS to locate
     * the correct texture and item. Must be present even if empty ("") for single-variant
     * models — omitting it will cause a crash on load.
     * Do NOT name your textures after the subName alone; it is always appended to the JSON filename.
     */
    subName: string;

    /**
     * If true, this part renders using the parent vehicle's texture instead of its own.
     * Useful for components like tank turrets or bolt-on parts that need to match the vehicle.
     */
    useVehicleTexture: boolean;

    /**
     * Used for vehicles and parts only. When the vehicle's color is changed via the paint gun
     * (or when default parts are first placed), each part placement definition is checked for
     * a `toneIndex`. If found, it is matched against this list and the part is switched to the
     * matching definition.
     */
    partTones: string[];

    /**
     * Per-definition constants, equivalent to those in the rendering section.
     * These update when the definition changes due to a paint gun operation.
     */
    constants: Record<string, unknown>;

    /**
     * Overrides the color for any textObjects marked as `colorInherited`, using one of the
     * colors in this list. The specific color is chosen by the textObject itself.
     * Useful when multiple textures would conflict with a single shared text color.
     */
    secondaryTextColors: string[];

    /**
     * If set, the named model is used for this definition instead of the default.
     * Must reside in the same folder as other models, though sub-folders are permitted.
     */
    modelName: string;

    /**
     * A list of textures that override the default texture for this definition.
     * Useful for multiple models sharing the same texture, or for definitions with
     * dynamic texture variants. `textureIndex` determines which texture is applied.
     */
    textureNames: string[];

    /**
     * The display name of this definition, shown in item form and in benches.
     * This is a display-only value and is NOT used in any file-linking operations —
     * only `subName` is used for that.
     */
    name: string;

    /**
     * An optional description appended to the main `general` description when present.
     * Allows variants to provide additional context without replacing the base description.
     */
    description: string;

    /**
     * Additional materials added on top of `materialLists` to enable crafting of this variant.
     * Typically used for dyes or other differentiators between color variants.
     * Also shown in the paint gun GUI.
     * The number of lists here must match the number of lists in `materialLists`,
     * as each entry is paired 1:1. Not used for repair recipes.
     */
    extraMaterialLists: (string[])[];

    /**
     * Like `extraMaterialLists`, but combined with an existing instance of this item
     * to craft a fresh copy (i.e. a repair recipe).
     */
    extraRepairMaterialLists: (string[])[];

    /**
     * Like `extraMaterialLists`, but these materials are dropped as output after crafting.
     * Useful for recipes that return a container (e.g. an empty bucket after consuming
     * a bucket of water).
     */
    extraReturnedMaterialLists: (string[])[];
}

export class Definition extends JSONDefs {

    hideOnCreativeTab?: boolean;
    subName?: string;
    useVehicleTexture?: boolean;
    partTones?: string[];
    constants?: Record<string, unknown>;
    secondaryTextColors?: string[];
    modelName?: string;
    textureNames?: string[];
    name?: string;
    description?: string;
    extraMaterialLists?: (string[])[];
    extraRepairMaterialLists?: (string[])[];
    extraReturnedMaterialLists?: (string[])[];

    constructor(properties: Partial<DefinitionProps>) {
        super();
        this.hideOnCreativeTab = properties.hideOnCreativeTab;
        this.subName = properties.subName;
        this.useVehicleTexture = properties.useVehicleTexture;
        this.partTones = properties.partTones;
        this.constants = properties.constants;
        this.secondaryTextColors = properties.secondaryTextColors;
        this.modelName = properties.modelName;
        this.textureNames = properties.textureNames;
        this.name = properties.name;
        this.description = properties.description;
        this.extraMaterialLists = properties.extraMaterialLists;
        this.extraRepairMaterialLists = properties.extraRepairMaterialLists;
        this.extraReturnedMaterialLists = properties.extraReturnedMaterialLists;
    }

    override toJSON(version: Versions): object {
        return {
            definitions: {
                hideOnCreativeTab: this.hideOnCreativeTab,
                subName: this.subName,
                useVehicleTexture: this.useVehicleTexture,
                partTones: this.partTones,
                constants: this.constants,
                secondaryTextColors: this.secondaryTextColors,
                modelName: this.modelName,
                textureNames: this.textureNames,
                name: this.name,
                description: this.description,
                extraMaterialLists: this.extraMaterialLists,
                extraRepairMaterialLists: this.extraRepairMaterialLists,
                extraReturnedMaterialLists: this.extraReturnedMaterialLists,
            }
        };
    }
}