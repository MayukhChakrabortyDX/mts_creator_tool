//! REVIEW INCOMPLETE

import { JSONDefs, type Versions } from "./json";
import { type AnimationProps } from "./animation";
import { type ConditionProps } from "./conditions";
import { type CraftingDefinitionProps } from "./crafting";

// =============================================================================
// Shared / Utility Types
// =============================================================================

export type MuzzleProps = {
    /**
     * The position of this muzzle — where the bullet spawns on firing.
     */
    pos: [number, number, number];

    /**
     * The rotation of this muzzle. Allows slight toe-in on barrels.
     */
    rot: [number, number, number];

    /**
     * The point this muzzle rotates about when the gun's pitch is applied.
     * Used for things like tank barrels. Omit if the barrel already rotates
     * with the gun.
     */
    center: [number, number, number];
}

export type MuzzleGroupProps = {
    /**
     * The muzzles that belong to this group.
     * All muzzles in a group fire simultaneously when the group is active.
     */
    muzzles: Partial<MuzzleProps>[];
}

// =============================================================================
// Generic Section
// =============================================================================

export type GenericPartProps = {
    /**
     * The type name for this part (e.g. `engine_car`, `ground_wheel`, `gun_tripod`).
     * Tells MTS what sections to load and how to interact with the part.
     * `generic` is a valid prefix for decorative parts like spoilers and push-bars.
     */
    type: string;

    /**
     * Optional. Restricts this part to slots that include this customType in their
     * `customTypes` list. Omit unless pack-specific slot restriction is needed.
     */
    customType: string;

    /**
     * Optional. If set, this texture is used when the part is shown in the bench,
     * even if the part normally uses a different or vehicle-inherited texture.
     * Format: packID:textureName
     */
    benchTexture: string;

    /**
     * If true, this part can be removed by hand without a wrench.
     * Also bypasses owner requirements (but not vehicle locking).
     * Useful for removable accessories like luggage.
     */
    canBeRemovedByHand: boolean;

    /**
     * If true, this part can only be removed with a screwdriver.
     */
    mustBeRemovedByScrewdriver: boolean;

    /**
     * If true, this part forwards the damage it receives to its parent vehicle.
     */
    forwardsDamage: boolean;

    /**
     * Multiplier applied to damage forwarded to the vehicle.
     * If set, bullets also stop when hitting this part.
     * Defaults to 1.0 for engines, 0.0 for all other parts.
     */
    forwardsDamageMultiplier: number;

    /**
     * If true, this part can be placed on the ground, axis-aligned.
     */
    canBePlacedOnGround: boolean;

    /**
     * If true, this part falls to the ground with Minecraft's gravity (0.04 m/t²).
     * Has no effect if `canBePlacedOnGround` is false.
     */
    fallsToGround: boolean;

    /**
     * If true, when this part's health reaches 0 it is destroyed and removed
     * rather than simply becoming inoperable.
     */
    destroyable: boolean;

    /**
     * If true, this part links to all parts that it could possibly link to,
     * regardless of whether they specify it in their `linkedParts`.
     */
    forceAllLinks: boolean;

    /**
     * The width of the part's interaction and collision box.
     */
    width: number;

    /**
     * The height of the part's interaction and collision box.
     */
    height: number;

    /**
     * Y-axis offset for where this part exists when placed on the ground.
     * Has no effect if `canBePlacedOnGround` is false.
     */
    placedOffset: number;

    /**
     * Offset for where this part exists relative to its slot.
     * Omit if no offset is needed.
     */
    slotOffset: number;

    /**
     * The mass of the part in kg.
     * Normally 0, but can be set for engines, generic parts, or other
     * parts that contribute to vehicle mass.
     */
    mass: number;

    /**
     * Animations that move this part before the part-slot animations are applied.
     * Primarily used to move a part based on properties of its sub-parts,
     * most commonly for guns.
     */
    movementAnimations: Partial<AnimationProps>[];

    /**
     * Conditions determining whether this part is active.
     * Leaving this empty makes the part always active.
     * What 'active' means depends on part type: effectors effect, guns fire,
     * seats can be occupied, etc.
     */
    activeAnimations: Partial<ConditionProps>[];
}

// =============================================================================
// Engine Section
// =============================================================================

export enum EngineType {
    /** Standard internal-combustion engine. Requires vehicle fuel. */
    Normal   = "normal",

