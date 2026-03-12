import type { Expand } from "../util";
import { JSONBase } from "./base";

export type VariableModifierJSONProps = {
    variable: string;
    addValue?: number;
    setValue?: number;
    minValie?: number;
    maxValue?: number;
    //a list of animations that I will soon cover.
}

export class VariableModifierJSON extends JSONBase {

    constructor(public props: Expand<VariableModifierJSONProps>) {
        super()
    }

    override toJSON() {
        return {
            ...this.stripUndefined(this.props)
        }
    }

}