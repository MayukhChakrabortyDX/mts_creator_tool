//! REVIEW INCOMPLETE

import { JSONDefs, type Versions } from "./json";
import { type AnimationProps } from "./animation";
import { type TextObjectProps } from "./textObject";
import { type GeneralProps } from "./general";

// =============================================================================
// Component
// =============================================================================

export type InstrumentComponentProps = {
    /**
     * The X center position to render this component at, relative to the
     * instrument center. Negative values shift left, positive shift right.
     * Defaults to the instrument center if omitted.
     */
    xCenter: number;

    /**
     * The Y center position to render this component at, relative to the
     * instrument center. Positive values shift down (instrument Y aligns with
     * texture-sheet Y, so +Y = down).
     * Defaults to the instrument center if omitted.
     */
    yCenter: number;

    /**
     * The scale to render this component at. Defaults to 1.0 if omitted.
     */
    scale: number;

    /**
     * The X center of the source texture region on the texture sheet, in pixels.
     */
    textureXCenter: number;

    /**
     * The Y center of the source texture region on the texture sheet, in pixels.
     */
    textureYCenter: number;

    /**
     * The width of the source texture region to render, in pixels.
     */
    textureWidth: number;

    /**
     * The height of the source texture region to render, in pixels.
     */
    textureHeight: number;

    /**
     * Optional text object for this component.
     * If set, texture rendering is suppressed and text is rendered instead,
     * using the parameters from this object.
     * Scale: 1px of text = 1px of instrument texture.
     */
    textObject: Partial<TextObjectProps>;

    /**
     * Multiplied against the value returned by the `textObject`'s `fieldName`
     * before displaying it. Has no effect if `textObject` is not set.
     */
    textFactor: number;

    /**
     * Animations applied to this component.
     *
     * Instrument animations are 2D only:
     * - Rotation:    Z-axis only (counter-clockwise, Right-Hand Rule).
     * - Translation: X and Y axes only. +Y is downward (matches texture-sheet Y).
     *
     * If `rotateWindow` is true, the texture sample window rotates rather than
     * the rendered image. If a non-zero `centerPoint` is set on an animation,
     * the window rotates about that point instead of 0,0.
     *
     * If `extendWindow` is true on a translation animation, MTS changes how
     * much texture is sampled rather than offsetting the sample region —
     * the upper bound of the grabbed texture moves by the translation amount.
     *
     * If `moveComponent` is true on a translation animation, translations move
     * the rendered texture position directly rather than shifting the sample window.
     */
    animations: Partial<AnimationProps>[];

    /**
     * If true, the texture sample window rotates instead of the rendered image.
     * Useful for instruments without a bezel where you want the dial face to
     * rotate inside a fixed aperture.
     * If the animation has a non-zero `centerPoint`, the window rotates about
     * that point rather than 0,0.
     */
    rotateWindow: boolean;

    /**
     * If true, translation animations extend or contract the sampled texture
     * region rather than offsetting it. The upper bound of the sampled area
     * moves by the translation amount.
     */
    extendWindow: boolean;

    /**
     * If true, translation animations move the rendered texture position
     * instead of shifting the texture sample window. The sample window stays
     * fixed; only where it is drawn on screen changes.
     */
    moveComponent: boolean;

    /**
     * If true, this component brightens when the vehicle's lights are on.
     * Useful for faux instrument backlighting when combined with overlays.
     */
    lightUpTexture: boolean;

    /**
     * If true, this component is rendered as an overlay, blending with
     * whatever is drawn beneath it. Useful for glass effects and lighting hues.
     * Can be combined with `lightUpTexture` for a localised dash-light effect.
     */
    overlayTexture: boolean;
}

// =============================================================================
// Instrument
// =============================================================================

export type InstrumentProps = {
    /**
     * The texture sheet to source instrument graphics from.
     * Defaults to `instruments.png` in the main textures folder if omitted.
     * Sub-folders are permitted. MTS expects a 1024×1024 PNG — other
     * resolutions are used at your own risk.
     * Format: textures/path/to/sheet.png (relative to pack textures folder)
     */
    textureName: string;

    /**
     * Inherited general section (name, description, materials, etc.).
     */
    general: Partial<GeneralProps>;

    /**
     * The list of components that make up this instrument.
     * MTS renders them in order, so later components appear on top of earlier ones.
     */
    components: Partial<InstrumentComponentProps>[];
}

export class Instrument extends JSONDefs {

    textureName?: string;
    general?: Partial<GeneralProps>;
    components?: Partial<InstrumentComponentProps>[];

    constructor(properties: Partial<InstrumentProps>) {
        super();
        this.textureName = properties.textureName;
        this.general     = properties.general;
        this.components  = properties.components;
    }

    override toJSON(version: Versions): object {
        return {
            textureName: this.textureName,
            general:     this.general,
            components:  this.components,
        };
    }

}