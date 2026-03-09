//! REVIEW INCOMPLETE

import { JSONDefs, type Versions } from "./json";
import { type PotionEffectProps } from "./potionEffect";

// =============================================================================
// Enums
// =============================================================================

export enum BulletType {
    /** Explodes on impact. Larger diameter = larger blast. */
    Explosive     = "explosive",

    /** Deals normal damage and sets entities/blocks on fire. */
    Incendiary    = "incendiary",

    /** Deals normal damage but ignores armor values. */
    ArmorPiercing = "armor_piercing",

    /**
     * Deals no damage. Extinguishes block fires and burning entities.
     * Useful for combating incendiary weapons.
     */
    Water         = "water",
}

export enum GuidanceType {
    /**
     * Unimplemented. Does not require a prior lock — guides to the first
     * valid target that enters the seeker's FOV.
     */
    Passive    = "passive",

    /**
     * Requires a prior lock. The shooter must maintain the lock throughout
     * the bullet's flight or guidance ceases.
     */
    SemiActive = "semi_active",

    /**
     * Default. Guides to whatever the gun was locked on to at the moment
     * of firing.
     */
    Active     = "active",
}

// =============================================================================
// Bullet Props
// =============================================================================

export type BulletProps = {
    /**
     * A list of types describing how this bullet inflicts damage.
     * For a normal bullet, this list may be empty, but it must be present
     * or the bullet will not load.
     */
    types: BulletType[];

    /**
     * The guidance logic used after firing.
     * If omitted, the bullet travels in a straight line.
     */
    guidanceType: GuidanceType;

    /**
     * How far from the bullet's position it can maintain a lock on a target,
     * in blocks.
     */
    seekerRange: number;

    /**
     * The half-angle of the seeker cone, in degrees.
     * If the target moves outside this angle relative to the bullet's
     * orientation, the lock is broken.
     */
    seekerMaxAngle: number;

    /**
     * If true, this bullet does not spawn a projectile but still consumes
     * ammo. Useful for blank rounds and special effects.
     */
    isBlank: boolean;

    /**
     * If true, this bullet is treated as a HEAT round and uses the
     * `heatArmorThickness` value on collision boxes instead of the standard
     * `armorThickness`. Falls back to standard armor values if the HEAT value
     * is not defined.
     */
    isHeat: boolean;

    /**
     * If true, hit detection runs on the server rather than the firing client.
     * Allows the bullet to hit things outside the client's loaded area, but
     * may cause visual de-sync on fast-moving vehicles.
     * Defaults to false (client-side detection).
     */
    isLongRange: boolean;

    /**
     * How many bullets are produced per craft at the bullet bench.
     */
    quantity: number;

    /**
     * The diameter of this bullet, in mm.
     * Determines which guns can fire it and contributes to damage calculation.
     */
    diameter: number;

    /**
     * The damage this bullet deals on hit.
     * Defaults to diameter / 5 if omitted.
     * `water` type bullets never deal damage regardless of this value.
     */
    damage: number;

    /**
     * The case length of this bullet, in mm.
     * Determines compatibility with guns that specify `minCaseLength` /
     * `maxCaseLength`. Does not affect damage.
     */
    caseLength: number;

    /**
     * Overrides the explosion size and damage for `explosive` type bullets.
     * 1.0 ≈ one block of TNT. Leave unset to auto-calculate from `diameter`.
     */
    blastStrength: number;

    /**
     * If set, pushes the hit entity back by this amount on impact.
     */
    knockback: number;

    /**
     * How much armor, in mm, this bullet can penetrate.
     * The bullet passes through any collision box whose `armorThickness` is
     * less than this value. Penetration decreases as the bullet slows down,
     * so a high-penetration bullet may still be stopped by thick armor at
     * long range.
     */
    armorPenetration: number;

    /**
     * The bullet detonates when it is within this many blocks of a block or
     * its locked target. Allows air-burst detonation above targets or ground.
     */
    proximityFuze: number;

    /**
     * The bullet explodes or despawns after this many ticks, regardless of
     * proximity. A simpler alternative to `proximityFuze` for anti-aircraft
     * or timed rounds.
     */
    airBurstDelay: number;

    /**
     * Velocity lost per tick due to air resistance, in m/s.
     * Has no effect while `burnTime` is still active.
     */
    slowdownSpeed: number;

    /**
     * How long, in ticks, the bullet maintains its initial velocity before
     * slowdown and gravity begin. Simulates a rocket motor.
     */
    burnTime: number;

    /**
     * How long, in ticks, the bullet takes to accelerate from its initial
     * velocity to `maxVelocity`. Requires `maxVelocity` to be set.
     */
    accelerationTime: number;

    /**
     * How long, in ticks, to wait before acceleration begins.
     * Can be combined with initial muzzle velocity to simulate missiles that
     * detach and coast before their motor ignites.
     */
    accelerationDelay: number;

    /**
     * The maximum velocity this bullet can reach, in m/s.
     * Only used when `accelerationTime` is set.
     */
    maxVelocity: number;

    /**
     * Velocity added in the -Y direction per tick, simulating gravity and
     * causing the bullet to travel in an arc.
     */
    gravitationalVelocity: number;

    /**
     * How many ticks after firing before this bullet despawns.
     * Defaults to 200 ticks (10 seconds) if omitted.
     */
    despawnTime: number;

    /**
     * How many ticks after impact before this bullet despawns.
     * Defaults to 0 (despawns immediately on impact).
     * Set higher to allow impact animations or sounds to complete.
     */
    impactDespawnTime: number;

    /**
     * How many ticks after firing before a guided bullet begins turning
     * toward its target.
     */
    guidanceDelay: number;

    /**
     * The maximum turning rate of a guided bullet, in degrees per tick.
     * If set, the bullet will home in on locked entities and hot engines.
     */
    turnRate: number;

    /**
     * The number of pellets in this shell.
     * Used for shotgun-style ammunition.
     */
    pellets: number;

    /**
     * How much spread the pellets have on firing.
     * 0 = no spread; higher values = wider spread.
     */
    pelletSpreadFactor: number;

    /**
     * Optional list of potion effects applied to the entity hit by this bullet.
     */
    effects: Partial<PotionEffectProps>[];

    /**
     * The model to use for the casing particle ejected on firing.
     * Format: packID:path/to/model.obj
     * Set to null or omit for no casing model.
     */
    casingModel: string;

    /**
     * The texture to use for the casing particle.
     * Format: packID:path/to/texture.png
     * Set to null or omit for no casing texture.
     */
    casingTexture: string;
}

