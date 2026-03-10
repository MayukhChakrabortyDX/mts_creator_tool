//! REVIEW INCOMPLETE

import { Expand } from "../utils/expand";
import { JSONDefs, type Versions } from "./json";
import { type AnimationVariable } from "./animationVariables";
import { type MTSColor } from "./color";

export type MotorizedProps = {
    // -------------------------------------------------------------------------
    // Vehicle Classification
    // -------------------------------------------------------------------------

    /**
     * If true, MTS treats this vehicle as an aircraft and uses the aircraft
     * control system.
     */
    isAircraft: boolean;

    /**
     * If true, MTS treats this vehicle as a blimp and uses the blimp control
     * system. Blimps reverse engine gears rather than invert propeller pitch.
     * Combine with `isAircraft` for actual blimps.
     */
    isBlimp: boolean;

    /**
     * If true, this vehicle will attempt to inherit the brake and electricity
     * states of any vehicle towing it, and will use any `hookupVariables`
     * defined. Useful for trailers with shared lighting.
     */
    isTrailer: boolean;

    // -------------------------------------------------------------------------
    // Physics & Control
    // -------------------------------------------------------------------------

    /**
     * If true, this vehicle will have thrust vectoring.
     * False means only yaw-vectoring will occur (e.g. for engine-out situations).
     */
    hasThrustVectoring: boolean;

    /**
     * If true, MTS treats this vehicle as having no roof.
     * Both interior and exterior sounds play at full volume regardless of camera
     * or player position. If false, exterior sounds from other sources are
     * quieter inside, and the vehicle's own exterior sounds are suppressed when
     * viewed from first-person inside.
     */
    hasOpenTop: boolean;

    /**
     * Enables autopilot for this vehicle.
     * - Cars:        cruise control.
     * - Aircraft:    holds altitude and roll.
     * - Helicopters / VTOL: auto-hover and station-keeping.
     */
    hasAutopilot: boolean;

    /**
     * If true, this vehicle can select and connect to beacons for directional
     * wayfinding via radio navigation.
     */
    hasRadioNav: boolean;

    /**
     * If true, this vehicle will not have a radio.
     * All vehicles have a radio by default; set this to suppress it.
     */
    hasNoRadio: boolean;

    /**
     * If true, this vehicle has skid-steer functionality, allowing it to turn
     * in-place while stopped in neutral. Wheel/tread rotation is automatically
     * inverted to match steering direction. Note: driveshaft variables will not
     * work because the engine gear will be 0 during skid-steer.
     */
    hasSkidSteer: boolean;

    /**
     * Like `hasSkidSteer`, but always active regardless of speed.
     * Intended for mechs, hovercraft, and similar vehicles without a wheelbase.
     */
    hasPermanentSkidSteer: boolean;

    /**
     * If true, throttle increments in 1/100 units on gas press and decrements
     * on brake press, similar to an aircraft throttle. Only applies to
     * non-aircraft vehicles. Mainly intended for boats and similar constant-
     * throttle vehicles.
     */
    hasIncrementalThrottle: boolean;

    /**
     * If true, a single engine control button on the panel will control all
     * engines simultaneously. Useful for multi-engine vehicles intended to
     * start together.
     */
    hasSingleEngineControl: boolean;

    /**
     * If true, this vehicle ignores speed when calculating steering force,
     * and instead uses `steeringForceFactor` as a flat value.
     * By default, steering force decreases with speed.
     */
    steeringForceIgnoresSpeed: boolean;

    /**
     * If true, the vehicle and its parts will not take damage from explosions.
     * Useful for tanks and other heavily armoured vehicles.
     */
    ignoreExplosiveDamage: boolean;

    /**
     * If true, auto engine start (from mtsconfig) is suppressed for this vehicle,
     * making it behave as if auto engine start is disabled regardless of the
     * global setting.
     */
    overrideAutoStart: boolean;

    // -------------------------------------------------------------------------
    // HUD & Panel
    // -------------------------------------------------------------------------

    /**
     * If true, this vehicle's HUD is always rendered as a half-HUD.
     * Useful for smaller HUDs with nothing below half-height.
     */
    halfHUDOnly: boolean;

    /**
     * If true, this vehicle's HUD is always rendered as a full HUD.
     * Useful for large or detailed instrument layouts.
     */
    fullHUDOnly: boolean;

    /**
     * If set, MTS renders this texture for the HUD instead of the default.
     * A `_lit` variant should also be provided.
     * Format: packID:textureName
     */
    hudTexture: string;

    /**
     * Like `hudTexture`, but applied to the panel instead.
     * Format: packID:textureName
     */
    panelTexture: string;

    /**
     * The color of the text rendered below components in the panel.
     * Defaults to white if omitted.
     */
    panelTextColor: MTSColor;

    /**
     * Like `panelTextColor`, but applied when the vehicle's lights are on.
     */
    panelLitTextColor: MTSColor;

    /**
     * When this variable equals 1, the vehicle is considered 'lit'.
     * Makes text and instruments light up, provided there is sufficient battery power.
     */
    litVariable: AnimationVariable;

    // -------------------------------------------------------------------------
    // Lights
    // -------------------------------------------------------------------------

    /**
     * If true, this vehicle has running lights. Shows the respective switch on the panel.
     */
    hasRunningLights: boolean;

    /**
     * If true, this vehicle has headlights. Shows the respective switch on the panel.
     */
    hasHeadlights: boolean;

    /**
     * If true, this vehicle has turn signals. Shows the respective switch on the panel.
     */
    hasTurnSignals: boolean;

    /**
     * If true, this vehicle has navigation lights. Shows the respective switch on the panel.
     */
    hasNavLights: boolean;

    /**
     * If true, this vehicle has strobe lights. Shows the respective switch on the panel.
     */
    hasStrobeLights: boolean;

    /**
     * If true, this vehicle has taxi lights. Shows the respective switch on the panel.
     */
    hasTaxiLights: boolean;

    /**
     * If true, this vehicle has landing lights. Shows the respective switch on the panel.
     */
    hasLandingLights: boolean;

    // -------------------------------------------------------------------------
    // Mass & Fuel
    // -------------------------------------------------------------------------

    /**
     * The empty mass of this vehicle in kg.
     * Fuel, cargo, players, and player inventories all add to this at runtime.
     * Should be as accurate as possible for aircraft to avoid physics issues.
     */
    emptyMass: number;

    /**
     * The fuel capacity of this vehicle, in mb.
     */
    fuelCapacity: number;

    /**
     * If set, the vehicle spawns pre-fueled with this amount.
     * Requires a `defaultPart` engine to be defined so MTS knows which fuel
     * type to use.
     */
    defaultFuelQty: number;

    /**
     * The maximum voltage (capacity) of this vehicle's battery, accounting for
     * slight overvoltage. Affects starters and lights, but not electric motors.
     * Defaults to 14 if omitted. Vehicles spawn at 85.71% charge (≈12V).
     */
    batteryCapacity: number;

    // -------------------------------------------------------------------------
    // Driving Dynamics
    // -------------------------------------------------------------------------

    /**
     * The steering force multiplier for this vehicle.
     * At 0, default MTS steering is used (or no force if `steeringForceIgnoresSpeed`
     * is true). At 1, full steering force is applied at any speed.
     * Can be modified via variableModifiers.
     */
    steeringForceFactor: number;

    /**
     * The oversteer force applied when skidding.
     * Best used with little to no understeer for RWD applications.
     * Can be modified via variableModifiers.
     */
    overSteer: number;

    /**
     * The understeer force applied when skidding.
     * Best used with little to no oversteer for FWD applications.
     * Can be modified via variableModifiers.
     */
    underSteer: number;

    /**
     * Controls the exact rate of oversteer-style skidding during extreme
     * acceleration. Consider using variableModifiers for finer control.
     */
    overSteerAccel: number;

    /**
     * Like `overSteerAccel`, but applied during extreme deceleration.
     */
    overSteerDecel: number;

    /**
     * The axle gear ratio for this vehicle.
     * Multiplied with the engine's current gear ratio to determine wheel rotation.
     * Required for engine-driven wheels. A typical car ratio is 3.55.
     * Can be modified via variableModifiers.
     */
    axleRatio: number;

    /**
     * Gravity multiplier for this vehicle. 1.0 is default.
     * Aircraft ignore the mtsconfig value and can only be adjusted here or via
     * variableModifiers.
     * Can be modified via variableModifiers.
     */
    gravityFactor: number;

    /**
     * The rate at which this vehicle climbs blocks, in blocks per tick.
     * If defined, overrides the global mtsconfig value.
     * Can be modified via variableModifiers.
     */
    climbSpeed: number;

    /**
     * The braking force multiplier for this vehicle. 1.0 is default.
     * Higher values produce more effective braking. Does not affect braking
     * in bad weather, with flat tyres, or missing wheels.
     * Can be modified via variableModifiers.
     */
    brakingFactor: number;

    /**
     * The maximum lean angle this vehicle will try to reach at full turning speed.
     * The vehicle may not reach this angle if it is moving too slowly.
     * Designed for bikes and boats. Do NOT use on four-wheeled vehicles with
     * natural roll, as this will prevent it.
     */
    maxTiltAngle: number;

    /**
     * How fast flaps deploy, in degrees per tick.
     * Only used if `flapNotches` is set.
     */
    flapSpeed: number;

    /**
     * The drag coefficient for this vehicle.
     * Defaults to 0.03 for aircraft and 2.0 for cars if omitted.
     * Affects high-speed performance significantly for cars.
     * Can be modified via variableModifiers.
     */
    dragCoefficient: number;

    // -------------------------------------------------------------------------
    // Aircraft / Aerodynamics
    // -------------------------------------------------------------------------

    /**
     * The distance from the vehicle's center of rotation to the center of the
     * tail along the Z axis, in meters. Tells MTS where to apply rudder and
     * elevator forces.
     */
    tailDistance: number;

    /**
     * The wingspan of this vehicle (tip to tip), in meters.
     * Can be modified via variableModifiers.
     */
    wingSpan: number;

    /**
     * The surface area of one wing, in square meters.
     * The fuselage between the wings should NOT be included.
     * MTS multiplies this by 2 internally for total lift calculation.
     * Can be modified via variableModifiers.
     */
    wingArea: number;

    /**
     * The surface area of the ailerons, in square meters.
     * Can be modified via variableModifiers.
     */
    aileronArea: number;

    /**
     * The surface area of the elevators, in square meters.
     * Can be modified via variableModifiers.
     */
    elevatorArea: number;

    /**
     * The surface area of the rudder, in square meters.
     * Can be modified via variableModifiers.
     */
    rudderArea: number;

    /**
     * The cross-sectional area of this vehicle at its thickest point, in square
     * meters. Used to calculate yaw-based drag. Auto-calculated if omitted.
     * Has no effect on winged vehicles, but is essentially required for blimps.
     */
    crossSectionalArea: number;

    /**
     * The ballast volume for this vehicle.
     * A typical starting value is 1/1000 of the empty mass.
     * Allows the vehicle to ascend vertically without thrust (e.g. blimps).
     * Can be modified via variableModifiers.
     */
    ballastVolume: number;

    /**
     * Ballast factor for water operations.
     * 0 = no change, 0.5 = half sink rate, 1.0 = neutral buoyancy,
     * > 1.0 = floats upward. Only applied when the vehicle is in water.
     * Can be modified via variableModifiers.
     */
    waterBallastFactor: number;

    // -------------------------------------------------------------------------
    // Crash Damage
    // -------------------------------------------------------------------------

    /**
     * The speed (in m/s) at which 0% crash damage is applied.
     * A default is used if this and related crash values are omitted.
     */
    crashSpeedMin: number;

    /**
     * The speed at which 100% crash damage is applied.
     * Set to 0 to disable crash damage entirely.
     */
    crashSpeedMax: number;

    /**
     * The speed at which the vehicle is instantly destroyed.
     * Must be higher than `crashSpeedMax`.
     */
    crashSpeedDestroyed: number;

    // -------------------------------------------------------------------------
    // Miscellaneous
    // -------------------------------------------------------------------------

    /**
     * The position where the radio plays music, relative to the entity center.
     * Required to place the audio source at the front of the vehicle rather
     * than at the entity origin.
     */
    radioPosition: [number, number, number];

    /**
     * If set to a non-zero value, the vehicle is considered to have landing gear.
     * This value is the duration of the gear transition animation in ticks.
     */
    gearSequenceDuration: number;

    /**
     * A list of flap notch positions, in degrees.
     * Both 0 and the highest notch must be included.
     * Only functional when `isAircraft` is true.
     */
    flapNotches: number[];

    /**
     * A list of variable names that will be read from the towing vehicle rather
     * than from this one when this vehicle is a trailer and is connected.
     * Used by trailers to mirror the towing vehicle's light and door states.
     */
    hookupVariables: AnimationVariable[];
}

