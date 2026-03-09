//! REVIEW INCOMPLETE

import { JSONDefs, type Versions } from "./json";
import { type AnimationVariable } from "./animationVariables";

export enum ActionType {
    /**
     * Toggles the variable between 0 and 1.
     */
    Toggle    = "toggle",

    /**
     * Sets the variable to `value`.
     */
    Set       = "set",

    /**
     * Increments the variable by `value`.
     * Respects `clampMin` and `clampMax`.
     */
    Increment = "increment",

    /**
     * Sets the variable to `value` while the action conditions are true.
     * Resets to 0 when conditions become false (e.g. releasing a button).
     */
    Button    = "button",
}

export type ActionProps = {
    /**
     * The type of action to perform.
     */
    action: ActionType;

    /**
     * The variable to perform the action on.
     */
    variable: AnimationVariable;

    /**
     * The value to use in the action.
     */
    value: number;

    /**
     * The minimum value this action can set the variable to.
     * Only used when `action` is `ActionType.Increment`.
     */
    clampMin: number;

    /**
     * The maximum value this action can set the variable to.
     * Only used when `action` is `ActionType.Increment`.
     */
    clampMax: number;
}

export class Action extends JSONDefs {

    action?: ActionType;
    variable?: AnimationVariable;
    value?: number;
    clampMin?: number;
    clampMax?: number;

    constructor(properties: Partial<ActionProps>) {
        super();
        this.action   = properties.action;
        this.variable = properties.variable;
        this.value    = properties.value;
        this.clampMin = properties.clampMin;
        this.clampMax = properties.clampMax;
    }

    override toJSON(version: Versions): object {
        return {
            actions: {
                action:   this.action,
                variable: this.variable,
                value:    this.value,
                clampMin: this.clampMin,
                clampMax: this.clampMax,
            }
        };
    }

}