//! REVIEW INCOMPLETE

import { JSONDefs, type Versions } from "./json";

export enum PotionEffectName {
    Speed           = "speed",
    Slowness        = "slowness",
    Haste           = "haste",
    MiningFatigue   = "mining_fatigue",
    Strength        = "strength",
    InstantHealth   = "instant_health",
    InstantDamage   = "instant_damage",
    JumpBoost       = "jump_boost",
    Nausea          = "nausea",
    Regeneration    = "regeneration",
    Resistance      = "resistance",
    FireResistance  = "fire_resistance",
    WaterBreathing  = "water_breathing",
    Invisibility    = "invisibility",
    Blindness       = "blindness",
    NightVision     = "night_vision",
    Hunger          = "hunger",
    Weakness        = "weakness",
    Poison          = "poison",
    Wither          = "wither",
    HealthBoost     = "health_boost",
    Absorption      = "absorption",
    Saturation      = "saturation",
    Glowing         = "glowing",
    Levitation      = "levitation",
    Luck            = "luck",
    Unluck          = "unluck",
}

export type PotionEffectProps = {
    /**
     * The potion effect to apply. Must match a base-game potion name or a modded potion
     * registered via the standard potion registration system.
     * Riders will NOT keep their effects after exiting the vehicle, regardless of duration.
     */
    name: PotionEffectName | (string & {});

    /**
     * How long the effect lasts, in ticks.
     * For most effects, 5 ticks is sufficient as the system will reapply before it expires.
     * Some effects (e.g. night_vision) behave differently below 200 ticks — use a higher
     * value for those to avoid visual flickering or unexpected behaviour.
     */
    duration: number;

    /**
     * The intensity of the effect, as an integer between 0 and 255.
     * Note that Minecraft adds 1 to this value internally — an amplifier of 1 will display
     * as "Effect II". Has no impact on many effects and can be omitted or set to 0 for those.
     */
    amplifier: number;
}

export class PotionEffect extends JSONDefs {

    name?: PotionEffectName | (string & {});
    duration?: number;
    amplifier?: number;

    constructor(properties: Partial<PotionEffectProps>) {
        super();
        this.name      = properties.name;
        this.duration  = properties.duration;
        this.amplifier = properties.amplifier;
    }

    override toJSON(version: Versions): object {
        return {
            effects: {
                name:      this.name,
                duration:  this.duration,
                amplifier: this.amplifier,
            }
        };
    }

}