export class Motorized extends JSONDefs {

    isAircraft?: boolean;
    isBlimp?: boolean;
    isTrailer?: boolean;
    hasThrustVectoring?: boolean;
    hasOpenTop?: boolean;
    hasAutopilot?: boolean;
    hasRadioNav?: boolean;
    hasNoRadio?: boolean;
    hasSkidSteer?: boolean;
    hasPermanentSkidSteer?: boolean;
    hasIncrementalThrottle?: boolean;
    hasSingleEngineControl?: boolean;
    steeringForceIgnoresSpeed?: boolean;
    ignoreExplosiveDamage?: boolean;
    overrideAutoStart?: boolean;
    halfHUDOnly?: boolean;
    fullHUDOnly?: boolean;
    hudTexture?: string;
    panelTexture?: string;
    panelTextColor?: MTSColor;
    panelLitTextColor?: MTSColor;
    litVariable?: AnimationVariable;
    hasRunningLights?: boolean;
    hasHeadlights?: boolean;
    hasTurnSignals?: boolean;
    hasNavLights?: boolean;
    hasStrobeLights?: boolean;
    hasTaxiLights?: boolean;
    hasLandingLights?: boolean;
    emptyMass?: number;
    fuelCapacity?: number;
    defaultFuelQty?: number;
    batteryCapacity?: number;
    steeringForceFactor?: number;
    overSteer?: number;
    underSteer?: number;
    overSteerAccel?: number;
    overSteerDecel?: number;
    axleRatio?: number;
    gravityFactor?: number;
    climbSpeed?: number;
    brakingFactor?: number;
    maxTiltAngle?: number;
    flapSpeed?: number;
    dragCoefficient?: number;
    tailDistance?: number;
    wingSpan?: number;
    wingArea?: number;
    aileronArea?: number;
    elevatorArea?: number;
    rudderArea?: number;
    crossSectionalArea?: number;
    ballastVolume?: number;
    waterBallastFactor?: number;
    crashSpeedMin?: number;
    crashSpeedMax?: number;
    crashSpeedDestroyed?: number;
    radioPosition?: [number, number, number];
    gearSequenceDuration?: number;
    flapNotches?: number[];
    hookupVariables?: AnimationVariable[];

