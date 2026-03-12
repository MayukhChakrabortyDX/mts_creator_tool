import type { Expand } from "../util";
import { JSONBase } from "./base";

export type Point3d = [number, number, number]

export type TextJSONProps = {
    pos: Point3d;
    rot?: Point3d;
    scale: number;
    fieldName?: string;
    variableName: string;
    variableFactor?: number;
    variableOffset: number;
    variableFormat: string;
    fontName?: string;
    defaultText: string;
    maxLength: number; //?IS INTEGER
    color: string;
    inheritedColorIndex?: number; //?IS INTEGER
    wrapWidth?: number; //?IS INTEGER
    attachedTo?: string;
    lightsUp?: boolean;
    renderPosition?: number; //?IS INTEGER
    autoScale?: boolean;
}

export class TextJSON extends JSONBase {
    constructor(public props: Expand<TextJSONProps>) {
        super()
        if (!Number.isInteger(props.maxLength)) {
            throw new Error(`maxLength in Typeof TextJSON must be an Integer`)
        }

        if (props.inheritedColorIndex != undefined) {
            if (!Number.isInteger(props.inheritedColorIndex)) {
                throw new Error(`maxLength in Typeof TextJSON must be an Integer`)
            }
        }

        if (props.wrapWidth != undefined) {
            if (!Number.isInteger(props.wrapWidth)) {
                throw new Error(`maxLength in Typeof TextJSON must be an Integer`)
            }
        }

        if (props.renderPosition != undefined) {
            if (!Number.isInteger(props.renderPosition)) {
                throw new Error(`maxLength in Typeof TextJSON must be an Integer`)
            }
        }
    }

    override toJSON() {
        return {
            ...this.stripUndefined(this.props)
        }
    }
}