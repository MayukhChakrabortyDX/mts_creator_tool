//! REVIEW INCOMPLETE

import { JSONDefs, type Versions } from "./json";
import { type AnimationProps } from "./animation";
import { type MTSColor } from "./color";

export type BlendableComponentProps = {
    /**
     * The position at which this blendable component will be rendered.
     */
    pos: [number, number, number];

    /**
     * The axis defining the 'front' of this blendable component.
     * Acts as the normal for flare textures, or the direction of the beam.
     */
    axis: [number, number, number];

    /**
     * The height of the flare to render.
     */
    flareHeight: number;

    /**
     * The width of the flare to render.
     */
    flareWidth: number;

    /**
     * The diameter of the beam to render.
     */
    beamDiameter: number;

    /**
     * The length of the beam to render.
     */
    beamLength: number;
}

export type LightProps = {
    /**
     * The name of the object in the model this light definition acts on.
     */
    objectName: string;

    /**
     * If true, this light renders a solid-color of light when on.
     * If false, only the texture will light up.
     * Does not affect rendering of blendableComponents.
     */
    emissive: boolean;

    /**
     * If true, a glass cover is rendered over this light.
     * The cover will light up with the light.
     */
    covered: boolean;

    /**
     * If true, this light is treated as a beam and will do beam-blending.
     * Useful for creating custom beam shapes.
     */
    isBeam: boolean;

    /**
     * If true, the light automatically dims relative to the electric power
     * of the entity it is on. Should normally be true to prevent lights
     * from remaining on with a dead battery.
     * Multiplies the final brightness value from `brightnessAnimations`.
     */
    isElectric: boolean;

    /**
     * The color of this light. Required for emissive lights and lights with
     * blendableComponents. May be overridden by a rotation-type brightnessAnimation.
     */
    color: MTSColor;

    /**
     * Animations that determine the brightness (and optionally color) of this light.
     *
     * Brightness animation behaviour (starts at 0):
     * - Visibility:      turns the light on or off.
     * - Translation y:   C + yV  (adds variable value to brightness)
     * - Translation x:   C * xV  (multiplies brightness by variable value)
     * - Translation z:   zV      (sets brightness, overriding prior operations)
     * - Inhibitor/Activator: work as in normal animations.
     *
     * Color animation behaviour (rotation type):
     * - Sets RGB color via the XYZ axis parameters (0.0–1.0 maps to 0–255).
     * - Variable value is multiplied by itself, allowing gradual color changes.
     * - All rotation animations are summed and clamped to 1.0 per channel.
     * - Supports offsets for individual R, G, B control across multiple blocks.
     * - Overrides the `color` parameter.
     *
     * NOTE: A set of animations that only multiply will result in multiplying
     * by 0 (since brightness starts at 0), producing a light that never shows.
     * Leaving this empty results in a light always on at 100% brightness.
     */
    brightnessAnimations: Partial<AnimationProps>[];

    /**
     * A list of blendable components for this light.
     * Used to define multiple flares or beams for a single light object.
     */
    blendableComponents: Partial<BlendableComponentProps>[];
}

export class Light extends JSONDefs {

    objectName?: string;
    emissive?: boolean;
    covered?: boolean;
    isBeam?: boolean;
    isElectric?: boolean;
    color?: MTSColor;
    brightnessAnimations?: Partial<AnimationProps>[];
    blendableComponents?: Partial<BlendableComponentProps>[];

    constructor(properties: Partial<LightProps>) {
        super();
        this.objectName          = properties.objectName;
        this.emissive            = properties.emissive;
        this.covered             = properties.covered;
        this.isBeam              = properties.isBeam;
        this.isElectric          = properties.isElectric;
        this.color               = properties.color;
        this.brightnessAnimations = properties.brightnessAnimations;
        this.blendableComponents = properties.blendableComponents;
    }

    override toJSON(version: Versions): object {
        return {
            lightObjects: {
                objectName:          this.objectName,
                emissive:            this.emissive,
                covered:             this.covered,
                isBeam:              this.isBeam,
                isElectric:          this.isElectric,
                color:               this.color,
                brightnessAnimations: this.brightnessAnimations,
                blendableComponents: this.blendableComponents,
            }
        };
    }

}