    constructor(properties: Expand<Partial<MotorizedProps>>) {
        super();
        this.isAircraft              = properties.isAircraft;
        this.isBlimp                 = properties.isBlimp;
        this.isTrailer               = properties.isTrailer;
        this.hasThrustVectoring      = properties.hasThrustVectoring;
        this.hasOpenTop              = properties.hasOpenTop;
        this.hasAutopilot            = properties.hasAutopilot;
        this.hasRadioNav             = properties.hasRadioNav;
        this.hasNoRadio              = properties.hasNoRadio;
        this.hasSkidSteer            = properties.hasSkidSteer;
        this.hasPermanentSkidSteer   = properties.hasPermanentSkidSteer;
        this.hasIncrementalThrottle  = properties.hasIncrementalThrottle;
        this.hasSingleEngineControl  = properties.hasSingleEngineControl;
        this.steeringForceIgnoresSpeed = properties.steeringForceIgnoresSpeed;
        this.ignoreExplosiveDamage   = properties.ignoreExplosiveDamage;
        this.overrideAutoStart       = properties.overrideAutoStart;
        this.halfHUDOnly             = properties.halfHUDOnly;
        this.fullHUDOnly             = properties.fullHUDOnly;
        this.hudTexture              = properties.hudTexture;
        this.panelTexture            = properties.panelTexture;
        this.panelTextColor          = properties.panelTextColor;
        this.panelLitTextColor       = properties.panelLitTextColor;
        this.litVariable             = properties.litVariable;
        this.hasRunningLights        = properties.hasRunningLights;
        this.hasHeadlights           = properties.hasHeadlights;
        this.hasTurnSignals          = properties.hasTurnSignals;
        this.hasNavLights            = properties.hasNavLights;
        this.hasStrobeLights         = properties.hasStrobeLights;
        this.hasTaxiLights           = properties.hasTaxiLights;
        this.hasLandingLights        = properties.hasLandingLights;
        this.emptyMass               = properties.emptyMass;
        this.fuelCapacity            = properties.fuelCapacity;
        this.defaultFuelQty          = properties.defaultFuelQty;
        this.batteryCapacity         = properties.batteryCapacity;
        this.steeringForceFactor     = properties.steeringForceFactor;
        this.overSteer               = properties.overSteer;
        this.underSteer              = properties.underSteer;
        this.overSteerAccel          = properties.overSteerAccel;
        this.overSteerDecel          = properties.overSteerDecel;
        this.axleRatio               = properties.axleRatio;
        this.gravityFactor           = properties.gravityFactor;
        this.climbSpeed              = properties.climbSpeed;
        this.brakingFactor           = properties.brakingFactor;
        this.maxTiltAngle            = properties.maxTiltAngle;
        this.flapSpeed               = properties.flapSpeed;
        this.dragCoefficient         = properties.dragCoefficient;
        this.tailDistance            = properties.tailDistance;
        this.wingSpan                = properties.wingSpan;
        this.wingArea                = properties.wingArea;
        this.aileronArea             = properties.aileronArea;
        this.elevatorArea            = properties.elevatorArea;
        this.rudderArea              = properties.rudderArea;
        this.crossSectionalArea      = properties.crossSectionalArea;
        this.ballastVolume           = properties.ballastVolume;
        this.waterBallastFactor      = properties.waterBallastFactor;
        this.crashSpeedMin           = properties.crashSpeedMin;
        this.crashSpeedMax           = properties.crashSpeedMax;
        this.crashSpeedDestroyed     = properties.crashSpeedDestroyed;
        this.radioPosition           = properties.radioPosition;
        this.gearSequenceDuration    = properties.gearSequenceDuration;
        this.flapNotches             = properties.flapNotches;
        this.hookupVariables         = properties.hookupVariables;
    }

