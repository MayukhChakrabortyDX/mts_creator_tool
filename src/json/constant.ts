//! REVIEW INCOMPLETE

import { JSONDefs, type Versions } from "./json";

export type ConstantValuesProps = {
    /**
     * A map of custom variable names to their constant numeric values.
     *
     * Each entry sets the named variable to the given value when the entity
     * is placed. The variable may be modified at runtime, but will reset to
     * this value the next time the entity is picked up and re-placed.
     *
     * Variable names here should match those declared in `customVariables`
     * on the rendering section, or any other variable the pack wishes to
     * initialise with a known default.
     *
     * @example
     * {
     *   "unuisbest":    1,
     *   "frame_tread":  2.6875,
     *   "frame_width":  0.875,
     *   "hideAirLine":  1,
     * }
     */
    [variable: string]: number;
}

export class ConstantValues extends JSONDefs {

    values: ConstantValuesProps;

    constructor(values: ConstantValuesProps) {
        super();
        this.values = values;
    }

    override toJSON(version: Versions): object {
        return {
            constantValues: this.values,
        };
    }

}