    /** Rocket engine. Uses internal fuel; must be rebuilt after each use. */
    Rocket   = "rocket",

    /** Electric engine. Draws power from chargers on the grid. */
    Electric = "electric",

    /** Fuel-free engine for bicycles, sailboats, handcars, etc. */
    Magic    = "magic",
}

export type EnginePartProps = {
    /**
     * The engine type. Determines fuel source and starter behaviour.
     * At least one type must be specified.
     */
    type: EngineType;

    /**
     * If true, the engine will automatically select the best gear.
     * Only affects cars; prevents manual shifting.
     * MTS's auto-transmission can struggle with closely-spaced ratios —
     * consider specifying `upShiftRPM` / `downShiftRPM` for engines with
     * more than 5–6 gears.
     * Can be modified via variableModifiers.
     */
    isAutomatic: boolean;

    /**
     * If true, thrust-vectoring forces are calculated on all three axes.
     */
    allowThrustVector: boolean;

    /**
     * If true, the automatic starter is disabled. The engine must be started
     * by hand (by hitting the engine or propeller). Intended for outboard motors.
     */
    disableAutomaticStarter: boolean;

    /**
     * The starter's output force per firing.
     * Engine RPM increases by this amount every 4 ticks while the starter key
     * is held. For high-load engines (e.g. large propellers), a low value may
     * not be enough to start the engine at all.
     */
    starterPower: number;

    /**
     * Fuel consumption in mb/tick at `maxRPM`, scaled linearly with RPM.
     * Also directly determines the raw power output of the engine.
     * Can be modified via variableModifiers.
     */
    fuelConsumption: number;

    /**
     * Fuel consumption of the supercharger, in mb/tick, at `maxRPM`.
     * Omit if this engine has no supercharger.
     * Not counted toward vehicle min/max fuel consumption checks.
     * Can be modified via variableModifiers.
     */
    superchargerFuelConsumption: number;

    /**
     * Efficiency multiplier applied to `superchargerFuelConsumption`.
     * 1.0 = supercharger adds power proportional to its fuel use.
     * Values below 1.0 simulate gas-guzzling but inefficient superchargers.
     * Also affects engine heat: 0 = no extra heat, 1 = moderate extra heat.
     * Omit if this engine has no supercharger.
     * Can be modified via variableModifiers.
     */
    superchargerEfficiency: number;

    /**
     * How quickly this engine heats up at higher RPMs.
     * Can be modified via variableModifiers.
     */
    heatingCoefficient: number;

    /**
     * How quickly this engine cools down when not generating heat or at
     * lower RPMs.
     * Can be modified via variableModifiers.
     */
    coolingCoefficient: number;

    /**
     * The fuel type category this engine accepts (e.g. `"gasoline"`, `"diesel"`,
     * `"electricity"`). Not the fluid name — this groups engines by fuel kind for
     * cross-pack compatibility and server configuration.
     */
    fuelType: string;

    /**
     * List of gear ratios. Must contain at minimum:
     * one reverse gear (negative), one neutral (0), and one or more forward gears.
     * Aircraft that don't shift can use `[-1, 0, 1]`.
     * Maximum of 127 gears. Only cars, boats, and blimps have gearboxes for reverse.
     * Can be modified via variableModifiers.
     */
    gearRatios: number[];

    /**
     * A constant ratio applied to any propellers attached to this engine,
     * overriding the `gearRatios` value. Useful for gearing down a propeller
     * on a land-based vehicle.
     */
    propellerRatio: number;

    /**
     * If greater than 0, this engine provides jet thrust in addition to any
     * other power source. Thrust is based on `bypassRatio` and fuel consumption.
     * Can be modified via variableModifiers.
     */
    jetPowerFactor: number;

    /**
     * Used with `jetPowerFactor`. Higher bypass ratio engines are more efficient
     * and powerful at high RPM but have a lower top speed.
     * Can be modified via variableModifiers.
     */
    bypassRatio: number;

    /**
     * The maximum RPM this engine targets at 100% throttle with no load.
     * The redline (max safe RPM) is auto-calculated from this unless `maxSafeRPM` is set.
     * Can be modified via variableModifiers.
     */
    maxRPM: number;

    /**
     * The redline RPM. Auto-calculated from `maxRPM` if omitted.
     * Override here if the auto-calculation doesn't suit your engine.
     * Can be modified via variableModifiers.
     */
    maxSafeRPM: number;

    /**
     * The RPM at which this engine idles after starting.
     * Set to -1 for electric-style behaviour (treated as 0).
     * Can be modified via variableModifiers.
     */
    idleRPM: number;

    /**
     * The RPM at which the engine fires on the starter.
     * May be lower than `idleRPM`; stalling is governed by `stallRPM`.
     * Set to -1 for electric-style behaviour (treated as 0).
     * Can be modified via variableModifiers.
     */
    startRPM: number;

    /**
     * The RPM below which the engine stalls.
     * Should be below `idleRPM` to prevent stalling at low throttle.
     * Set to -1 for electric-style behaviour (treated as 0).
     * Can be modified via variableModifiers.
     */
    stallRPM: number;

    /**
     * The RPM at which the engine actively limits itself, whether in gear or neutral.
     * Auto-calculated if omitted. Set to -1 to disable rev limiting.
     * Can be modified via variableModifiers.
     */
    revlimitRPM: number;

    /**
     * How much the RPM 'bounces' at the rev limit in neutral.
     * Lower values = harder limiter, higher values = softer limiter.
     * Defaults to 8 if omitted.
     * Can be modified via variableModifiers.
     */
    revlimitBounce: number;

    /**
     * How many RPM this engine loses per tick when shutting down or sputtering.
     * Defaults to 10. Adjust to control wind-down speed.
     * Can be modified via variableModifiers.
     */
    engineWinddownRate: number;

    /**
     * Internal fuel for rocket-type engines.
     * Ignites on engine start and runs at full throttle until depleted.
     * Must be rebuilt to refuel.
     */
    rocketFuel: number;

    /**
     * Rate at which this engine accumulates wear hours.
     * Lower = more reliable; higher = wears out faster.
     * Does not affect damage from mobs, arrows, etc.
     * Can be modified via variableModifiers.
     */
    engineWearFactor: number;

    /**
     * RPM thresholds at which the engine shifts up, one per gear including
     * neutral and reverse. Only used by automatic transmissions.
     * Pair with `downShiftRPM` to override MTS's automatic shift logic.
     */
    upShiftRPM: number[];

    /**
     * RPM thresholds at which the engine shifts down, one per gear.
     * Pair carefully with `upShiftRPM` — thresholds too close together will
     * cause an infinite shift loop.
     */
    downShiftRPM: number[];

    /**
     * Ticks to wait between gear changes for automatic transmissions.
     * Required because RPM takes time to catch up after a shift.
     * Engines with many gears or high power typically need a smaller value.
     */
    shiftSpeed: number;

    /**
     * How long, in ticks, the clutch variable remains active during manual shifts.
     * Has no gameplay effect beyond enabling clutch animations.
     */
    clutchTime: number;

    /**
     * How responsive the engine is to RPM changes.
     * Lower = faster response. Defaults to 10 if omitted.
     * Can be modified via variableModifiers.
     */
    revResistance: number;

    /**
     * If true, this engine forces a gear change into the desired gear rather
     * than returning a bad-shift when shifting against the direction of travel.
     * Can be modified via variableModifiers.
     */
    forceShift: boolean;
}

