import type { Expand } from "../util";
import type { AnimationJSONProps } from "./animation";
import { JSONBase } from "./base";

export type VariableModifierJSONProps = {
    variable: string;
    addValue?: number;
    setValue?: number;
    minValie?: number;
    maxValue?: number;
    animations?: AnimationJSONProps[]
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