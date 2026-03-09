//! REVIEW INCOMPLETE

import { JSONDefs, type Versions } from "./json";
import { type AnimationVariable } from "./animationVariables";

export enum ConditionType {
    /**
     * True if `input` > 0
     */
    Active      = "active",

    /**
     * True if `input` == `parameter1`
     */
    Match       = "match",

    /**
     * True if `input` == `variable1`
     */
    MatchVar    = "match_var",

    /**
     * True if `input` > `parameter1`
     */
    Greater     = "greater",

    /**
     * True if `input` > `variable1`
     */
    GreaterVar  = "greater_var",

    /**
     * True if `input` > `parameter1` AND `input` < `parameter2`
     */
    Bounds      = "bounds",

    /**
     * True if `input` > `variable1` AND `input` < `variable2`
     */
    BoundsVar   = "bounds_var",

    /**
     * True if at least one entry in `conditions` is true
     */
    Conditions  = "conditions",
}

export type ConditionProps = {
    /**
     * The type of condition to evaluate.
     */
    type: ConditionType;

    /**
     * The input variable to evaluate.
     * May be prefixed with `#` to indicate a constant value (e.g. `#5`).
     */
    input: AnimationVariable | (string & {});

    /**
     * A variable compared against `input`.
     * Used by: `match_var`, `greater_var`, `bounds_var`.
     */
    variable1: AnimationVariable;

    /**
     * A second variable compared against `input` as the upper bound.
     * Used by: `bounds_var`.
     */
    variable2: AnimationVariable;

    /**
     * A constant value compared against `input`.
     * Used by: `match`, `greater`, `bounds`.
     */
    parameter1: number;

    /**
     * A second constant value used as the upper bound compared against `input`.
     * Used by: `bounds`.
     */
    parameter2: number;

    /**
     * A list of sub-conditions to evaluate.
     * Only used when `type` is `ConditionType.Conditions`.
     * True if at least one entry is true.
     */
    conditions: Partial<ConditionProps>[];

    /**
     * If true, inverts the result of this condition.
     */
    invert: boolean;
}

export class Condition extends JSONDefs {

    type?: ConditionType;
    input?: AnimationVariable | (string & {});
    variable1?: AnimationVariable;
    variable2?: AnimationVariable;
    parameter1?: number;
    parameter2?: number;
    conditions?: Partial<ConditionProps>[];
    invert?: boolean;

    constructor(properties: Partial<ConditionProps>) {
        super();
        this.type       = properties.type;
        this.input      = properties.input;
        this.variable1  = properties.variable1;
        this.variable2  = properties.variable2;
        this.parameter1 = properties.parameter1;
        this.parameter2 = properties.parameter2;
        this.conditions = properties.conditions;
        this.invert     = properties.invert;
    }

    override toJSON(version: Versions): object {
        return {
            conditions: {
                type:       this.type,
                input:      this.input,
                variable1:  this.variable1,
                variable2:  this.variable2,
                parameter1: this.parameter1,
                parameter2: this.parameter2,
                conditions: this.conditions,
                invert:     this.invert,
            }
        };
    }
}