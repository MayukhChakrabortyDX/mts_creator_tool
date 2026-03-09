//! REVIEW INCOMPLETE

import { JSONDefs, type Versions } from "./json";
import { type ConditionProps } from "./conditions";
import { type ValueModifierProps } from "./valueModifier";

export type SoundProps = {
    /**
     * The name of this sound, used by MTS to locate the audio file.
     * Format: packID:soundName
     * All sounds should be in the `sounds` folder directly under the pack root.
     * Not required if `soundVariations` is set, but must still be unique to the
     * entity this is defined on so the audio system can track it.
     */
    name: string;

    /**
     * A list of sounds to randomly select from each time this sound plays.
     * If set, one of these will be chosen at random instead of `name`.
     * `name` is still required as a unique tracking key for the audio system.
     */
    soundVariations: string[];

    /**
     * Required. Conditions that determine whether this sound is active.
     */
    activeConditions: Partial<ConditionProps>[];

    /**
     * Value modifiers for the volume of this sound.
     * Volume is internally clamped to 0.0–1.0.
     * Defaults to full volume if omitted.
     */
    volumeModifiers: Partial<ValueModifierProps>[];

    /**
     * Value modifiers for the pitch of this sound.
     * Pitch has a lower clamp of 0.0 but no upper clamp, though very high
     * values may cause issues on some audio cards.
     */
    pitchModifiers: Partial<ValueModifierProps>[];

    /**
     * If true, this sound will loop continuously.
     * WARNING: Unless volume is set to 0 or the sound is blocked via
     * visibility variables or inhibitors, it will play forever and occupy
     * a sound slot. Use looping sounds sparingly.
     */
    looping: boolean;

    /**
     * If true, this sound plays every tick that `activeConditions` are met,
     * even if the same sound is already playing from a previous tick.
     * Mainly used for guns that need to fire sounds every tick.
     * Looping sounds are strongly preferred over this when possible.
     */
    forceSound: boolean;

    /**
     * If true, this sound can be queried and played more than once per tick,
     * or at sub-tick intervals. More expensive than per-tick checks —
     * use only when required (e.g. very fast sounds that need fractional timing).
     */
    canPlayOnPartialTicks: boolean;

    /**
     * If true, this sound only plays when the player is riding this entity
     * and is in first-person view.
     */
    isInterior: boolean;

    /**
     * If true, this sound is blocked when the player is riding this entity
     * in first-person view. Complement to `isInterior`.
     */
    isExterior: boolean;

    /**
     * If true, the doppler effect normally applied to looping sounds is disabled.
     */
    blockDoppler: boolean;

    /**
     * The x,y,z position of this sound relative to the entity center.
     * May be omitted to play the sound at the entity center.
     */
    pos: [number, number, number];

    /**
     * The direction vector for conical sound projection.
     * Used with `conicalAngle` to restrict the sound to a cone.
     */
    conicalVector: [number, number, number];

    /**
     * The angle in degrees outward from `conicalVector` within which
     * this sound can be heard.
     */
    conicalAngle: number;

    /**
     * The minimum distance at which this sound can be heard.
     * If set, no volume scaling is applied between min and max distance.
     * If omitted alongside `maxDistance`, defaults to 0.
     */
    minDistance: number;

    /**
     * The volume of the sound at `minDistance`. Range: 0.0–1.0.
     */
    minDistanceVolume: number;

    /**
     * An intermediate distance used for triangular volume interpolation
     * between `minDistance` and `maxDistance`.
     */
    middleDistance: number;

    /**
     * The volume of the sound at `middleDistance`. Range: 0.0–1.0.
     */
    middleDistanceVolume: number;

    /**
     * The maximum distance at which this sound can be heard.
     * - If `minDistance` is 0: volume scales from 100% at origin to 0% here.
     * - If `minDistance` is set: no scaling is applied.
     * - If both are omitted: defaults to 0–64 block range.
     */
    maxDistance: number;

    /**
     * The volume of the sound at `maxDistance`. Range: 0.0–1.0.
     */
    maxDistanceVolume: number;
}

export class Sound extends JSONDefs {

    name?: string;
    soundVariations?: string[];
    activeConditions?: Partial<ConditionProps>[];
    volumeModifiers?: Partial<ValueModifierProps>[];
    pitchModifiers?: Partial<ValueModifierProps>[];
    looping?: boolean;
    forceSound?: boolean;
    canPlayOnPartialTicks?: boolean;
    isInterior?: boolean;
    isExterior?: boolean;
    blockDoppler?: boolean;
    pos?: [number, number, number];
    conicalVector?: [number, number, number];
    conicalAngle?: number;
    minDistance?: number;
    minDistanceVolume?: number;
    middleDistance?: number;
    middleDistanceVolume?: number;
    maxDistance?: number;
    maxDistanceVolume?: number;

    constructor(properties: Partial<SoundProps>) {
        super();
        this.name                 = properties.name;
        this.soundVariations      = properties.soundVariations;
        this.activeConditions     = properties.activeConditions;
        this.volumeModifiers      = properties.volumeModifiers;
        this.pitchModifiers       = properties.pitchModifiers;
        this.looping              = properties.looping;
        this.forceSound           = properties.forceSound;
        this.canPlayOnPartialTicks = properties.canPlayOnPartialTicks;
        this.isInterior           = properties.isInterior;
        this.isExterior           = properties.isExterior;
        this.blockDoppler         = properties.blockDoppler;
        this.pos                  = properties.pos;
        this.conicalVector        = properties.conicalVector;
        this.conicalAngle         = properties.conicalAngle;
        this.minDistance          = properties.minDistance;
        this.minDistanceVolume    = properties.minDistanceVolume;
        this.middleDistance       = properties.middleDistance;
        this.middleDistanceVolume = properties.middleDistanceVolume;
        this.maxDistance          = properties.maxDistance;
        this.maxDistanceVolume    = properties.maxDistanceVolume;
    }

    override toJSON(version: Versions): object {
        return {
            sounds: {
                name:                 this.name,
                soundVariations:      this.soundVariations,
                activeConditions:     this.activeConditions,
                volumeModifiers:      this.volumeModifiers,
                pitchModifiers:       this.pitchModifiers,
                looping:              this.looping,
                forceSound:           this.forceSound,
                canPlayOnPartialTicks: this.canPlayOnPartialTicks,
                isInterior:           this.isInterior,
                isExterior:           this.isExterior,
                blockDoppler:         this.blockDoppler,
                pos:                  this.pos,
                conicalVector:        this.conicalVector,
                conicalAngle:         this.conicalAngle,
                minDistance:          this.minDistance,
                minDistanceVolume:    this.minDistanceVolume,
                middleDistance:       this.middleDistance,
                middleDistanceVolume: this.middleDistanceVolume,
                maxDistance:          this.maxDistance,
                maxDistanceVolume:    this.maxDistanceVolume,
            }
        };
    }

}