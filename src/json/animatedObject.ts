//! REVIEW INCOMPLETE

import { JSONDefs, type Versions } from "./json";
import { type AnimationProps } from "./animation";

export type AnimatedObjectProps = {
    /**
     * The name of the object in the model this definition acts on.
     * No special naming is required in the model itself, though some systems
     * may require specific names (e.g. translucent objects must include the
     * translucent keyword in their name).
     */
    objectName: string;

    /**
     * If set, this object's animations will be applied directly after the
     * listed object's animations. Useful for attaching objects together so
     * they move as one, and avoids duplicating JSON.
     * Note: does NOT work with animations applied to things other than model
     * objects, such as part movement.
     */
    applyAfter: string;

    /**
     * If set, visibility animations on this object will use blending rather
     * than snapping between invisible and visible.
     * Visibility below `clampMin` is fully invisible; above `clampMax` is
     * fully visible.
     */
    blendedAnimations: boolean;

    /**
     * One or more animations to apply to this object.
     */
    animations: Partial<AnimationProps>[];
}

export class AnimatedObject extends JSONDefs {

    objectName?: string;
    applyAfter?: string;
    blendedAnimations?: boolean;
    animations?: Partial<AnimationProps>[];

    constructor(properties: Partial<AnimatedObjectProps>) {
        super();
        this.objectName        = properties.objectName;
        this.applyAfter        = properties.applyAfter;
        this.blendedAnimations = properties.blendedAnimations;
        this.animations        = properties.animations;
    }

    override toJSON(version: Versions): object {
        return {
            animatedObjects: {
                objectName:        this.objectName,
                applyAfter:        this.applyAfter,
                blendedAnimations: this.blendedAnimations,
                animations:        this.animations,
            }
        };
    }

}