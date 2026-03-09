//! REVIEW INCOMPLETE

import { JSONDefs, type Versions } from "./json";
import { type ConditionProps } from "./conditions";
import { type MTSColor } from "./color";

export enum ParticleType {
    /** Standard smoke particle. Slowly floats up. */
    Smoke   = "smoke",

    /** Standard flame particle. Grows and floats up. Always renders bright. */
    Flame   = "flame",

    /** Standard bubble particle. Floats up in water, despawns in air. */
    Bubble  = "bubble",

    /** Block breakage particles matching the texture of the block below spawn location. */
    Break   = "break",

    /** Casing particle. Renders the model/texture defined on the spawning gun's bullet. */
    Casing  = "casing",

    /**
     * Generic particle with no pre-defined movement beyond default randomness.
     * Useful for custom movement via velocity parameters.
     */
    Generic = "generic",
}

export enum SpawningOrientation {
    /** Spawns relative to the entity that spawned it. */
    Entity        = "entity",

    /** Spawns relative to the previous particle, creating a continuous streak. */
    Streak        = "streak",

    /** Spawns attached to and moves with the spawning entity. */
    Attached      = "attached",

    /** Spawns relative to the world, ignoring entity orientation. */
    World         = "world",

    /** Spawns relative to the world but moves with the spawning entity. */
    WorldAttached = "world_attached",

    /**
     * Spawns relative to the face hit by the bullet that spawned it.
     * Not spawned if the bullet air-burst without hitting anything, or if not on a bullet.
     */
    Facing        = "facing",
}

export enum RenderingOrientation {
    /** Does not rotate — orients as spawned. Can be rotated via `rot`. */
    Fixed  = "fixed",

    /** Always faces the player. */
    Player = "player",

    /** Faces the player, but only rotates around the Y-axis. */
    YAxis  = "yaxis",

    /** Faces its direction of motion. */
    Motion = "motion",
}

export type SubParticleProps = {
    /**
     * How many ticks after this particle becomes active before the sub-particle spawns.
     */
    time: number;

    /**
     * The particle to spawn. Follows the same format as a normal particle,
     * and may include its own subParticles.
     */
    particle: Partial<ParticleProps>;
}

