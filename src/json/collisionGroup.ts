//! REVIEW INCOMPLETE

import { JSONDefs, type Versions } from "./json";
import { type AnimationProps } from "./animation";
import { type ActionProps } from "./action";

export enum CollisionType {
    /** Allows collision with blocks. */
    Block   = "block",

    /** Allows entities to collide with this box. */
    Entity  = "entity",

    /** Allows vehicle wheels to ride on boxes in this group. */
    Vehicle = "vehicle",

    /** Allows attacking from damage sources, including bullets. */
    Attack  = "attack",

    /** Allows bullet interaction only, not general attacks. */
    Bullet  = "bullet",

    /** Allows clicking. */
    Click   = "click",

    /** Allows effector logic. */
    Effector = "effector",
}

export type CollisionBoxProps = {
    /**
     * The x,y,z center point of this collision box relative to the vehicle center.
     */
    pos: [number, number, number];

    /**
     * The width of this collision box in meters.
     * The box extends ½ width in both the X and Z directions from `pos`.
     */
    width: number;

    /**
     * The height of this collision box in meters.
     * The box extends ½ height in both Y directions from `pos`.
     */
    height: number;

    /**
     * If true, this collision box will behave like a floating ground device.
     * For boats using only these boxes, one is required per corner — failing to
     * do so will cause the vehicle to sink.
     */
    collidesWithLiquids: boolean;

    /**
     * The action to perform when this hitbox is clicked.
     * If the action variable contains "door" in the name, special auto-close
     * logic will turn the variable off when the vehicle starts moving.
     */
    action: Partial<ActionProps>;
}

export type CollisionGroupProps = {
    /**
     * How much health this collision group has.
     * When health reaches 0, the group is disabled.
     * Useful for destructible armor or breakable model sections.
     * If 0, the group is always present and damage is charged to the entity instead.
     */
    health: number;

    /**
     * Armor thickness of this collision box, in mm.
     * Bullets with less penetration than this value will be stopped on impact.
     * Note that bullets lose penetration over distance — this is only reliable at point-blank range.
     */
    armorThickness: number;

    /**
     * Like `armorThickness`, but only applies to HEAT bullets.
     */
    heatArmorThickness: number;

    /**
     * Damage multiplier for bullets hitting this hitbox.
     * Defaults to 1.0 if not specified.
     */
    damageMultiplier: number;

    /**
     * Multiplier for damage forwarded to the entity this group belongs to.
     * If set, bullets will also stop when hitting this collision box.
     */
    forwardsDamageMultiplier: number;

    /**
     * Damage applied to Minecraft entities that enter this hitbox area.
     * Applied continuously, though the internal damage cooldown prevents
     * damage on every tick.
     */
    externalEntityDamage: number;

    /**
     * Damage applied to MTS entities that enter this hitbox area.
     * Applied continuously — ensure this box is deactivated once damaging
     * conditions are satisfied to prevent rapid health depletion.
     */
    internalEntityDamage: number;

    /**
     * The types of collision interactions enabled for this group.
     */
    collisionTypes: CollisionType[];

    /**
     * The list of collision boxes in this group.
     */
    collisions: Partial<CollisionBoxProps>[];

    /**
     * If set, this group will first apply the animations of the specified
     * rendering object before those defined here.
     * Resolved recursively if the referenced object also has an `applyAfter`.
     */
    applyAfter: string;

    /**
     * Animations applied to this collision group.
     * Translations and rotations work as expected.
     * Visibility completely disables the group when the variable is false or 0.
     */
    animations: Partial<AnimationProps>[];
}

export class CollisionGroup extends JSONDefs {

    health?: number;
    armorThickness?: number;
    heatArmorThickness?: number;
    damageMultiplier?: number;
    forwardsDamageMultiplier?: number;
    externalEntityDamage?: number;
    internalEntityDamage?: number;
    collisionTypes?: CollisionType[];
    collisions?: Partial<CollisionBoxProps>[];
    applyAfter?: string;
    animations?: Partial<AnimationProps>[];

    constructor(properties: Partial<CollisionGroupProps>) {
        super();
        this.health                   = properties.health;
        this.armorThickness           = properties.armorThickness;
        this.heatArmorThickness       = properties.heatArmorThickness;
        this.damageMultiplier         = properties.damageMultiplier;
        this.forwardsDamageMultiplier = properties.forwardsDamageMultiplier;
        this.externalEntityDamage     = properties.externalEntityDamage;
        this.internalEntityDamage     = properties.internalEntityDamage;
        this.collisionTypes           = properties.collisionTypes;
        this.collisions               = properties.collisions;
        this.applyAfter               = properties.applyAfter;
        this.animations               = properties.animations;
    }

    override toJSON(version: Versions): object {
        return {
            collisionGroups: {
                health:                   this.health,
                armorThickness:           this.armorThickness,
                heatArmorThickness:       this.heatArmorThickness,
                damageMultiplier:         this.damageMultiplier,
                forwardsDamageMultiplier: this.forwardsDamageMultiplier,
                externalEntityDamage:     this.externalEntityDamage,
                internalEntityDamage:     this.internalEntityDamage,
                collisionTypes:           this.collisionTypes,
                collisions:               this.collisions,
                applyAfter:               this.applyAfter,
                animations:               this.animations,
            }
        };
    }

}