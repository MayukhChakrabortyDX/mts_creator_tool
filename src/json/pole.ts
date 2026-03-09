//! REVIEW INCOMPLETE

import { JSONDefs, type Versions } from "./json";

// =============================================================================
// Enums
// =============================================================================

export enum PoleType {
    /**
     * The central core component. Must be placed before any other pole
     * components. Connects to other pole parts and allows placement of
     * components on it. Cores are designed to mix and match across packs.
     */
    Core           = "core",

    /**
     * A traffic signal component. Consists of a model with one or more
     * light objects. The number and arrangement of lights is entirely up
     * to the pack author (e.g. standard 3-light, 2-light crossing signal).
     * Can be controlled by a signal controller decor.
     */
    TrafficSignal  = "traffic_signal",

    /**
     * A street light component. Designed for ambient street lighting.
     * Cannot be controlled by a signal controller.
     */
    StreetLight    = "street_light",

    /**
     * A sign component. May include lights that behave like street lights.
     * If the rendering section defines text objects, the sign's text can
     * be edited via GUI, enabling dynamic route signs, speed limit signs, etc.
     */
    Sign           = "sign",
}

// =============================================================================
// Pole Props
// =============================================================================

export type PoleProps = {
    /**
     * The type of this pole component. Determines its properties and behaviour.
     */
    type: PoleType;

    /**
     * The distance from the pole's center to where components should attach,
     * in meters. Ensures components neither clip into large poles nor float
     * away from small ones.
     * Only valid when `type` is `PoleType.Core`.
     */
    radius: number;

    /**
     * If true, components may be placed diagonally on this pole.
     * Diagonal placement is disabled by default.
     * Only valid when `type` is `PoleType.Core`.
     */
    allowsDiagonals: boolean;
}

// =============================================================================
// Class
// =============================================================================

export class Pole extends JSONDefs {

    type?: PoleType;
    radius?: number;
    allowsDiagonals?: boolean;

    constructor(properties: Partial<PoleProps>) {
        super();
        this.type            = properties.type;
        this.radius          = properties.radius;
        this.allowsDiagonals = properties.allowsDiagonals;
    }

    override toJSON(version: Versions): object {
        return {
            pole: {
                type:            this.type,
                radius:          this.radius,
                allowsDiagonals: this.allowsDiagonals,
            }
        };
    }

}