export type ParticleProps = {
    /**
     * The type of particle to spawn.
     */
    type: ParticleType;

    /**
     * Defines what the particle spawns relative to.
     */
    spawningOrientation: SpawningOrientation;

    /**
     * Defines what the particle faces or rotates toward.
     */
    renderingOrientation: RenderingOrientation;

    /**
     * Conditions determining whether this particle should spawn.
     * Particles only spawn when they first become active, unless `spawnEveryTick` is set.
     */
    activeAnimations: Partial<ConditionProps>[];

    /**
     * If true, forces this particle to spawn every tick it is active.
     * Useful for constant flows like smoke trails.
     */
    spawnEveryTick: boolean;

    /**
     * If true, this particle ignores lighting and always renders at full brightness.
     * Useful for muzzle flashes and sparks.
     */
    isBright: boolean;

    /**
     * If true, this particle uses brightness blending.
     * Ignored if the user has blendedLights disabled in their config.
     */
    isBlended: boolean;

    /**
     * Reduces alpha by this factor during daytime.
     * 1.0 = fully invisible in full daylight. 0.0–1.0 for partial reduction.
     */
    daytimeReductionFactor: number;

    /**
     * If true, uses the block color of the block this particle spawned from.
     * Only valid for `break` type particles.
     */
    useBlockColor: boolean;

    /**
     * If true, uses block properties from the ground directly below the particle
     * rather than from the block at the particle's current position.
     */
    getBlockPropertiesFromGround: boolean;

    /**
     * If true, the particle immediately freezes all movement when its hitbox
     * touches any block. Useful for spent casings or debris.
     */
    stopsOnGround: boolean;

    /**
     * If true, the particle ignores collision with all blocks.
     * Use on particles that don't need collision to save CPU cycles.
     */
    ignoreCollision: boolean;

    /**
     * A list of sounds to randomly play when the particle stops on the ground.
     * Only used when `stopsOnGround` is true.
     * Format for each entry: packID:soundName
     */
    groundSounds: string[];

    /**
     * Path to a 3D model for this particle.
     * Required alongside `texture` to render the particle as a 3D object.
     * Format: packID:path/to/model.obj
     */
    model: string;

    /**
     * Path to a texture for this particle.
     * Required alongside `model` for 3D particles, or used as a custom texture sheet.
     * Format: packID:path/to/texture.png
     */
    texture: string;

    /**
     * If true, `textureList` starts from a random texture rather than the first.
     * If `textureDelay` is not set, a random texture is picked and held.
     * Otherwise, cycling proceeds normally from the random start.
     */
    randomTexture: boolean;

    /**
     * How many of this particle to spawn at a time. Defaults to 1.
     */
    quantity: number;

    /**
     * How long the particle remains, in ticks.
     * If not set, age is auto-calculated the same way as a naturally spawned particle.
     */
    duration: number;

    /**
     * A random value added or subtracted from `duration` on spawn.
     * Allows variation in particle lifespans.
     */
    durationRandomness: number;

    /**
     * If set, the particle linearly decelerates from `initialVelocity` to 0
     * over this many ticks. If `duration` is less than this, the particle
     * slows proportionally and never fully stops.
     * `movementVelocity` and `terminalVelocity` still apply if set.
     */
    movementDuration: number;

    /**
     * Initial transparency of the particle. Range: 0.0–1.0.
     * If neither this nor `toTransparency` is set, both default to 1.0
     * and no transparency changes are performed.
     */
    transparency: number;

    /**
     * If set, the particle gradually changes transparency from `transparency`
     * to this value. If `transparency` is set and non-zero, defaults to 0.0.
     */
    toTransparency: number;

    /**
     * Time in ticks to fade the particle in at the start of its lifespan.
     * Alpha is multiplied by (ticksFromSpawn / fadeInTransparencyTime).
     */
    fadeInTransparencyTime: number;

    /**
     * Time in ticks to fade the particle out at the end of its lifespan.
     * Alpha is multiplied by (ticksToDeath / fadeOutTransparencyTime).
     */
    fadeOutTransparencyTime: number;

    /**
     * The initial scale of the particle.
     * 1.0 = 1 texture pixel per 1 in-game pixel. Defaults to 1.0.
     */
    scale: number;

    /**
     * If set, the particle gradually changes scale from `scale` to this value.
     * Defaults to 1.0 if neither this nor `scale` is set.
     */
    toScale: number;

    /**
     * Time in ticks to scale the particle in at the start of its lifespan.
     * Scale is multiplied by (ticksFromSpawn / fadeInScaleTime).
     */
    fadeInScaleTime: number;

    /**
     * Time in ticks to scale the particle out at the end of its lifespan.
     * Scale is multiplied by (ticksToDeath / fadeOutScaleTime).
     */
    fadeOutScaleTime: number;

    /**
     * The size of the particle's hitbox in blocks. Defaults to 0.2.
     */
    hitboxSize: number;

    /**
     * A list of texture PNG files to cycle through.
     * Cycling delay is controlled by `textureDelay`.
     * Cycles repeat when the end of the list is reached.
     */
    textureList: string[];

    /**
     * A list of delays in ticks between texture cycles.
     * Repeats from the start when the end of the list is reached.
     */
    textureDelay: number[];

    /**
     * The color of this particle. Defaults to white (no color modification).
     */
    color: MTSColor;

    /**
     * If set, the particle gradually changes color from `color` to this value.
     * Defaults to the initial color if not set.
     */
    toColor: MTSColor;

    /**
     * A list of colors to cycle through.
     * Cycling delay is controlled by `colorDelays`.
     * Cycles repeat when the end of the list is reached.
     */
    colorList: MTSColor[];

    /**
     * A list of delays in ticks between color cycles.
     * Repeats from the start when the end of the list is reached.
     */
    colorDelays: number[];

    /**
     * If true, `colorList` starts from a random color rather than the first.
     * If `colorDelays` is not set, a random color is picked and held.
     * Otherwise, cycling proceeds normally from the random start.
     */
    randomColor: boolean;

    /**
     * Spawning distance in blocks. Like `spawnEveryTick` but distance-based.
     * Useful for fast-moving objects like jets to maintain seamless particle trails.
     */
    distance: number;

    /**
     * The position where this particle spawns relative to the spawning object.
     * May be omitted to spawn at the same position as the object.
     */
    pos: [number, number, number];

    /**
     * The rotation of this particle on spawn.
     * Only has an effect on `Fixed` rendering orientation particles.
     */
    rot: [number, number, number];

    /**
     * Random rotation offsets [x,y,z] in degrees added to `rot` on spawn,
     * multiplied by a random value between -1 and 1.
     */
    rotationRandomness: [number, number, number];

    /**
     * Rotation velocity [x,y,z] in degrees applied to this particle every tick.
     */
    rotationVelocity: [number, number, number];

    /**
     * Random velocity [x,y,z] added to `initialVelocity` on spawn,
     * multiplied by a random value between -1 and 1.
     */
    spreadRandomness: [number, number, number];

    /**
     * Factor of the spawning entity's velocity to inherit on spawn.
     * +Z is straight ahead relative to the spawning entity.
     * If omitted, no inherited velocity is applied.
     */
    relativeInheritedVelocityFactor: [number, number, number];

    /**
     * Initial velocity of the particle on spawn.
     * +Z is straight ahead relative to the spawning entity.
     * May be omitted to spawn with no initial velocity beyond the spawner's own.
     */
    initialVelocity: [number, number, number];

    /**
     * Velocity applied to this particle every tick, relative to the world.
     * Use for effects like smoke rising or oil dripping.
     * If neither this nor `relativeMovementVelocity` is set, default particle velocity is used.
     */
    movementVelocity: [number, number, number];

    /**
     * Velocity applied to this particle every tick, relative to the particle itself.
     * Differs from `movementVelocity` which is world-relative.
     */
    relativeMovementVelocity: [number, number, number];

    /**
     * Maximum velocity this particle can reach on any axis.
     * Prevents runaway acceleration over long distances.
     * If not set, velocity is assumed to be infinite.
     */
    terminalVelocity: [number, number, number];

    /**
     * A list of sub-particles spawned at specified times during this particle's lifespan.
     */
    subParticles: Partial<SubParticleProps>[];
}

