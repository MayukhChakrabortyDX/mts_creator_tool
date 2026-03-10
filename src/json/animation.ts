//! REVIEW INCOMPLETE

import { JSONDefs, type Versions } from "./json";
import { type AnimationVariable } from "./animationVariables";
import type { Expand } from "../utils/expand";

export enum EasingType {
    Linear = "linear",

    // Ease In
    EaseInSine      = "easeinsine",
    EaseInQuad      = "easeinquad",
    EaseInCubic     = "easeincubic",
    EaseInQuart     = "easeinquart",
    EaseInQuint     = "easeinquint",
    EaseInCirc      = "easeincirc",
    EaseInBack      = "easeinback",
    EaseInElastic   = "easeinelastic",
    EaseInBounce    = "easeinbounce",

    // Ease Out
    EaseOutSine     = "easeoutsine",
    EaseOutQuad     = "easeoutquad",
    EaseOutCubic    = "easeoutcubic",
    EaseOutQuart    = "easeoutquart",
    EaseOutQuint    = "easeoutquint",
    EaseOutCirc     = "easeoutcirc",
    EaseOutBack     = "easeoutback",
    EaseOutElastic  = "easeoutelastic",
    EaseOutBounce   = "easeoutbounce",

    // Ease In Out
    EaseInOutSine    = "easeinoutsine",
    EaseInOutQuad    = "easeinoutquad",
    EaseInOutCubic   = "easeinoutcubic",
    EaseInOutQuart   = "easeinoutquart",
    EaseInOutQuint   = "easeinoutquint",
    EaseInOutCirc    = "easeinoutcirc",
    EaseInOutBack    = "easeinoutback",
    EaseInOutElastic = "easeinoutelastic",
    EaseInOutBounce  = "easeinoutbounce",
}

export enum AnimationType {
    Rotation    = "rotation",
    Translation = "translation",
    Scaling     = "scaling",
    Visibility  = "visibility",
    Inhibitor   = "inhibitor",
    Activator   = "activator",
}

export type AnimationProps = {
    /**
     * The type of animation to perform.
     * - `Rotation`    — Rotates around `centerPoint` along `axis` (counter-clockwise, Right-Hand Rule).
     * - `Translation` — Translates in the direction of `axis`.
     * - `Scaling`     — Scales along the three axes defined by `axis`, centered on `centerPoint`.
     * - `Visibility`  — Shows/hides based on clamp range.
     * - `Inhibitor`   — Blocks all subsequent animations if clamp criteria are met.
     * - `Activator`   — Negates a previous inhibitor if clamp criteria are met.
     */
    animationType: AnimationType;

    /**
     * The animation variable to read from.
     * Must follow the Animation Hierarchy rules:
     * - Suffix _N to target the Nth part (e.g. engine_rotation_2).
     * - Prefix parent_ to walk up to the parent part.
     * - Prefix vehicle_ to reference the vehicle the part is on.
     * - Prefix ! to invert the value (0 becomes 1, non-zero becomes 0).
     */
    variable: AnimationVariable;

    /**
     * The x,y,z position used as the rotation point (Rotation) or scale center (Scaling).
     * Not used for Translation, Inhibitor, or Activator types and may be omitted.
     */
    centerPoint: [number, number, number];

    /**
     * The vector about which this animation operates.
     * - Rotation:    The axis to rotate around (counter-clockwise / Right-Hand Rule).
     *                Multiply by a factor to increase the rotation amount.
     *                For complex 3-axis rotation, calculate as: delta[X,Y,Z] / totalDistance.
     * - Translation: The direction to translate in. Multiply to increase distance.
     * - Scaling:     The per-axis scale factors to apply.
     * - Visibility / Inhibitor / Activator: Not used.
     */
    axis: [number, number, number];

    /**
     * An offset added to the animation value after axis multiplication.
     */
    offset: number;

    /**
     * The lower bound for the animation value (variable * axis + offset).
     * For Visibility, Inhibitor, and Activator: the lowest value at which the animation is active.
     */
    clampMin: number;

    /**
     * The upper bound for the animation value (variable * axis + offset).
     * For Visibility, Inhibitor, and Activator: the highest value at which the animation is active.
     */
    clampMax: number;

    /**
     * If true, uses the absolute value of the variable.
     * Negative movement is still possible via a negative axis factor or large negative offset.
     */
    absolute: boolean;

    /**
     * Duration of this animation in ticks. Causes interpolation for smooth movement.
     * Required for easing and delay parameters to have any effect.
     */
    duration: number;

    /**
     * Easing curve applied when the animation plays forwards. Requires `duration` to be set.
     * Defaults to `EasingType.Linear`. Preview curves at easings.net.
     */
    forwardsEasing: EasingType;

    /**
     * Easing curve applied when the animation plays in reverse. Requires `duration` to be set.
     * Defaults to `EasingType.Linear`.
     */
    reverseEasing: EasingType;

    /**
     * How long to wait after the variable goes to 1 before starting the forwards animation, in ticks.
     */
    forwardsDelay: number;

    /**
     * How long to wait after the variable goes to 0 before starting the reverse animation, in ticks.
     */
    reverseDelay: number;

    /**
     * If true, instantly jumps to the end of the forwards animation, skipping movement time.
     * Does not skip `forwardsDelay`. Voids any `reverseDelay`.
     */
    skipForwardsMovement: boolean;

    /**
     * If true, instantly jumps to the end of the reverse animation, skipping movement time.
     */
    skipReverseMovement: boolean;

    /**
     * Sound to play when the forwards animation begins (at the start of duration, not delay).
     * Format: packID:soundName
     */
    forwardsStartSound: string;

    /**
     * Sound to play when the forwards animation completes.
     * Will not play if the animation reverses before completing.
     * Format: packID:soundName
     */
    forwardsEndSound: string;

    /**
     * Sound to play when the reverse animation begins. Format: packID:soundName
     */
    reverseStartSound: string;

    /**
     * Sound to play when the reverse animation completes. Format: packID:soundName
     */
    reverseEndSound: string;
}