// =============================================================================
// Ground Device Section
// =============================================================================

export type FrictionModifiers = {
    normal?:  number;
    ice?:     number;
    snow?:    number;
    sand?:    number;
    gravel?:  number;
    clay?:    number;
    grass?:   number;
    dirt?:    number;
    metal?:   number;
    stone?:   number;
    glass?:   number;
    wood?:    number;
}

export type GroundDevicePartProps = {
    /**
     * If true, this part is a wheel and can transmit engine power to the ground.
     */
    isWheel: boolean;

    /**
     * If true, this part is a tread. Treads use special slot code.
     */
    isTread: boolean;

    /**
     * If true, this part treats water blocks as solid and floats on them.
     * Can be used alongside floating hitboxes.
     */
    canFloat: boolean;

    /**
     * The width of this ground device, used for collision detection.
     */
    width: number;

    /**
     * The height of this ground device.
     * Used as the min/max value parameter. For wheels, also affects max ground
     * speed — a larger wheel covers more distance per revolution.
     * Can be modified via variableModifiers.
     */
    height: number;

    /**
     * How many blocks this device can climb over. Accepts decimals.
     * Defaults to 1.5 if not set.
     */
    climbHeight: number;

    /**
     * If set, this device can go flat. When flat, the height drops to this
     * value and friction is reduced.
     */
    flatHeight: number;

    /**
     * Forwards friction for this device.
     * Controls grip during acceleration, braking, and braking force.
     * Can be modified via variableModifiers.
     */
    motiveFriction: number;

    /**
     * Lateral friction for this device.
     * Controls how much the vehicle slides sideways during turns.
     * Can be modified via variableModifiers.
     */
    lateralFriction: number;

    /**
     * Friction penalty applied when the surface is wet.
     */
    wetFrictionPenalty: number;

    /**
     * If set, creates an extra collision box offset in +Z by this amount.
     * Useful for longer parts like pontoons or helicopter skids.
     * If also set on the vehicle slot, the vehicle value overrides this.
     */
    extraCollisionBoxOffset: number;

    /**
     * Spacing between tread links. Only used for treads.
     */
    spacing: number;

    /**
     * Object render order for patterned tread links.
     * Allows rendering multiple objects in sequence for patterned treads.
     * Only used if `isTread` is true.
     */
    treadOrder: string[];

    /**
     * Per-surface friction overrides.
     * Defaults: -0.1 on wet, -0.2 on ice/snow for all devices.
     * Valid surfaces: normal, ice, snow, sand, gravel, clay, grass, dirt,
     * metal, stone, glass, wood.
     */
    frictionModifiers: FrictionModifiers;
}