    override toJSON(version: Versions): object {
        return {
            motorized: {
                isAircraft:              this.isAircraft,
                isBlimp:                 this.isBlimp,
                isTrailer:               this.isTrailer,
                hasThrustVectoring:      this.hasThrustVectoring,
                hasOpenTop:              this.hasOpenTop,
                hasAutopilot:            this.hasAutopilot,
                hasRadioNav:             this.hasRadioNav,
                hasNoRadio:              this.hasNoRadio,
                hasSkidSteer:            this.hasSkidSteer,
                hasPermanentSkidSteer:   this.hasPermanentSkidSteer,
                hasIncrementalThrottle:  this.hasIncrementalThrottle,
                hasSingleEngineControl:  this.hasSingleEngineControl,
                steeringForceIgnoresSpeed: this.steeringForceIgnoresSpeed,
                ignoreExplosiveDamage:   this.ignoreExplosiveDamage,
                overrideAutoStart:       this.overrideAutoStart,
                halfHUDOnly:             this.halfHUDOnly,
                fullHUDOnly:             this.fullHUDOnly,
                hudTexture:              this.hudTexture,
                panelTexture:            this.panelTexture,
                panelTextColor:          this.panelTextColor,
                panelLitTextColor:       this.panelLitTextColor,
                litVariable:             this.litVariable,
                hasRunningLights:        this.hasRunningLights,
                hasHeadlights:           this.hasHeadlights,
                hasTurnSignals:          this.hasTurnSignals,
                hasNavLights:            this.hasNavLights,
                hasStrobeLights:         this.hasStrobeLights,
                hasTaxiLights:           this.hasTaxiLights,
                hasLandingLights:        this.hasLandingLights,
                emptyMass:               this.emptyMass,
                fuelCapacity:            this.fuelCapacity,
                defaultFuelQty:          this.defaultFuelQty,
                batteryCapacity:         this.batteryCapacity,
                steeringForceFactor:     this.steeringForceFactor,
                overSteer:               this.overSteer,
                underSteer:              this.underSteer,
                overSteerAccel:          this.overSteerAccel,
                overSteerDecel:          this.overSteerDecel,
                axleRatio:               this.axleRatio,
                gravityFactor:           this.gravityFactor,
                climbSpeed:              this.climbSpeed,
                brakingFactor:           this.brakingFactor,
                maxTiltAngle:            this.maxTiltAngle,
                flapSpeed:               this.flapSpeed,
                dragCoefficient:         this.dragCoefficient,
                tailDistance:            this.tailDistance,
                wingSpan:                this.wingSpan,
                wingArea:                this.wingArea,
                aileronArea:             this.aileronArea,
                elevatorArea:            this.elevatorArea,
                rudderArea:              this.rudderArea,
                crossSectionalArea:      this.crossSectionalArea,
                ballastVolume:           this.ballastVolume,
                waterBallastFactor:      this.waterBallastFactor,
                crashSpeedMin:           this.crashSpeedMin,
                crashSpeedMax:           this.crashSpeedMax,
                crashSpeedDestroyed:     this.crashSpeedDestroyed,
                radioPosition:           this.radioPosition,
                gearSequenceDuration:    this.gearSequenceDuration,
                flapNotches:             this.flapNotches,
                hookupVariables:         this.hookupVariables,
            }
        };
    }

}