//! REVIEW INCOMPLETE

import { JSONDefs, type Versions } from "./json";
import { type AnimationVariable } from "./animationVariables";
import { type ConditionProps } from "./conditions";

export enum ValueModifierType {
    /**
     * output = input
     */
    Set      = "set",

    /**
     * output = value + input
     */
    Add      = "add",

    /**
     * output = value - input
     */
    Subtract = "subtract",

    /**
     * output = value * input
     */
    Multiply = "multiply",

    /**
     * output = value / input
     */
    Divide   = "divide",

    /**
     * output = input * parameter1 + parameter2
     */
    Linear   = "linear",

    /**
     * output = parameter1 * (input * parameter2 - parameter3)^2 + parameter4
     */
    Parabolic = "parabolic",

    /**
     * If all `conditions` are true, runs `trueCode`, else runs `falseCode`.
     */
    Conditions = "conditions",
}

export type ValueModifierProps = {
    /**
     * The type of operation to perform.
     */
    type: ValueModifierType;

    /**
     * The input variable for this modifier.
     * May be prefixed with `#` to indicate a constant value (e.g. `#5`).
     */
    input: AnimationVariable | (string & {});

    /**
     * A constant value used by `linear` and `parabolic` types.
     * - linear:    output = input * parameter1 + parameter2
     * - parabolic: output = parameter1 * (input * parameter2 - parameter3)^2 + parameter4
     */
    parameter1: number;

    /**
     * A constant value used by `linear` and `parabolic` types.
     * - linear:    output = input * parameter1 + parameter2
     * - parabolic: output = parameter1 * (input * parameter2 - parameter3)^2 + parameter4
     */
    parameter2: number;

    /**
     * A constant value used by `parabolic` type only.
     * output = parameter1 * (input * parameter2 - parameter3)^2 + parameter4
     */
    parameter3: number;

    /**
     * A constant value used by `parabolic` type only.
     * output = parameter1 * (input * parameter2 - parameter3)^2 + parameter4
     */
    parameter4: number;

    /**
     * A list of conditions to evaluate.
     * Only used when `type` is `ValueModifierType.Conditions`.
     * If all conditions are true, `trueCode` is run, otherwise `falseCode` is run.
     */
    conditions: Partial<ConditionProps>[];

    /**
     * A list of value modifiers to run if all `conditions` are true.
     * Only used when `type` is `ValueModifierType.Conditions`.
     */
    trueCode: Partial<ValueModifierProps>[];

    /**
     * A list of value modifiers to run if any `conditions` are false.
     * Only used when `type` is `ValueModifierType.Conditions`.
     */
    falseCode: Partial<ValueModifierProps>[];
}

export class ValueModifier extends JSONDefs {

    type?: ValueModifierType;
    input?: AnimationVariable | (string & {});
    parameter1?: number;
    parameter2?: number;
    parameter3?: number;
    parameter4?: number;
    conditions?: Partial<ConditionProps>[];
    trueCode?: Partial<ValueModifierProps>[];
    falseCode?: Partial<ValueModifierProps>[];

    constructor(properties: Partial<ValueModifierProps>) {
        super();
        this.type       = properties.type;
        this.input      = properties.input;
        this.parameter1 = properties.parameter1;
        this.parameter2 = properties.parameter2;
        this.parameter3 = properties.parameter3;
        this.parameter4 = properties.parameter4;
        this.conditions = properties.conditions;
        this.trueCode   = properties.trueCode;
        this.falseCode  = properties.falseCode;
    }

    override toJSON(version: Versions): object {
        return {
            valueModifiers: {
                type:       this.type,
                input:      this.input,
                parameter1: this.parameter1,
                parameter2: this.parameter2,
                parameter3: this.parameter3,
                parameter4: this.parameter4,
                conditions: this.conditions,
                trueCode:   this.trueCode,
                falseCode:  this.falseCode,
            }
        };
    }

}