//! REVIEW INCOMPLETE

import { JSONDefs, type Versions } from "./json";
import { type CraftingDefinitionProps } from "./crafting";

// =============================================================================
// Enums
// =============================================================================

export enum DecorType {
    /** Opens a chest GUI when clicked. */
    Chest            = "chest",

    /** Provides beacon functionality. */
    Beacon           = "beacon",

    /** Provides signal controller functionality. */
    SignalController = "signal_controller",

    /** Loads items onto vehicles. */
    ItemLoader       = "item_loader",

    /** Unloads items from vehicles. */
    ItemUnloader     = "item_unloader",

    /** Loads fluid onto vehicles. */
    FluidLoader      = "fluid_loader",

    /** Unloads fluid from vehicles. */
    FluidUnloader    = "fluid_unloader",

    /** Provides fuel pump functionality. */
    FuelPump         = "fuel_pump",

    /** Provides electric vehicle charger functionality. */
    Charger          = "charger",

    /** Provides radio functionality, synced with vehicle radios. */
    Radio            = "radio",

    /** Allows players to sit on this decor. */
    Seat             = "seat",
}

// =============================================================================
// Decor Props
// =============================================================================

export type DecorProps = {
    /**
     * Optional. Gives this decor a special built-in function.
     * If omitted, the decor is purely decorative.
     */
    type: DecorType;

    /**
     * The width of this decor, as a fraction of a full block (1.0 = full block).
     * Values over 1 produce unpredictable behaviour — do not exceed 1.
     */
    width: number;

    /**
     * The height of this decor, as a fraction of a full block (1.0 = full block).
     * Values over 1 produce unpredictable behaviour — do not exceed 1.
     */
    height: number;

    /**
     * The depth of this decor, as a fraction of a full block (1.0 = full block).
     * Values over 1 produce unpredictable behaviour — do not exceed 1.
     */
    depth: number;

    /**
     * How much light this decor emits. Range: 0.0–1.0, where 1.0 is maximum
     * possible light level.
     * Can be modified via variableModifiers.
     */
    lightLevel: number;

    /**
     * Y-axis offset for the player's sitting position on this decor.
     * Only valid when `type` is `DecorType.Seat`.
     */
    sittingOffset: number;

    /**
     * Optional crafting definition for this decor.
     * If included, clicking the decor opens a pack-component crafting GUI.
     */
    crafting: Partial<CraftingDefinitionProps>;

    /**
     * The number of inventory rows (9 slots each) for chest-type decors.
     * Also configures the internal buffer size for item loaders/unloaders
     * (defaults to 5 slots if omitted).
     * Only used when `type` is `DecorType.Chest`, `ItemLoader`, or `ItemUnloader`.
     */
    inventoryUnits: number;

    /**
     * Maximum stack size per inventory slot.
     * Defaults to 64 if not set.
     */
    inventoryStackSize: number;

    /**
     * The GUI texture to use when this decor has an inventory.
     * Only used when `type` is `DecorType.Chest`. Defaults to the standard
     * chest texture if omitted.
     * Format: packID:textureName
     */
    inventoryTexture: string;

    /**
     * The fuel or fluid capacity of this decor, in milli-buckets.
     * Only used when `type` is `DecorType.FuelPump` or `DecorType.FluidLoader`.
     * Defaults to 15000 if not set.
     */
    fuelCapacity: number;

    /**
     * The quantity of fuel or energy dispensed per tick, in milli-buckets or
     * electric units.
     * Only used when `type` is `DecorType.FuelPump`, `DecorType.FluidLoader`,
     * or `DecorType.Charger`.
     * Defaults to 10 if not set.
     */
    pumpRate: number;
}

// =============================================================================
// Class
// =============================================================================

export class Decor extends JSONDefs {

    type?: DecorType;
    width?: number;
    height?: number;
    depth?: number;
    lightLevel?: number;
    sittingOffset?: number;
    crafting?: Partial<CraftingDefinitionProps>;
    inventoryUnits?: number;
    inventoryStackSize?: number;
    inventoryTexture?: string;
    fuelCapacity?: number;
    pumpRate?: number;

    constructor(properties: Partial<DecorProps>) {
        super();
        this.type               = properties.type;
        this.width              = properties.width;
        this.height             = properties.height;
        this.depth              = properties.depth;
        this.lightLevel         = properties.lightLevel;
        this.sittingOffset      = properties.sittingOffset;
        this.crafting           = properties.crafting;
        this.inventoryUnits     = properties.inventoryUnits;
        this.inventoryStackSize = properties.inventoryStackSize;
        this.inventoryTexture   = properties.inventoryTexture;
        this.fuelCapacity       = properties.fuelCapacity;
        this.pumpRate           = properties.pumpRate;
    }

    override toJSON(version: Versions): object {
        return {
            decor: {
                type:               this.type,
                width:              this.width,
                height:             this.height,
                depth:              this.depth,
                lightLevel:         this.lightLevel,
                sittingOffset:      this.sittingOffset,
                crafting:           this.crafting,
                inventoryUnits:     this.inventoryUnits,
                inventoryStackSize: this.inventoryStackSize,
                inventoryTexture:   this.inventoryTexture,
                fuelCapacity:       this.fuelCapacity,
                pumpRate:           this.pumpRate,
            }
        };
    }

}