// =============================================================================
// Propeller Section
// =============================================================================

export type PropellerPartProps = {
    /**
     * If true, MTS treats this as a rotor and angles it with aircraft control
     * inputs to vector thrust. Designed for helicopters.
     */
    isRotor: boolean;

    /**
     * The pitch of this propeller in inches — how far forward it tries to move
     * per revolution. Higher pitch = higher top speed, but worse low-speed
     * efficiency and longer takeoff runs.
     */
    pitch: number;

    /**
     * How many inches per tick the propeller tries to change pitch.
     * Defaults to 1 if not set.
     */
    pitchChangeRate: number;

    /**
     * The diameter of this propeller in inches.
     * Larger diameter = more thrust at the same RPM, but requires more power
     * to turn and has a lower maximum RPM before breaking off.
     */
    diameter: number;

    /**
     * If true, the propeller automatically adjusts its pitch to keep the
     * engine near the top of its RPM range.
     * Minimum pitch floors at 45; maximum is the `pitch` value.
     * Dynamic-pitch propellers can also provide limited reverse thrust.
     */
    isDynamicPitch: boolean;
}

// =============================================================================
// Seat Section
// =============================================================================

export type SeatPartProps = {
    /**
     * If true, the player stands in this seat rather than sits.
     * Some mods may force sitting regardless; remove mods to debug.
     */
    standing: boolean;

    /**
     * If set, the player is scaled to these X, Y, Z values while seated.
     * Useful for tight spaces, or for making the player invisible with a
     * small enough scale.
     */
    playerScale: [number, number, number];
}

// =============================================================================
// Gun Section
// =============================================================================

export enum LockOnType {
    /** Locks the entity the player is looking at, like a laser designator. */
    Default  = "default",

    /** Locks the closest target within a cone around the gun barrel. Requires `lockRange` and `lockMaxAngle`. */
    Boresight = "boresight",

    /** Currently unimplemented. */
    Radar    = "radar",

    /** Beam-riding logic — goes to wherever the player is looking. */
    Manual   = "manual",
}

export enum LockTargetType {
    /** Locks any type of target. */
    All      = "all",

    /** Locks aircraft only. */
    Aircraft = "aircraft",

    /** Locks ground vehicles only. */
    Ground   = "ground",

    /** Locks all vehicles but not other entities. */
    Hard     = "hard",

    /** Locks living entities only. */
    Soft     = "soft",
}

