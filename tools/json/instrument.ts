import type { Expand } from "../util";
import type { AnimationJSON } from "./animation";
import { JSONBase } from "./base";
import type { GeneralJSON } from "./general";
import type { TextJSON } from "./text";

export type InstrumentComponentJSONProps = {
    xCenter?: number; //?is integer
    yCenter?: number; //?is integer
    scale?: number;
    textureXCenter?: number; //?is integer
    textureYCenter?: number; //?is integer
    textureHeight: number; //?is integer
    textureWidth: number; //?is integer
    textObject?: TextJSON;
    textFactor?: number; //TODO: If the textObject exists, then.
    rotateWindow?: boolean;
    extendWindow?: boolean;
    moveComponent?: boolean;
    lightUpTexture?: boolean;
    alwaysLit?: boolean;
    overlayTexture?: boolean;
    animations?: AnimationJSON[]; //!is Animation, will look into it soon.
}

export class InstrumentComponentJSON extends JSONBase {

    constructor(public props: Expand<InstrumentComponentJSONProps>) {
        super();

        if ( props.textureXCenter == undefined ) {
            props.textureXCenter = Math.floor(props.textureWidth / 2)
        }

        if ( props.textureYCenter == undefined ) {
            props.textureYCenter = Math.floor(props.textureHeight / 2)
        }

        if ( props.textObject != undefined ) {
            if (props.textFactor == undefined) {
                throw new Error(`textFactor is required in Typeof InstrumentComponent when textObject is supplied`)
            }
        }

        if ( props.xCenter != undefined ) {    
            if (!Number.isInteger(props.xCenter)) {
                throw new Error(`textureXCenter in Typeof InstrumentComponent must be an Integer`)
            }
        }

        if ( props.yCenter != undefined ) {
            if (!Number.isInteger(props.yCenter)) {
                throw new Error(`textureXCenter in Typeof InstrumentComponent must be an Integer`)
            }
        }

        if (!Number.isInteger(props.textureXCenter)) {
            throw new Error(`textureXCenter in Typeof InstrumentComponent must be an Integer`)
        }

        if (!Number.isInteger(props.textureYCenter)) {
            throw new Error(`textureXCenter in Typeof InstrumentComponent must be an Integer`)
        }

        if (!Number.isInteger(props.textureHeight)) {
            throw new Error(`textureXCenter in Typeof InstrumentComponent must be an Integer`)
        }

        if (!Number.isInteger(props.textureWidth)) {
            throw new Error(`textureXCenter in Typeof InstrumentComponent must be an Integer`)
        }
    }

    override toJSON() {
        return {
            ...this.stripUndefined(this.props)
        }
    }

}

//--------------------------------------------------------//

export type InstrumentJSONProps = {
    components: InstrumentComponentJSON[];
    textureName: string;
    general: GeneralJSON;
}

export class InstrumentJSON extends JSONBase {

    constructor(public props: Expand<InstrumentJSONProps>) {
        super();
    }

    override toJSON() {
        return {
            ...this.stripUndefined(this.props)
        }
    }

}