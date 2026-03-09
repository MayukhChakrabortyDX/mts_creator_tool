//! REVIEW INCOMPLETE

import { JSONDefs, type Versions } from "./json";
import { type AnimatedObjectProps } from "./animatedObject";
import { type LightProps } from "./light";
import { type TextObjectProps } from "./textObject";
import { type CameraProps } from "./camera";
import { type SoundProps } from "./sound";
import { type ParticleProps } from "./particle";

export enum ModelType {
    /**
     * Standard Wavefront OBJ model.
     */
    OBJ         = "obj",

    /**
     * LittleTiles model (txt format).
     */
    LittleTiles = "littletiles",

    /**
     * No model — nothing is rendered for this entity.
     */
    None        = "none",
}

export type RenderingProps = {
    /**
     * The type of model this entity renders from.
     * Defaults to `obj` if omitted.
     */
    modelType: ModelType;

    /**
     * A list of animated objects this model has.
     * Used to move, rotate, scale, show, or hide parts of the OBJ model.
     */
    animatedObjects: Partial<AnimatedObjectProps>[];

    /**
     * A list of light objects this model has.
     * Used to define emissive, blendable, and beam lighting on model objects.
     */
    lightObjects: Partial<LightProps>[];

    /**
     * A list of text objects this model will render.
     * Used for license plates, route signs, instrument readouts, etc.
     */
    textObjects: Partial<TextObjectProps>[];

    /**
     * A list of cameras this object provides.
     * Used to define first-person, gun sight, or other camera positions.
     */
    cameraObjects: Partial<CameraProps>[];

    /**
     * A list of sounds this object will play.
     * Covers everything from engine sounds to tire squeal and gun reports.
     */
    sounds: Partial<SoundProps>[];

    /**
     * A list of particles this object can spawn.
     * Think exhaust smoke, burnout dust, water spray, muzzle flash debris, etc.
     */
    particles: Partial<ParticleProps>[];

    /**
     * A list of custom variable names for animations that don't fit the
     * pre-defined variable set. The default panel shows up to 4; custom
     * panels can show as many as physically fit on-screen.
     */
    customVariables: string[];
}

export class Rendering extends JSONDefs {

    modelType?: ModelType;
    animatedObjects?: Partial<AnimatedObjectProps>[];
    lightObjects?: Partial<LightProps>[];
    textObjects?: Partial<TextObjectProps>[];
    cameraObjects?: Partial<CameraProps>[];
    sounds?: Partial<SoundProps>[];
    particles?: Partial<ParticleProps>[];
    customVariables?: string[];

    constructor(properties: Partial<RenderingProps>) {
        super();
        this.modelType       = properties.modelType;
        this.animatedObjects = properties.animatedObjects;
        this.lightObjects    = properties.lightObjects;
        this.textObjects     = properties.textObjects;
        this.cameraObjects   = properties.cameraObjects;
        this.sounds          = properties.sounds;
        this.particles       = properties.particles;
        this.customVariables = properties.customVariables;
    }

    override toJSON(version: Versions): object {
        return {
            rendering: {
                modelType:       this.modelType,
                animatedObjects: this.animatedObjects,
                lightObjects:    this.lightObjects,
                textObjects:     this.textObjects,
                cameraObjects:   this.cameraObjects,
                sounds:          this.sounds,
                particles:       this.particles,
                customVariables: this.customVariables,
            }
        };
    }

}