export class Particle extends JSONDefs {

    type?: ParticleType;
    spawningOrientation?: SpawningOrientation;
    renderingOrientation?: RenderingOrientation;
    activeAnimations?: Partial<ConditionProps>[];
    spawnEveryTick?: boolean;
    isBright?: boolean;
    isBlended?: boolean;
    daytimeReductionFactor?: number;
    useBlockColor?: boolean;
    getBlockPropertiesFromGround?: boolean;
    stopsOnGround?: boolean;
    ignoreCollision?: boolean;
    groundSounds?: string[];
    model?: string;
    texture?: string;
    randomTexture?: boolean;
    quantity?: number;
    duration?: number;
    durationRandomness?: number;
    movementDuration?: number;
    transparency?: number;
    toTransparency?: number;
    fadeInTransparencyTime?: number;
    fadeOutTransparencyTime?: number;
    scale?: number;
    toScale?: number;
    fadeInScaleTime?: number;
    fadeOutScaleTime?: number;
    hitboxSize?: number;
    textureList?: string[];
    textureDelay?: number[];
    color?: MTSColor;
    toColor?: MTSColor;
    colorList?: MTSColor[];
    colorDelays?: number[];
    randomColor?: boolean;
    distance?: number;
    pos?: [number, number, number];
    rot?: [number, number, number];
    rotationRandomness?: [number, number, number];
    rotationVelocity?: [number, number, number];
    spreadRandomness?: [number, number, number];
    relativeInheritedVelocityFactor?: [number, number, number];
    initialVelocity?: [number, number, number];
    movementVelocity?: [number, number, number];
    relativeMovementVelocity?: [number, number, number];
    terminalVelocity?: [number, number, number];
    subParticles?: Partial<SubParticleProps>[];

