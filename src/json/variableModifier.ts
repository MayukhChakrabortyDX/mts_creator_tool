//! REVIEW INCOMPLETE

import { JSONDefs, type Versions } from "./json";
import { type AnimationVariable } from "./animationVariables";
import { type AnimationProps } from "./animation";

export type VariableModifierProps = {
    /**
     * The variable to modify. Only variables marked with * in the animation variables
     * list are valid targets (motorized variables, part variables, and most animation variables).
     */
    variable: AnimationVariable;

    /**
     * The value to add to the variable.
     */
    addValue: number;

    /**
     * Sets the variable to this value, overriding both the current value and `addValue`.
     * Does NOT override supplemental translation animations applied on top.
     */
    setValue: number;

    /**
     * The minimum value the variable can be assigned, applied after all operations complete.
     */
    minValue: number;

    /**
     * The maximum value the variable can be assigned, applied after all operations complete.
     */
    maxValue: number;

    /**
     * Animations that determine the value to apply to the variable.
     * Valid animationTypes are: rotation, translation, visibility, inhibitor, activator.
     *
     * Translation axis behaviour (C = running total, V = variable value):
     * - [x, 0, 0]  → C * xV
     * - [0, y, 0]  → C + yV
     * - [0, 0, z]  → zV  (overrides all prior operations)
     * - [x, y, 0]  → C * (xV)^y
     * - [0, y, z]  → C + (yV)^z
     *
     * Rotation behaviour: C * (xsin(V+X) + ycos(V+Y) + ztan(V+Z))
     * where [x,y,z] is the axis, [X,Y,Z] is the centerPoint, and V is the variable value.
     * Add `inverted: true` to inverse the trig functions.
     *
     * Visibility: completely disables the modifier if false.
     * Inhibitor / Activator: same behaviour as in normal animations.
     */
    animations: (Partial<AnimationProps> & { inverted?: boolean })[];
}

export class VariableModifier extends JSONDefs {

    variable?: AnimationVariable;
    addValue?: number;
    setValue?: number;
    minValue?: number;
    maxValue?: number;
    animations?: (Partial<AnimationProps> & { inverted?: boolean })[];

    constructor(properties: Partial<VariableModifierProps>) {
        super();
        this.variable   = properties.variable;
        this.addValue   = properties.addValue;
        this.setValue   = properties.setValue;
        this.minValue   = properties.minValue;
        this.maxValue   = properties.maxValue;
        this.animations = properties.animations;
    }

    override toJSON(version: Versions): object {
        return {
            variableModifiers: {
                variable:   this.variable,
                addValue:   this.addValue,
                setValue:   this.setValue,
                minValue:   this.minValue,
                maxValue:   this.maxValue,
                animations: this.animations,
            }
        };
    }

}