// =============================================================================
// Class
// =============================================================================

export class Bullet extends JSONDefs {

    types?: BulletType[];
    guidanceType?: GuidanceType;
    seekerRange?: number;
    seekerMaxAngle?: number;
    isBlank?: boolean;
    isHeat?: boolean;
    isLongRange?: boolean;
    quantity?: number;
    diameter?: number;
    damage?: number;
    caseLength?: number;
    blastStrength?: number;
    knockback?: number;
    armorPenetration?: number;
    proximityFuze?: number;
    airBurstDelay?: number;
    slowdownSpeed?: number;
    burnTime?: number;
    accelerationTime?: number;
    accelerationDelay?: number;
    maxVelocity?: number;
    gravitationalVelocity?: number;
    despawnTime?: number;
    impactDespawnTime?: number;
    guidanceDelay?: number;
    turnRate?: number;
    pellets?: number;
    pelletSpreadFactor?: number;
    effects?: Partial<PotionEffectProps>[];
    casingModel?: string;
    casingTexture?: string;

    constructor(properties: Partial<BulletProps>) {
        super();
        this.types                = properties.types;
        this.guidanceType         = properties.guidanceType;
        this.seekerRange          = properties.seekerRange;
        this.seekerMaxAngle       = properties.seekerMaxAngle;
        this.isBlank              = properties.isBlank;
        this.isHeat               = properties.isHeat;
        this.isLongRange          = properties.isLongRange;
        this.quantity             = properties.quantity;
        this.diameter             = properties.diameter;
        this.damage               = properties.damage;
        this.caseLength           = properties.caseLength;
        this.blastStrength        = properties.blastStrength;
        this.knockback            = properties.knockback;
        this.armorPenetration     = properties.armorPenetration;
        this.proximityFuze        = properties.proximityFuze;
        this.airBurstDelay        = properties.airBurstDelay;
        this.slowdownSpeed        = properties.slowdownSpeed;
        this.burnTime             = properties.burnTime;
        this.accelerationTime     = properties.accelerationTime;
        this.accelerationDelay    = properties.accelerationDelay;
        this.maxVelocity          = properties.maxVelocity;
        this.gravitationalVelocity = properties.gravitationalVelocity;
        this.despawnTime          = properties.despawnTime;
        this.impactDespawnTime    = properties.impactDespawnTime;
        this.guidanceDelay        = properties.guidanceDelay;
        this.turnRate             = properties.turnRate;
        this.pellets              = properties.pellets;
        this.pelletSpreadFactor   = properties.pelletSpreadFactor;
        this.effects              = properties.effects;
        this.casingModel          = properties.casingModel;
        this.casingTexture        = properties.casingTexture;
    }

    override toJSON(version: Versions): object {
        return {
            bullet: {
                types:                 this.types,
                guidanceType:          this.guidanceType,
                seekerRange:           this.seekerRange,
                seekerMaxAngle:        this.seekerMaxAngle,
                isBlank:               this.isBlank,
                isHeat:                this.isHeat,
                isLongRange:           this.isLongRange,
                quantity:              this.quantity,
                diameter:              this.diameter,
                damage:                this.damage,
                caseLength:            this.caseLength,
                blastStrength:         this.blastStrength,
                knockback:             this.knockback,
                armorPenetration:      this.armorPenetration,
                proximityFuze:         this.proximityFuze,
                airBurstDelay:         this.airBurstDelay,
                slowdownSpeed:         this.slowdownSpeed,
                burnTime:              this.burnTime,
                accelerationTime:      this.accelerationTime,
                accelerationDelay:     this.accelerationDelay,
                maxVelocity:           this.maxVelocity,
                gravitationalVelocity: this.gravitationalVelocity,
                despawnTime:           this.despawnTime,
                impactDespawnTime:     this.impactDespawnTime,
                guidanceDelay:         this.guidanceDelay,
                turnRate:              this.turnRate,
                pellets:               this.pellets,
                pelletSpreadFactor:    this.pelletSpreadFactor,
                effects:               this.effects,
                casingModel:           this.casingModel,
                casingTexture:         this.casingTexture,
            }
        };
    }

}