export type GunPartProps = {
    /**
     * If set, the gun automatically reloads from the vehicle's inventory.
     * Hand-held guns load before hitting 0 bullets; vehicle guns reload on empty.
     * Prefers the same ammo type previously loaded.
     * Can be modified via variableModifiers.
     */
    autoReload: boolean;

    /**
     * If true, reloading in-hand replaces individual bullets rather than
     * swapping clips.
     */
    isClipless: boolean;

    /**
     * If true, this gun can never be reloaded. Useful for single-use weapons.
     * Can be modified via variableModifiers.
     */
    blockReloading: boolean;

    /**
     * If true, this gun can be held and fired from the player's hand.
     * Requires `handHeldNormalOffset` and `handHeldAimedOffset` to also be set.
     * Custom cameras activate on sneak rather than F5 when hand-held.
     */
    handHeld: boolean;

    /**
     * If true, this gun is always held with two hands.
     * Normally only two-handed when aiming.
     * Can be modified via variableModifiers.
     */
    isTwoHanded: boolean;

    /**
     * If true, forces the custom camera when the gun is hand-held.
     * Useful for custom HUDs and scopes. Does not affect third-person.
     */
    forceHandheldCameras: boolean;

    /**
     * If true, the gun can only fire once per trigger press (semi-automatic).
     * Can be modified via variableModifiers.
     */
    isSemiAuto: boolean;

    /**
     * If true, only one gun of this type can be selected and fired at a time.
     * Useful for missiles/bombs with multiple ammo types loaded in separate guns.
     */
    fireSolo: boolean;

    /**
     * If true, and this gun has windup, it winds down instantly when released.
     * Enables charged-shot style functionality.
     */
    windsDownInstantly: boolean;

    /**
     * If true, the gun returns to its default yaw and pitch when inactive.
     */
    resetPosition: boolean;

    /**
     * If true, bullets align with the gun itself rather than the muzzle rotation.
     * Initial velocity still aligns with `rot`. Useful for bomb bays and rocket
     * launchers that jettison before burn.
     */
    disableMuzzleOrientation: boolean;

    /**
     * If true, bullets fired from this gun do not inherit the gun's velocity.
     * Useful for hand-held guns where walking would otherwise affect the shot.
     */
    disableInheritedMotion: boolean;

    /**
     * The ammunition capacity of this gun, in number of bullets.
     */
    capacity: number;

    /**
     * How long a reload takes, in ticks. Should match the duration of the
     * reload sound to avoid confusion.
     */
    reloadTime: number;

    /**
     * Ticks applied at the start of a reload only. Used for animations like
     * opening a breach before loading multiple bullets.
     */
    reloadStartTime: number;

    /**
     * Like `reloadStartTime`, but applied at the end of a reload.
     */
    reloadEndTime: number;

    /**
     * How long after firing the gun must wait before reloading can begin, in ticks.
     * Unlike `reloadTime`, this delays the start of the reload sequence.
     */
    reloadDelay: number;

    /**
     * How many ticks before the gun can fire after the trigger is pulled.
     * Used for chain-gun style windup. Winds down for the same duration after
     * release. Partial wind-up is preserved between trigger presses.
     */
    windupTime: number;

    /**
     * The muzzle velocity of the bullet in m/s.
     * Set to 0 for bombers — the bullet will inherit the vehicle's velocity instead.
     * Multiply by 10 for a 1:1 speed mapping (e.g. 800 = 80 blocks/sec).
     * Can be modified via variableModifiers.
     */
    muzzleVelocity: number;

    /**
     * How much this gun physically pushes the player backwards per shot.
     * This is not recoil — it is a physical force.
     * Can be modified via variableModifiers.
     */
    knockback: number;

    /**
     * Pitch recoil applied to the shooter per shot (hand-held only).
     * Can be modified via variableModifiers.
     */
    pitchRecoil: number;

    /**
     * How much pitch recoil is recovered over `pitchRecoveryTime` (hand-held only).
     * Can be modified via variableModifiers.
     */
    pitchRecovery: number;

    /**
     * Time, in ticks, over which `pitchRecovery` is applied (hand-held only).
     * Can be modified via variableModifiers.
     */
    pitchRecoveryTime: number;

    /**
     * Random yaw movement applied per shot, scaled by a random value from -1 to 1
     * (hand-held only).
     * Can be modified via variableModifiers.
     */
    yawRecoil: number;

    /**
     * Delay in ticks between consecutive bullet firings.
     * Can be modified via variableModifiers.
     */
    fireDelay: number;

    /**
     * How much spread bullets have on firing.
     * 0 = no spread; higher values = wider spread.
     * Can be modified via variableModifiers.
     */
    bulletSpreadFactor: number;

    /**
     * Minimum yaw angle for this gun, in degrees.
     * If both this and the slot's `minYaw` are set, the more conservative value wins.
     * Set to -180 (with `maxYaw` at 180) for unrestricted 360° rotation.
     */
    minYaw: number;

    /**
     * Maximum yaw angle for this gun, in degrees.
     */
    maxYaw: number;

    /**
     * Minimum pitch angle (downward), in degrees.
     */
    minPitch: number;

    /**
     * Maximum pitch angle (upward), in degrees.
     */
    maxPitch: number;

    /**
     * The calibre of this gun in mm.
     * Defines compatible ammo and corresponds to min/max values on vehicle slots.
     * Also used to calculate rotation speed if `yawSpeed` and `pitchSpeed` are unset.
     */
    diameter: number;

    /**
     * Minimum case length of compatible bullets, in mm.
     */
    minCaseLength: number;

    /**
     * Maximum case length of compatible bullets, in mm.
     */
    maxCaseLength: number;

    /**
     * Yaw rotation speed in degrees per tick.
     * If both this and the slot's `yawSpeed` are set, the lower value is used.
     */
    yawSpeed: number;

    /**
     * Pitch rotation speed in degrees per tick.
     * If both this and the slot's `pitchSpeed` are set, the lower value is used.
     */
    pitchSpeed: number;

    /**
     * Default yaw when `resetPosition` is true. Defaults to 0.
     */
    defaultYaw: number;

    /**
     * Default pitch when `resetPosition` is true. Defaults to 0.
     */
    defaultPitch: number;

    /**
     * If true, this gun can lock on to targets regardless of the loaded bullet type.
     * Required for semi-active guided bullets.
     * Can be modified via variableModifiers.
     */
    canLockTargets: boolean;

    /**
     * How this gun acquires a target lock.
     */
    lockOnType: LockOnType;

    /**
     * What category of target this gun will lock on to.
     */
    targetType: LockTargetType;

    /**
     * Maximum angle from the gun's orientation within which a boresight lock
     * can be acquired, in degrees. Only used when `lockOnType` is `boresight`.
     */
    lockMaxAngle: number;

    /**
     * Maximum range for target locking, in blocks.
     */
    lockRange: number;

    /**
     * The bullet loaded into this gun on first spawn.
     * Useful for single-use weapons.
     * Format: packID:bulletName
     */
    preloadedBullet: string;

    /**
     * Position offset for the gun when held normally (not aiming).
     * Origin is the player's right shoulder rotation point:
     * approximately 0.3125 blocks right and 1.375 blocks above feet center.
     * Required when `handHeld` is true.
     */
    handHeldNormalOffset: [number, number, number];

    /**
     * Position offset for the gun when the player is aiming (sneaking).
     * Required when `handHeld` is true.
     */
    handHeldAimedOffset: [number, number, number];

    /**
     * Optional offset to shift the gun's model position in the player's hand,
     * without affecting the actual hold point or arm position.
     */
    handHeldModelOffset: [number, number, number];

    /**
     * A list of muzzle groups. On each shot the list is cycled, and each group
     * in turn fires all of its muzzles simultaneously.
     * Allows alternating or simultaneous multi-barrel configurations.
     */
    muzzleGroups: Partial<MuzzleGroupProps>[];
}

