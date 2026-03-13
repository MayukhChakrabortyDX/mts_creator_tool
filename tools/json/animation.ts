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

export type AnimationJSONProps = {
    variable: string;
    animationType: AnimationType;
    centerPoint?: Point3d;
    axis?: Point3d;
    offset?: number;
    clampMin?: number;
    clampMax?: number;
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

export class AnimationJSON extends JSONBase {

    constructor(public props: Expand<AnimationJSONProps>) {
        super();

        const { animationType, centerPoint, axis, clampMin, clampMax } = props;

        if (animationType === AnimationType.Rotation || animationType === AnimationType.Scaling) {
            if (centerPoint == undefined) {
                throw new Error(`centerPoint is required in AnimationJSON when animationType is ${animationType}`);
            }
            if (axis == undefined) {
                throw new Error(`axis is required in AnimationJSON when animationType is ${animationType}`);
            }
        }

        if (animationType === AnimationType.Translation) {
            if (axis == undefined) {
                throw new Error(`axis is required in AnimationJSON when animationType is ${animationType}`);
            }
        }

        if (animationType === AnimationType.Visibility) {
            if (clampMin == undefined) {
                throw new Error(`clampMin is required in AnimationJSON when animationType is ${animationType}`);
            }
            if (clampMax == undefined) {
                throw new Error(`clampMax is required in AnimationJSON when animationType is ${animationType}`);
            }
        }

        if (props.duration != undefined && !Number.isInteger(props.duration)) {
            throw new Error(`duration in AnimationJSON must be an Integer`);
        }

        if (props.forwardsDelay != undefined && !Number.isInteger(props.forwardsDelay)) {
            throw new Error(`forwardsDelay in AnimationJSON must be an Integer`);
        }

        if (props.reverseDelay != undefined && !Number.isInteger(props.reverseDelay)) {
            throw new Error(`reverseDelay in AnimationJSON must be an Integer`);
        }
    }

    override toJSON() {
        return {
            ...this.stripUndefined(this.props)
        }
    }

}