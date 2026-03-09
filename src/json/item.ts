//! REVIEW INCOMPLETE

import { JSONDefs, type Versions } from "./json";
import { type PotionEffectProps } from "./potionEffect";
import { type TextObjectProps } from "./textObject";

// =============================================================================
// Enums
// =============================================================================

export enum ItemType {
    /** Base item with no special functionality. */
    None          = "none",

    /** A book-like item with pages and a table of contents. */
    Booklet       = "booklet",

    /** An item that can be eaten or drunk. */
    Food          = "food",

    /** A melee weapon with configurable damage and cooldown. */
    Weapon        = "weapon",

    /** Functions like a parts scanner. */
    Scanner       = "scanner",

    /** Functions like a wrench. */
    Wrench        = "wrench",

    /** Functions like a paint gun. */
    PaintGun      = "paint_gun",

    /** Functions like a key. */
    Key           = "key",

    /** Functions like a ticket. */
    Ticket        = "ticket",

    /** Functions like a fuel hose. */
    FuelHose      = "fuel_hose",

    /** Functions like jumper cables. */
    JumperCables  = "jumper_cables",

    /** Functions like a jumper pack. */
    JumperPack    = "jumper_pack",

    /** Functions like a repair pack. */
    RepairPack    = "repair_pack",

    /** Functions like a Y2K button. */
    Y2KButton     = "y2k_button",
}

// =============================================================================
// Booklet
// =============================================================================

export type BookletPageProps = {
    /**
     * The texture for this page.
     * Each page may use a different texture, but all textures MUST share the
     * same resolution as defined by `textureWidth` and `textureHeight`.
     * Format: packID:textureName (must be a power-of-2 texture).
     */
    pageTexture: string;

    /**
     * The title of this page, used to generate the Table of Contents entry.
     * May be omitted if the Table of Contents is disabled via `disableTOC`.
     */
    title: string;

    /**
     * An array of text objects that make up the content of this page.
     * The z-coordinate should always be 0 for booklet text objects.
     * The `defaultText` field is what is rendered in the booklet.
     */
    pageText: Partial<TextObjectProps>[];
}

export type BookletProps = {
    /**
     * If true, the Table of Contents is not generated.
     * Useful for small booklets that don't need one, or large booklets where
     * a TOC would overflow.
     */
    disableTOC: boolean;

    /**
     * The width of the texture used for all pages of this booklet, in pixels.
     * Must be a power of 2.
     */
    textureWidth: number;

    /**
     * The height of the texture used for all pages of this booklet, in pixels.
     * Must be a power of 2.
     */
    textureHeight: number;

    /**
     * The texture used for the cover of this booklet.
     * Must be prefixed with your modID and must be a power-of-2 texture.
     * Format: packID:textureName
     */
    coverTexture: string;

    /**
     * A list of text objects that make up the title text on the cover.
     */
    titleText: Partial<TextObjectProps>[];

    /**
     * The pages that make up this booklet.
     */
    pages: Partial<BookletPageProps>[];
}

// =============================================================================
// Food
// =============================================================================

export type FoodProps = {
    /**
     * If true, the drinking animation plays while consuming this item.
     * If false, the eating animation plays instead.
     */
    isDrink: boolean;

    /**
     * How long, in ticks, it takes to fully consume this food item.
     */
    timeToEat: number;

    /**
     * How much hunger this food item restores. Must be a whole number.
     */
    hungerAmount: number;

    /**
     * How much saturation this food item provides. May be a decimal.
     */
    saturationAmount: number;

    /**
     * Optional list of potion effects applied when this food is consumed.
     */
    effects: Partial<PotionEffectProps>[];
}

// =============================================================================
// Weapon
// =============================================================================

export type WeaponProps = {
    /**
     * How much damage this weapon inflicts per hit on an entity.
     */
    attackDamage: number;

    /**
     * The cooldown between strikes, in ticks.
     */
    attackCooldown: number;
}

// =============================================================================
// Repair Pack
// =============================================================================

export type RepairProps = {
    /**
     * If true, this repair pack can restore totaled vehicles.
     * Normally repair packs cannot repair totaled vehicles.
     */
    canRepairTotaled: boolean;

    /**
     * How much health this repair pack restores per use.
     */
    amount: number;

    /**
     * If set, this repair pack only repairs parts whose type name starts with
     * one of the listed strings, rather than repairing vehicles.
     * For example, `["engine"]` restricts this pack to engine parts only.
     */
    repairableParts: string[];
}

// =============================================================================
// Item Props & Class
// =============================================================================

export type ItemProps = {
    /**
     * The type of this item. Determines which sub-section is relevant and
     * what special functionality the item has.
     * If omitted, a base item with no functionality is created.
     */
    type: ItemType;

    /**
     * Booklet configuration. Only used when `type` is `ItemType.Booklet`.
     */
    booklet: Partial<BookletProps>;

    /**
     * Food configuration. Only used when `type` is `ItemType.Food`.
     */
    food: Partial<FoodProps>;

    /**
     * Weapon configuration. Only used when `type` is `ItemType.Weapon`.
     */
    weapon: Partial<WeaponProps>;

    /**
     * Repair pack configuration. Only used when `type` is `ItemType.RepairPack`.
     */
    repair: Partial<RepairProps>;
}

export class Item extends JSONDefs {

    type?: ItemType;
    booklet?: Partial<BookletProps>;
    food?: Partial<FoodProps>;
    weapon?: Partial<WeaponProps>;
    repair?: Partial<RepairProps>;

    constructor(properties: Partial<ItemProps>) {
        super();
        this.type    = properties.type;
        this.booklet = properties.booklet;
        this.food    = properties.food;
        this.weapon  = properties.weapon;
        this.repair  = properties.repair;
    }

    override toJSON(version: Versions): object {
        return {
            item: {
                type: this.type,
            },
            booklet: this.booklet,
            food:    this.food,
            weapon:  this.weapon,
            repair:  this.repair,
        };
    }

}