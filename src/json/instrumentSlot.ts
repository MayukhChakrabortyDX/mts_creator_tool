//! REVIEW INCOMPLETE

import { JSONDefs, type Versions } from "./json";
import { type AnimationProps } from "./animation";

export type InstrumentSlotProps = {
    /**
     * The x,y,z position of the center of this instrument on the object.
     */
    pos: [number, number, number];

    /**
     * The scale of the instrument. Default instruments are 128x128.
     */
    scale: number;

    /**
     * The x,y,z rotation of this instrument.
     * By default all instruments face -z (the rear of the object).
     */
    rot: [number, number, number];

    /**
     * The x-coordinate for the center of this instrument on the HUD, in pixels.
     */
    hudX: number;

    /**
     * The y-coordinate for the center of this instrument on the HUD, in pixels.
     */
    hudY: number;

    /**
     * Like `scale`, but applied on the HUD and Panel instead.
     */
    hudScale: number;

    /**
     * If set, MTS will use this part number for any animation done by this instrument,
     * unless the instrument already has a part number hard-coded.
     * Useful for multi-engine vehicles where each gauge should reference a specific engine.
     * Only applies to part animations — instruments with non-part animations are unaffected.
     */
    optionalPartNumber: number;

    /**
     * If true, moves this instrument to the panel rather than the main HUD.
     * Useful in multi-engine vehicles to avoid cluttering the main HUD.
     */
    placeOnPanel: boolean;

    /**
     * The pack-qualified name of the instrument to place in this slot by default
     * (e.g. "packID:instrumentName"). Normally all slots are empty on first placement.
     * MTS will not verify the instrument exists, so ensure the pack is a dependency
     * if referencing external instruments.
     * Can be combined with an off-screen `hudX`/`hudY` to permanently attach an instrument.
     */
    defaultInstrument: string;

    /**
     * If set, the animations on this slot will first apply the animations for this object
     * from the rendering section (identified by this value) rather than those defined here.
     * Resolved recursively if the referenced object also has an `applyAfter`.
     */
    applyAfter: string;

    /**
     * Animations applied to move this instrument slot.
     * Applied AFTER the instrument is moved to its initial position and rotation —
     * all animation parameters must account for this offset orientation.
     */
    animations: Partial<AnimationProps>[];
}

export class InstrumentSlot extends JSONDefs {

    pos?: [number, number, number];
    scale?: number;
    rot?: [number, number, number];
    hudX?: number;
    hudY?: number;
    hudScale?: number;
    optionalPartNumber?: number;
    placeOnPanel?: boolean;
    defaultInstrument?: string;
    applyAfter?: string;
    animations?: Partial<AnimationProps>[];

    constructor(properties: Partial<InstrumentSlotProps>) {
        super();
        this.pos                = properties.pos;
        this.scale              = properties.scale;
        this.rot                = properties.rot;
        this.hudX               = properties.hudX;
        this.hudY               = properties.hudY;
        this.hudScale           = properties.hudScale;
        this.optionalPartNumber = properties.optionalPartNumber;
        this.placeOnPanel       = properties.placeOnPanel;
        this.defaultInstrument  = properties.defaultInstrument;
        this.applyAfter         = properties.applyAfter;
        this.animations         = properties.animations;
    }

    override toJSON(version: Versions): object {
        return {
            instruments: {
                pos:                this.pos,
                scale:              this.scale,
                rot:                this.rot,
                hudX:               this.hudX,
                hudY:               this.hudY,
                hudScale:           this.hudScale,
                optionalPartNumber: this.optionalPartNumber,
                placeOnPanel:       this.placeOnPanel,
                defaultInstrument:  this.defaultInstrument,
                applyAfter:         this.applyAfter,
                animations:         this.animations,
            }
        };
    }

}