// =============================================================================
// Interactable Section
// =============================================================================

export enum InteractionType {
    Crate         = "crate",
    Barrel        = "barrel",
    CraftingTable = "crafting_table",
    CraftingBench = "crafting_bench",
    Jerrycan      = "jerrycan",
    Battery       = "battery",
    Furnace       = "furnace",
    Brewer        = "brewer",
}

export enum CrafterType {
    /** Standard crafter using vanilla fuel. Pulls from crates if they feed vehicles. */
    Standard = "standard",

    /** Runs off fuel liquid stored in barrels or jerrycans. */
    Fuel     = "fuel",

    /** Runs off electric power. Only valid on vehicles. */
    Electric = "electric",
}

export type InteractablePartProps = {
    /**
     * What this interactable does when clicked.
     */
    interactionType: InteractionType;

    /**
     * The type of crafter. Only required for `furnace` and `brewer` types.
     */
    crafterType: CrafterType;

    /**
     * Processing rate multiplier for this crafter.
     * A value of 2 processes and consumes fuel twice as fast.
     */
    crafterRate: number;

    /**
     * Fuel efficiency of this crafter.
     * 1.0 = standard fuel rate. For FUEL crafters: 1.0 = 20 ticks per mb.
     * For ELECTRIC furnaces: 1.0 = 500 ticks per electric unit.
     */
    crafterEfficiency: number;

    /**
     * If true, this part's inventory is accessible by the vehicle and its parts
     * (e.g. guns pulling ammo, engines pulling fuel).
     * Does not affect loader/unloader operations.
     */
    feedsVehicles: boolean;

    /**
     * If true, and this is a crate with ammo or a barrel with fuel, destruction
     * does not trigger a large explosion. Useful for specialty ammo crates.
     */
    hasBlowoutPanels: boolean;

    /**
     * If true, this inventory can be opened while held in the player's hand.
     * Only valid for crates.
     */
    canBeOpenedInHand: boolean;

    /**
     * The size of this part's inventory.
     * For crates: number of rows (9 slots each).
     * For barrels: capacity in buckets × 10.
     * Also used for min/max value calculations on vehicle slots.
     */
    inventoryUnits: number;

    /**
     * Maximum stack size per inventory slot. Defaults to 64 if not set.
     */
    inventoryStackSize: number;

    /**
     * The GUI texture for this interactable part.
     * If omitted, the default texture is used.
     * Format: packID:textureName
     */
    inventoryTexture: string;

    /**
     * Optional list of items pre-populated in this inventory on first spawn.
     */
    defaultInventory: string[];

    /**
     * Optional crafting definition. Requires `interactionType` to be
     * `InteractionType.CraftingBench` to have any effect.
     */
    crafting: Partial<CraftingDefinitionProps>;
}