    constructor(properties: Partial<ParticleProps>) {
        super();
        this.type                          = properties.type;
        this.spawningOrientation           = properties.spawningOrientation;
        this.renderingOrientation          = properties.renderingOrientation;
        this.activeAnimations              = properties.activeAnimations;
        this.spawnEveryTick                = properties.spawnEveryTick;
        this.isBright                      = properties.isBright;
        this.isBlended                     = properties.isBlended;
        this.daytimeReductionFactor        = properties.daytimeReductionFactor;
        this.useBlockColor                 = properties.useBlockColor;
        this.getBlockPropertiesFromGround  = properties.getBlockPropertiesFromGround;
        this.stopsOnGround                 = properties.stopsOnGround;
        this.ignoreCollision               = properties.ignoreCollision;
        this.groundSounds                  = properties.groundSounds;
        this.model                         = properties.model;
        this.texture                       = properties.texture;
        this.randomTexture                 = properties.randomTexture;
        this.quantity                      = properties.quantity;
        this.duration                      = properties.duration;
        this.durationRandomness            = properties.durationRandomness;
        this.movementDuration              = properties.movementDuration;
        this.transparency                  = properties.transparency;
        this.toTransparency                = properties.toTransparency;
        this.fadeInTransparencyTime        = properties.fadeInTransparencyTime;
        this.fadeOutTransparencyTime       = properties.fadeOutTransparencyTime;
        this.scale                         = properties.scale;
        this.toScale                       = properties.toScale;
        this.fadeInScaleTime               = properties.fadeInScaleTime;
        this.fadeOutScaleTime              = properties.fadeOutScaleTime;
        this.hitboxSize                    = properties.hitboxSize;
        this.textureList                   = properties.textureList;
        this.textureDelay                  = properties.textureDelay;
        this.color                         = properties.color;
        this.toColor                       = properties.toColor;
        this.colorList                     = properties.colorList;
        this.colorDelays                   = properties.colorDelays;
        this.randomColor                   = properties.randomColor;
        this.distance                      = properties.distance;
        this.pos                           = properties.pos;
        this.rot                           = properties.rot;
        this.rotationRandomness            = properties.rotationRandomness;
        this.rotationVelocity              = properties.rotationVelocity;
        this.spreadRandomness              = properties.spreadRandomness;
        this.relativeInheritedVelocityFactor = properties.relativeInheritedVelocityFactor;
        this.initialVelocity               = properties.initialVelocity;
        this.movementVelocity              = properties.movementVelocity;
        this.relativeMovementVelocity      = properties.relativeMovementVelocity;
        this.terminalVelocity              = properties.terminalVelocity;
        this.subParticles                  = properties.subParticles;
    }

    override toJSON(version: Versions): object {
        return {
            particles: {
                type:                          this.type,
                spawningOrientation:           this.spawningOrientation,
                renderingOrientation:          this.renderingOrientation,
                activeAnimations:              this.activeAnimations,
                spawnEveryTick:                this.spawnEveryTick,
                isBright:                      this.isBright,
                isBlended:                     this.isBlended,
                daytimeReductionFactor:        this.daytimeReductionFactor,
                useBlockColor:                 this.useBlockColor,
                getBlockPropertiesFromGround:  this.getBlockPropertiesFromGround,
                stopsOnGround:                 this.stopsOnGround,
                ignoreCollision:               this.ignoreCollision,
                groundSounds:                  this.groundSounds,
                model:                         this.model,
                texture:                       this.texture,
                randomTexture:                 this.randomTexture,
                quantity:                      this.quantity,
                duration:                      this.duration,
                durationRandomness:            this.durationRandomness,
                movementDuration:              this.movementDuration,
                transparency:                  this.transparency,
                toTransparency:                this.toTransparency,
                fadeInTransparencyTime:        this.fadeInTransparencyTime,
                fadeOutTransparencyTime:       this.fadeOutTransparencyTime,
                scale:                         this.scale,
                toScale:                       this.toScale,
                fadeInScaleTime:               this.fadeInScaleTime,
                fadeOutScaleTime:              this.fadeOutScaleTime,
                hitboxSize:                    this.hitboxSize,
                textureList:                   this.textureList,
                textureDelay:                  this.textureDelay,
                color:                         this.color,
                toColor:                       this.toColor,
                colorList:                     this.colorList,
                colorDelays:                   this.colorDelays,
                randomColor:                   this.randomColor,
                distance:                      this.distance,
                pos:                           this.pos,
                rot:                           this.rot,
                rotationRandomness:            this.rotationRandomness,
                rotationVelocity:              this.rotationVelocity,
                spreadRandomness:              this.spreadRandomness,
                relativeInheritedVelocityFactor: this.relativeInheritedVelocityFactor,
                initialVelocity:               this.initialVelocity,
                movementVelocity:              this.movementVelocity,
                relativeMovementVelocity:      this.relativeMovementVelocity,
                terminalVelocity:              this.terminalVelocity,
                subParticles:                  this.subParticles,
            }
        };
    }

}