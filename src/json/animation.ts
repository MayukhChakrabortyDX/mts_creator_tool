import type { Expand } from "../util";
import { JSONBase } from "./base";
import type { Point3d } from "./text";

export enum AnimationType {
    Translation = "translation",
    Rotation = "rotation",
    Scaling = "scaling",
    Visibility = "visibility",
    Inhibitor = "inhibitor",
    Activator = "activator",
}

export enum AnimationEasingType {
    Linear = "linear",
    EaseInSine = "easeinsine",
    EaseOutSine = "easeoutsine",
    EaseInOutSine = "easeinoutsine",
    EaseInQuad = "easeinquad",
    EaseOutQuad = "easeoutquad",
    EaseInOutQuad = "easeinoutquad",
    EaseInCubic = "easeincubic",
    EaseOutCubic = "easeoutcubic",
    EaseInOutCubic = "easeinoutcubic",
    EaseInQuart = "easeinquart",
    EaseOutQuart = "easeoutquart",
    EaseInOutQuart = "easeinoutquart",
    EaseInQuint = "easeinquint",
    EaseOutQuint = "easeoutquint",
    EaseInOutQuint = "easeinoutquint",
    EaseInCirc = "easeincirc",
    EaseOutCirc = "easeoutcirc",
    EaseInOutCirc = "easeinoutcirc",
    EaseInBack = "easeinback",
    EaseOutBack = "easeoutback",
    EaseInOutBack = "easeinoutback",
    EaseInElastic = "easeinelastic",
    EaseOutElastic = "easeoutelastic",
    EaseInOutElastic = "easeinoutelastic",
    EaseInBounce = "easeinbounce",
    EaseOutBounce = "easeoutbounce",
    EaseInOutBounce = "easeinoutbounce"
}

type AnimationJSONPropsBase = {
    variable: string;
    offset?: number;
    absolute?: boolean;
    invert?: boolean;
    duration?: number;
    forwardsEasing?: AnimationEasingType;
    reverseEasing?: AnimationEasingType;
    forwardsDelay?: number;
    reverseDelay?: number;
    skipForwardsMovement?: boolean;
    skipReverseMovement?: boolean;
    forwardsStartSound?: string;
    forwardsEndSound?: string;
    reverseStartSound?: string;
    reverseEndSound?: string;
};

export type AnimationJSONProps =
    | (AnimationJSONPropsBase & {
        animationType: AnimationType.Rotation | AnimationType.Scaling;
        centerPoint: Point3d;  // required
        axis: Point3d;         // required
        clampMin?: number;
        clampMax?: number;
    })
    | (AnimationJSONPropsBase & {
        animationType: AnimationType.Translation;
        centerPoint?: Point3d;
        axis: Point3d;         // required
        clampMin?: number;
        clampMax?: number;
    })
    | (AnimationJSONPropsBase & {
        animationType: AnimationType.Visibility;
        centerPoint?: Point3d;
        axis?: Point3d;
        clampMin: number;      // required
        clampMax: number;      // required
    })
    | (AnimationJSONPropsBase & {
        animationType: AnimationType.Inhibitor | AnimationType.Activator;
        centerPoint?: Point3d;
        axis?: Point3d;
        clampMin?: number;
        clampMax?: number;
    });

export class AnimationJSON extends JSONBase {

    constructor(public props: Expand<AnimationJSONProps>) {
        super()
    }

    override toJSON() {
        return {
            ...this.stripUndefined(this.props)
        }
    }

}