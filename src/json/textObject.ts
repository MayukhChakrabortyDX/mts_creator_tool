//! REVIEW INCOMPLETE

import { JSONDefs, type Versions } from "./json";
import { type MTSColor } from "./color";

export enum TextRenderPosition {
    /**
     * Centered text. `pos` is the top-center anchor point.
     */
    Center = 0,

    /**
     * Left-aligned text. `pos` is the top-left anchor point.
     */
    Left = 1,

    /**
     * Right-aligned text. `pos` is the top-right anchor point.
     */
    Right = 2,
}

export type TextObjectProps = {
    /**
     * The x,y,z center point where this text renders.
     * Exact anchor behaviour depends on `renderPosition`.
     */
    pos: [number, number, number];

    /**
     * The x,y,z rotations applied to this text.
     * By default all text faces +z on the model.
     */
    rot: [number, number, number];

    /**
     * The scale of the text.
     * A scale of 1.0 renders text approximately ½ block high
     * (1 text character pixel = 1 block texture pixel, text is 8 pixels high).
     * For custom fonts, the entire square will be ½ block high at scale 1.
     */
    scale: number;

    /**
     * The name of this text field.
     * Fields sharing the same name are combined in the text GUI into one entry —
     * editing one will affect all fields with the same name.
     * Useful for license plates and route signs spanning multiple objects.
     */
    fieldName: string;

    /**
     * If set, this text field displays the value of this animation variable
     * and is not editable by players.
     * Mainly useful for instruments but may be used on 3D models.
     */
    variableName: string;

    /**
     * A factor applied to the variable value before formatting.
     * Has no effect unless `variableName` and `variableFormat` are also set.
     * Not used for text-based variables.
     */
    variableFactor: number;

    /**
     * The format string used to display the variable value.
     * Follows Java's String.format() syntax:
     * - Floating-point variables: use `%f` format specifiers.
     * - Text variables: use `%s` format specifiers.
     * Must be set alongside `variableName` for any effect.
     */
    variableFormat: string;

    /**
     * An offset applied to the value returned by this text object.
     * Behaves like animation offsets.
     */
    variableOffset: number;

    /**
     * The default text displayed when the model is first placed.
     * Persists until changed by a player. Required, but may be blank.
     */
    defaultText: string;

    /**
     * The maximum number of characters this text field can contain.
     */
    maxLength: number;

    /**
     * The color of this text.
     */
    color: MTSColor;

    /**
     * If set, this text inherits its color from the definition section's
     * `secondaryTextColors` list at the specified index, if one exists.
     */
    inheritedColorIndex: number;

    /**
     * If set, this text is treated as part of the specified Animated Model Object
     * and will always offset itself to maintain the same relative position.
     * Useful for text on doors, trunks, or any moving object.
     */
    attachedTo: string;

    /**
     * If true, this text will light up when the model is lit.
     */
    lightsUp: boolean;

    /**
     * The alignment and anchor mode for this text.
     * See `TextRenderPosition` for details.
     */
    renderPosition: TextRenderPosition;

    /**
     * If true, text will be auto-scaled to fit within `wrapWidth` rather than
     * wrapping to a new line. Has no effect unless `wrapWidth` is also set.
     */
    autoScale: boolean;

    /**
     * If set, text will automatically wrap once it reaches this pixel width.
     * Note: scaled text still wraps based on the non-scaled pixel width —
     * adjust `wrapWidth` accordingly if scaling is applied.
     */
    wrapWidth: number;

    /**
     * An optional custom font to use for this field.
     * Format: `packID:fontname`
     * Font files are located at:
     * `assets/packID/textures/fonts/fontname/unicode_page_xx.png`
     * where `xx` corresponds to the default Minecraft font page being replaced.
     * Font PNG files should be divided into an even grid of equal squares.
     */
    fontName: string;
}

export class TextObject extends JSONDefs {

    pos?: [number, number, number];
    rot?: [number, number, number];
    scale?: number;
    fieldName?: string;
    variableName?: string;
    variableFactor?: number;
    variableFormat?: string;
    variableOffset?: number;
    defaultText?: string;
    maxLength?: number;
    color?: MTSColor;
    inheritedColorIndex?: number;
    attachedTo?: string;
    lightsUp?: boolean;
    renderPosition?: TextRenderPosition;
    autoScale?: boolean;
    wrapWidth?: number;
    fontName?: string;

    constructor(properties: Partial<TextObjectProps>) {
        super();
        this.pos                = properties.pos;
        this.rot                = properties.rot;
        this.scale              = properties.scale;
        this.fieldName          = properties.fieldName;
        this.variableName       = properties.variableName;
        this.variableFactor     = properties.variableFactor;
        this.variableFormat     = properties.variableFormat;
        this.variableOffset     = properties.variableOffset;
        this.defaultText        = properties.defaultText;
        this.maxLength          = properties.maxLength;
        this.color              = properties.color;
        this.inheritedColorIndex = properties.inheritedColorIndex;
        this.attachedTo         = properties.attachedTo;
        this.lightsUp           = properties.lightsUp;
        this.renderPosition     = properties.renderPosition;
        this.autoScale          = properties.autoScale;
        this.wrapWidth          = properties.wrapWidth;
        this.fontName           = properties.fontName;
    }

    override toJSON(version: Versions): object {
        return {
            textObjects: {
                pos:                this.pos,
                rot:                this.rot,
                scale:              this.scale,
                fieldName:          this.fieldName,
                variableName:       this.variableName,
                variableFactor:     this.variableFactor,
                variableFormat:     this.variableFormat,
                variableOffset:     this.variableOffset,
                defaultText:        this.defaultText,
                maxLength:          this.maxLength,
                color:              this.color,
                inheritedColorIndex: this.inheritedColorIndex,
                attachedTo:         this.attachedTo,
                lightsUp:           this.lightsUp,
                renderPosition:     this.renderPosition,
                autoScale:          this.autoScale,
                wrapWidth:          this.wrapWidth,
                fontName:           this.fontName,
            }
        };
    }

}