import type { Expand } from "../util";
import { JSONBase } from "./base";

export type GeneralJSONProps = {
    hideOnCreative?: boolean;
    name?: string;
    description?: string;
    stackSize?: number; //?is integer, should check
    health?: number; //?is integer, should check
    materialLists: (string[])[];
    repairMaterialLists?: (string[])[];
    returnedMaterialLists?: (string[])[];
    oreDict?: string;
    radarWidth?: number; //?is double
    radarRange?: number; //?is double
}

export class GeneralJSON extends JSONBase {

    constructor(public props: Expand<GeneralJSONProps>) {
        super();
        if ( props.stackSize != undefined ) {
            if ( !Number.isInteger(props.stackSize) ) {
                throw new Error(`stackSize in Typeof General MUST be an integer`)
            }

            if ( props.stackSize > 64 ) {
                throw new Error(`stackSize in Typeof General MUST be limited to 64 only`)
            }
        }
    }

    override toJSON() {
        return {
            ...this.stripUndefined(this.props)
        }
    }

}