// =============================================================================
// Effector Section
// =============================================================================

export enum EffectorType {
    Fertilizer = "fertilizer",
    Harvester  = "harvester",
    Planter    = "planter",
    Plow       = "plow",
    Snowplow   = "snowplow",
    Drill      = "drill",
    Placer     = "placer",
    Collector  = "collector",
    Dropper    = "dropper",
    Sprayer    = "sprayer",
    Crafter    = "crafter",
}

export type EffectorPartProps = {
    /**
     * The type of this effector, defining what it does to the world.
     */
    type: EffectorType;

    /**
     * Delay in ticks between successive operations.
     * Used to throttle operation spam on high-frequency effectors.
     */
    operationDelay: number;

    /**
     * The maximum block hardness this drill can break.
     * Only valid for `drill` type effectors.
     */
    drillHardness: number;

    /**
     * How fast this drill breaks a block at the specified hardness.
     * Softer blocks break faster than harder ones.
     * Only valid for `drill` type effectors.
     */
    drillSpeed: number;

    /**
     * Input definitions for the `crafter` type effector.
     */
    crafterInputs: unknown[];

    /**
     * Output definitions for the `crafter` type effector.
     */
    crafterOutputs: unknown[];
}

// =============================================================================
// Top-level Part class
// =============================================================================

export type PartProps = {
    generic:     Partial<GenericPartProps>;
    engine?:     Partial<EnginePartProps>;
    ground?:     Partial<GroundDevicePartProps>;
    propeller?:  Partial<PropellerPartProps>;
    seat?:       Partial<SeatPartProps>;
    gun?:        Partial<GunPartProps>;
    interactable?: Partial<InteractablePartProps>;
    effector?:   Partial<EffectorPartProps>;
}

export class Part extends JSONDefs {

    generic:      Partial<GenericPartProps>;
    engine?:      Partial<EnginePartProps>;
    ground?:      Partial<GroundDevicePartProps>;
    propeller?:   Partial<PropellerPartProps>;
    seat?:        Partial<SeatPartProps>;
    gun?:         Partial<GunPartProps>;
    interactable?: Partial<InteractablePartProps>;
    effector?:    Partial<EffectorPartProps>;

    constructor(properties: PartProps) {
        super();
        this.generic      = properties.generic;
        this.engine       = properties.engine;
        this.ground       = properties.ground;
        this.propeller    = properties.propeller;
        this.seat         = properties.seat;
        this.gun          = properties.gun;
        this.interactable = properties.interactable;
        this.effector     = properties.effector;
    }

    override toJSON(version: Versions): object {
        return {
            generic:      this.generic,
            engine:       this.engine,
            ground:       this.ground,
            propeller:    this.propeller,
            seat:         this.seat,
            gun:          this.gun,
            interactable: this.interactable,
            effector:     this.effector,
        };
    }

}