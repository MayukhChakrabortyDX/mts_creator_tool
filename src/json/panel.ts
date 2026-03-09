//! REVIEW INCOMPLETE

import { JSONDefs, type Versions } from "./json";
import { ActionType } from "./action";
import { type ConditionProps } from "./conditions";
import { type AnimationVariable } from "./animationVariables";
import { type MTSColor } from "./color";

// =============================================================================
// Enums
// =============================================================================

export enum SpecialComponent {
    /** Light switch animating on running_light and headlight. Hidden if neither flag is set. */
    CarLight        = "car_light",

    /** Turn signal switch animating on left/right_turn_signal. Hidden if hasTurnSignals is false. */
    TurnSignal      = "turn_signal",

    /** Nav light switch animating on navigation_light. Hidden if hasNavLights is false. */
    NavigationLight = "navigation_light",

    /** Strobe light switch animating on strobe_light. Hidden if hasStrobeLights is false. */
    StrobeLight     = "strobe_light",

    /** Taxi light switch animating on taxi_light. Hidden if hasTaxiLights is false. */
    TaxiLight       = "taxi_light",

    /** Landing light switch animating on landing_light. Hidden if hasLandingLights is false. */
    LandingLight    = "landing_light",

    /**
     * Combined engine switch: animates on engine state, toggles magneto and starter.
     * Sequential switches target engines in order, unless hasSingleEngineControl is set.
     * Hidden if the vehicle has no engines.
     */
    EngineControl   = "engine_control",

    /**
     * Engine magneto-only switch: animates on engine state, toggles on/off only.
     * Sequential switches target engines in order, unless hasSingleEngineControl is set.
     * Hidden if the vehicle has no engines.
     */
    EngineOn        = "engine_on",

    /**
     * Engine starter-only switch: animates on engine state, engages starter only.
     * Sequential switches target engines in order, unless hasSingleEngineControl is set.
     * Hidden if the vehicle has no engines.
     */
    EngineStart     = "engine_start",

    /**
     * Trailer/connection switch animating on connection state.
     * Sequential switches target connections in order.
     * Hidden if the vehicle has no possible connections.
     */
    Trailer         = "trailer",

    /**
     * Custom variable switch animating on the state of a custom variable.
     * Sequential switches target custom variables in order.
     * Hidden if the vehicle and all its parts have no customVariables.
     */
    CustomVariable  = "custom_variable",

    /**
     * Beacon selector box for radio navigation.
     * Hidden if hasRadioNav is false and allPlanesWithNav is false in config.
     */
    BeaconBox       = "beacon_box",

    /** Roll trim button. Left/right clicks adjust trim within limits. */
    RollTrim        = "roll_trim",

    /** Pitch trim button. Left/right clicks adjust trim within limits. */
    PitchTrim       = "pitch_trim",

    /** Yaw trim button. Left/right clicks adjust trim within limits. */
    YawTrim         = "yaw_trim",
}

// =============================================================================
// Click Action
// =============================================================================

export type PanelClickActionProps = {
    /**
     * The variable to act on when this component is clicked.
     */
    variable: AnimationVariable;

    /**
     * The type of action to perform on click.
     * - `toggle`    — Toggles the variable between 0 and 1.
     * - `set`       — Sets the variable to `value`.
     * - `increment` — Increments the variable by `value`, clamped to `clampMin`/`clampMax`.
     */
    action: ActionType.Toggle | ActionType.Set | ActionType.Increment;

    /**
     * The value used by `set` and `increment` actions.
     */
    value: number;

    /**
     * Lower clamp bound for `increment` actions.
     */
    clampMin: number;

    /**
     * Upper clamp bound for `increment` actions.
     */
    clampMax: number;
}

// =============================================================================
// Component
// =============================================================================

export type PanelComponentProps = {
    /**
     * The position of this component on the panel, anchored at its top-left corner.
     */
    pos: [number, number];

    /**
     * The width of this component's texture area and interaction region, in pixels.
     */
    width: number;

    /**
     * The height of this component's texture area and interaction region, in pixels.
     */
    height: number;

    /**
     * The top-left pixel coordinate on the texture sheet where this component's
     * 0-state (default/off) texture begins.
     */
    textureStart: [number, number];

    /**
     * Descriptive text rendered below this component on the panel.
     */
    text: string;

    /**
     * The variable used to select which texture state this component displays.
     * Omit if this component's texture never changes.
     */
    statusVariable: AnimationVariable;

    /**
     * Conditions that determine whether this component is visible.
     * Defaults to always visible if omitted.
     */
    visibilityConditions: Partial<ConditionProps>[];

    /**
     * If set, applies special built-in logic to this component (e.g. engine
     * switches, trim controls, light switches). May be null for standard
     * components.
     */
    specialComponent: SpecialComponent | null;

    /**
     * The action performed when this component is clicked anywhere.
     * Use `clickActionLeft` / `clickActionRight` instead for split-click components.
     */
    clickAction: Partial<PanelClickActionProps>;

    /**
     * The action performed when the left side of this component is clicked.
     * Used for components with distinct left/right interactions (e.g. trim controls).
     */
    clickActionLeft: Partial<PanelClickActionProps>;

    /**
     * The action performed when the right side of this component is clicked.
     */
    clickActionRight: Partial<PanelClickActionProps>;
}

// =============================================================================
// Panel
// =============================================================================

export type PanelProps = {
    /**
     * The texture sheet for this panel, containing the background, buttons,
     * switches, etc.
     * A `_lit` variant must also be provided to avoid visual issues when lit.
     * Format: packID:textureName
     */
    texture: string;

    /**
     * The width of the texture sheet, in pixels.
     */
    textureWidth: number;

    /**
     * The height of the texture sheet, in pixels.
     */
    textureHeight: number;

    /**
     * The width of the background region on the texture sheet, in pixels.
     * The background must touch the left edge of the texture.
     */
    backgroundWidth: number;

    /**
     * The height of the background region on the texture sheet, in pixels.
     * The background must touch the top edge of the texture.
     */
    backgroundHeight: number;

    /**
     * The color for text rendered below components on the panel.
     * Defaults to white if omitted.
     */
    textColor: MTSColor;

    /**
     * Like `textColor`, but applied when the vehicle's lights are on.
     */
    litTextColor: MTSColor;

    /**
     * The list of components placed on this panel.
     */
    components: Partial<PanelComponentProps>[];
}

export class Panel extends JSONDefs {

    texture?: string;
    textureWidth?: number;
    textureHeight?: number;
    backgroundWidth?: number;
    backgroundHeight?: number;
    textColor?: MTSColor;
    litTextColor?: MTSColor;
    components?: Partial<PanelComponentProps>[];

    constructor(properties: Partial<PanelProps>) {
        super();
        this.texture          = properties.texture;
        this.textureWidth     = properties.textureWidth;
        this.textureHeight    = properties.textureHeight;
        this.backgroundWidth  = properties.backgroundWidth;
        this.backgroundHeight = properties.backgroundHeight;
        this.textColor        = properties.textColor;
        this.litTextColor     = properties.litTextColor;
        this.components       = properties.components;
    }

    override toJSON(version: Versions): object {
        return {
            texture:          this.texture,
            textureWidth:     this.textureWidth,
            textureHeight:    this.textureHeight,
            backgroundWidth:  this.backgroundWidth,
            backgroundHeight: this.backgroundHeight,
            textColor:        this.textColor,
            litTextColor:     this.litTextColor,
            components:       this.components,
        };
    }

}