export class Animation extends JSONDefs {

    animationType?: AnimationType;
    variable?: AnimationVariable;
    centerPoint?: [number, number, number];
    axis?: [number, number, number];
    offset?: number;
    clampMin?: number;
    clampMax?: number;
    absolute?: boolean;
    duration?: number;
    forwardsEasing?: EasingType;
    reverseEasing?: EasingType;
    forwardsDelay?: number;
    reverseDelay?: number;
    skipForwardsMovement?: boolean;
    skipReverseMovement?: boolean;
    forwardsStartSound?: string;
    forwardsEndSound?: string;
    reverseStartSound?: string;
    reverseEndSound?: string;

    constructor(properties: Expand<Partial<AnimationProps>>) {
        super();
        this.animationType       = properties.animationType;
        this.variable            = properties.variable;
        this.centerPoint         = properties.centerPoint;
        this.axis                = properties.axis;
        this.offset              = properties.offset;
        this.clampMin            = properties.clampMin;
        this.clampMax            = properties.clampMax;
        this.absolute            = properties.absolute;
        this.duration            = properties.duration;
        this.forwardsEasing      = properties.forwardsEasing;
        this.reverseEasing       = properties.reverseEasing;
        this.forwardsDelay       = properties.forwardsDelay;
        this.reverseDelay        = properties.reverseDelay;
        this.skipForwardsMovement = properties.skipForwardsMovement;
        this.skipReverseMovement  = properties.skipReverseMovement;
        this.forwardsStartSound  = properties.forwardsStartSound;
        this.forwardsEndSound    = properties.forwardsEndSound;
        this.reverseStartSound   = properties.reverseStartSound;
        this.reverseEndSound     = properties.reverseEndSound;
    }

    override toJSON(version: Versions): object {
        return {
            animations: {
                animationType:        this.animationType,
                variable:             this.variable,
                centerPoint:          this.centerPoint,
                axis:                 this.axis,
                offset:               this.offset,
                clampMin:             this.clampMin,
                clampMax:             this.clampMax,
                absolute:             this.absolute,
                duration:             this.duration,
                forwardsEasing:       this.forwardsEasing,
                reverseEasing:        this.reverseEasing,
                forwardsDelay:        this.forwardsDelay,
                reverseDelay:         this.reverseDelay,
                skipForwardsMovement: this.skipForwardsMovement,
                skipReverseMovement:  this.skipReverseMovement,
                forwardsStartSound:   this.forwardsStartSound,
                forwardsEndSound:     this.forwardsEndSound,
                reverseStartSound:    this.reverseStartSound,
                reverseEndSound:      this.reverseEndSound,
            }
        };
    }

}