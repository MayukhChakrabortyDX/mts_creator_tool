//! REVIEW INCOMPLETE

/**
 * All animation variables supported in MTS.
 * Variables prefixed with ! return the inverted state (e.g. !horn = 1 when horn is off).
 * Variables marked with * can be modified using variableModifiers.
 *
 * For parameterized variables (e.g. radar_X_distance), replace X with the relevant index.
 * For cycle variables, use the format: XXX_YYY_ZZZ_cycle
 * For connection variables, use the format: connection_groupIndex_connectionIndex_animation
 */

// ---------------------------------------------------------------------------
// Global Variables
// ---------------------------------------------------------------------------

export enum GlobalBinaryVariable {
    TextXPresent = "text_X_present",
    InLiquid = "inliquid",
    PlayerInteracting = "player_interacting",
    PlayerCraftedItem = "player_crafteditem",
    PlayerCursorHovered = "player_cursor_hovered",
    CollisionXPlayerCursorHovered = "collision_X_player_cursor_hovered",
    RandomFlip = "random_flip",
    DamageTotaled = "damage_totaled",
    CollisionXTotaled = "collision_X_totaled",
    Repainted = "repainted",
    Repaired = "repaired",
    ConfigSimpleThrottle = "config_simplethrottle",
    ConfigInnerWindows = "config_innerwindows",
    RadarDetected = "radar_detected",
    RadarXDetected = "radar_X_detected",
    BlocknameName = "blockname_NAME",
    BlockmaterialName = "blockmaterial_NAME",
    TerrainBlocknameName = "terrain_blockname_NAME",
    TerrainBlockmaterialName = "terrain_blockmaterial_NAME",
    CycleXYZ = "XXX_YYY_ZZZ_cycle",
    RadioActive = "radio_active",
}

export enum GlobalAnalogVariable {
    LightSunlight = "light_sunlight",
    LightTotal = "light_total",
    SnowfallStrength = "snowfall_strength",
    RainStrength = "rain_strength",
    RainSin = "rain_sin",
    RainCos = "rain_cos",
    Tick = "tick",
    TickSin = "tick_sin",
    TickCos = "tick_cos",
    Time = "time",
    TerrainDistance = "terrain_distance",
    PosX = "posX",
    PosY = "posY",
    PosZ = "posZ",
    Damage = "damage",
    DamagePercent = "damage_percent",
    CollisionXDamage = "collision_X_damage",
    TextureIndex = "textureIndex",
    DistanceClient = "distance_client",
    OrientationClientX = "orientation_client_x",
    OrientationClientY = "orientation_client_y",
    OrientationClientZ = "orientation_client_z",
    Random = "random",
    RadioVolume = "radio_volume",
    RadioPreset = "radio_preset",
    RadarXDistance = "radar_X_distance",
    RadarXDirection = "radar_X_direction",
    RadarAircraftXDistance = "radar_aircraft_X_distance",
    RadarAircraftXDirection = "radar_aircraft_X_direction",
    RadarAircraftXSpeed = "radar_aircraft_X_speed",
    RadarAircraftXAltitude = "radar_aircraft_X_altitude",
    RadarAircraftXAngle = "radar_aircraft_X_angle",
    RadarGroundXDistance = "radar_ground_X_distance",
    RadarGroundXDirection = "radar_ground_X_direction",
    RadarGroundXSpeed = "radar_ground_X_speed",
    RadarGroundXAltitude = "radar_ground_X_altitude",
    RadarGroundXAngle = "radar_ground_X_angle",
}

// ---------------------------------------------------------------------------
// Vehicle Variables
// ---------------------------------------------------------------------------

export enum VehicleBinaryVariable {
    NavigationLight = "navigation_light",       // *
    StrobeLight = "strobe_light",               // *
    TaxiLight = "taxi_light",                   // *
    LandingLight = "landing_light",             // *
    RunningLight = "running_light",             // *
    Headlight = "headlight",                    // *
    LeftTurnSignal = "left_turn_signal",        // *
    RightTurnSignal = "right_turn_signal",      // *
    AutopilotPresent = "autopilot_present",     // *
    AutopilotActive = "autopilot_active",       // *
    Door = "door",
    EnginesOn = "engines_on",
    EnginesStarting = "engines_starting",
    EnginesRunning = "engines_running",
    FlapsMoving = "flaps_moving",
    FlapsIncreasing = "flaps_increasing",
    FlapsDecreasing = "flaps_decreasing",
    Fueling = "fueling",
    GearPresent = "gear_present",
    GearSetpoint = "gear_setpoint",
    GearMoving = "gear_moving",
    Horn = "horn",
    Locked = "locked",
    BeaconConnected = "beacon_connected",
    MissileIncoming = "missile_incoming",
    PBrake = "p_brake",
    Reverser = "reverser",
    ReverserPresent = "reverser_present",
}

export enum VehicleAnalogVariable {
    Acceleration = "acceleration",
    Aileron = "aileron",
    Altitude = "altitude",
    Autopilot = "autopilot",                                // *
    BallastControl = "ballastControl",
    BeaconBearingSetpoint = "beacon_bearing_setpoint",
    BeaconBearingDelta = "beacon_bearing_delta",
    BeaconDirection = "beacon_direction",
    BeaconDistance = "beacon_distance",
    BeaconGlideslopeSetpoint = "beacon_glideslope_setpoint",
    BeaconGlideslopeActual = "beacon_glideslope_actual",
    BeaconGlideslopeDelta = "beacon_glideslope_delta",
    Brake = "brake",                                        // *
    ElectricPower = "electric_power",
    ElectricUsage = "electric_usage",                       // *
    Elevator = "elevator",
    FlapsActual = "flaps_actual",                           // *
    FlapsSetpoint = "flaps_setpoint",                       // *
    Fuel = "fuel",
    Heading = "heading",
    InputAileron = "input_aileron",                         // *
    InputElevator = "input_elevator",                       // *
    InputRudder = "input_rudder",                           // *
    LiftReserve = "lift_reserve",
    Mass = "mass",
    MissileHashDirection = "missile_#_direction",
    MissileHashDistance = "missile_#_distance",
    Pitch = "pitch",
    RoadAngleFront = "road_angle_front",
    RoadAngleRear = "road_angle_rear",
    Roll = "roll",
    Rudder = "rudder",
    Slip = "slip",
    SlipDegrees = "slip_degrees",
    SlipUndersteer = "slip_understeer",
    Speed = "speed",
    SpeedScaled = "speed_scaled",
    SpeedFactor = "speed_factor",
    Throttle = "throttle",                                  // *
    TrimAileron = "trim_aileron",
    TrimElevator = "trim_elevator",
    TrimRudder = "trim_rudder",
    TurnCoordinator = "turn_coordinator",
    TurnIndicator = "turn_indicator",
    PitchIndicator = "pitch_indicator",
    Velocity = "velocity",
    VelocityScaled = "velocity_scaled",
    VerticalSpeed = "vertical_speed",
    VerticalAcceleration = "vertical_acceleration",
    VerticalAccelerationScaled = "vertical_acceleration_scaled",
    LateralAcceleration = "lateral_acceleration",
    LateralAccelerationScaled = "lateral_acceleration_scaled",
    LoadFactor = "load_factor",
    LoadFactorScaled = "load_factor_scaled",
    Yaw = "yaw",
    Thrust = "thrust",
}

/**
 * Connection variable format: connection_groupIndex_connectionIndex_animation
 * or connection_groupIndex_animation (uses first/active connection in group).
 * Also available: connection_requested (set to group index to trigger connect/disconnect).
 */
export enum ConnectionAnimation {
    Present = "present",
    Connected = "connected",
    Pitch = "pitch",
    Roll = "roll",
    Yaw = "yaw",
}

// ---------------------------------------------------------------------------
// Part Variables (All Parts)
// ---------------------------------------------------------------------------

export enum PartVariable {
    Present = "part_present",
    IsMirrored = "part_ismirrored",
    IsOnFront = "part_isonfront",
    IsSpare = "part_isspare",
    OnVehicle = "part_onvehicle",
    AddedVehicle = "part_added_vehicle",
    RemovedVehicle = "part_removed_vehicle",
    AddedGround = "part_added_ground",
    RemovedGround = "part_removed_ground",
}

// ---------------------------------------------------------------------------
// Engine Variables
// ---------------------------------------------------------------------------

export enum EngineBinaryVariable {
    ClutchUpshift = "engine_clutch_upshift",
    ClutchDownshift = "engine_clutch_downshift",
    IsAutomatic = "isAutomatic",
    BadShift = "engine_badshift",
    Reversed = "engine_reversed",
    Magneto = "engine_magneto",
    Starter = "engine_starter",
    StarterHand = "engine_starter_hand",
    Running = "engine_running",
    Powered = "engine_powered",
    ShiftUp = "engine_shift_up",                // *
    ShiftDown = "engine_shift_down",            // *
    ShiftNeutral = "engine_shift_neutral",      // *
    JumperCable = "engine_jumper_cable",
    Backfired = "engine_backfired",
    PistonXYZCrank = "engine_piston_X_Y_Z_crank",
    PistonXYZCam = "engine_pistion_X_Y_Z_cam",
}

export enum EngineAnalogVariable {
    Rotation = "engine_rotation",
    Sin = "engine_sin",
    Cos = "engine_cos",
    DriveshaftRotation = "engine_driveshaft_rotation",
    DriveshaftSin = "engine_driveshaft_sin",
    DriveshaftCos = "engine_driveshaft_cos",
    RPM = "engine_rpm",
    MaxRPM = "maxRPM",
    IdleRPM = "idleRPM",
    StartRPM = "startRPM",
    StallRPM = "stallRPM",
    RevlimitRPM = "revlimitRPM",
    RPMPercent = "engine_rpm_percent",
    RPMPercentSafe = "engine_rpm_percent_safe",
    RPMPercentRevlimit = "engine_rpm_percent_revlimit",
    FuelConsumption = "fuelConsumption",
    FuelFlow = "engine_fuel_flow",
    FuelRemaining = "engine_fuel_remaining",
    Temp = "engine_temp",
    TempAmbient = "engine_temp_ambient",
    Pressure = "engine_pressure",
    Gear = "engine_gear",
    GearRatio = "gearRatio",
    Gearshift = "engine_gearshift",
    GearshiftHVertical = "engine_gearshift_hvertical",
    GearshiftHHorizontal = "engine_gearshift_hhorizontal",
    Hours = "engine_hours",
}

// ---------------------------------------------------------------------------
// Gun Variables
// ---------------------------------------------------------------------------

export enum GunBinaryVariable {
    InHand = "gun_inhand",
    ControllerFirstPerson = "gun_controller_firstperson",
    InHandEquipped = "gun_inhand_equipped",
    InHandSneaking = "gun_inhand_sneaking",
    InHandAiming = "gun_inhand_aiming",
    Active = "gun_active",
    Firing = "gun_firing",
    FiringRequested = "firingRequested",        // *
    AbleToFire = "ableToFire",                  // *
    LockedOn = "gun_lockedon",
    Pitching = "gun_pitching",
    Yawing = "gun_yawing",
    Fired = "gun_fired",
    MuzzleFlash = "gun_muzzleflash",
    Cooldown = "gun_cooldown",
    WindupComplete = "gun_windup_complete",
    Reload = "gun_reload",
    ReloadWindup = "gun_reload_windup",
    ReloadMain = "gun_reload_main",
    ReloadWinddown = "gun_reload_winddown",
    AmmoXLoaded = "gun_ammo_X_loaded",
    BulletPresent = "gun_bullet_present",
}

export enum GunAnalogVariable {
    Pitch = "gun_pitch",
    Yaw = "gun_yaw",
    WindupTime = "gun_windup_time",
    WindupRotation = "gun_windup_rotation",
    AmmoCount = "gun_ammo_count",
    AmmoCountReloading = "gun_ammo_count_reloading",
    AmmoPercent = "gun_ammo_percent",
    LockedOnX = "gun_lockedon_x",
    LockedOnY = "gun_lockedon_y",
    LockedOnZ = "gun_lockedon_z",
    LockedOnDirection = "gun_lockedon_direction",
    LockedOnAngle = "gun_lockedon_angle",
    LockedOnLeadpointDirection = "gun_lockedon_leadpoint_direction",
    LockedOnLeadpointAngle = "gun_lockedon_leadpoint_angle",
    LockedOnLeadAngleX = "gun_lockedon_leadangle_x",
    LockedOnLeadAngleY = "gun_lockedon_leadangle_y",
    LockedOnDistance = "gun_lockedon_distance",
    BulletX = "gun_bullet_x",
    BulletY = "gun_bullet_y",
    BulletZ = "gun_bullet_z",
    BulletYaw = "gun_bullet_yaw",
    BulletPitch = "gun_bullet_pitch",
    ActiveMuzzleGroup = "gun_active_muzzlegroup",
}

export enum GunTextVariable {
    LockedOnName = "gun_lockedon_name",
}

// ---------------------------------------------------------------------------
// Interactable Variables
// ---------------------------------------------------------------------------

export enum InteractableVariable {
    CountStacks = "interactable_count_stacks",
    CountItems = "interactable_count_items",
    Percent = "interactable_percent",
    Capacity = "interactable_capacity",
    Fuel = "interactable_fuel",
    Remaining = "interactable_remaining",
    FluidX = "interactable_fluid_x",
}

// ---------------------------------------------------------------------------
// Propeller Variables
// ---------------------------------------------------------------------------

export enum PropellerVariable {
    PitchDeg = "propeller_pitch_deg",
    PitchIn = "propeller_pitch_in",
    PitchPercent = "propeller_pitch_percent",
    Rotation = "propeller_rotation",
    RPM = "propeller_rpm",
}

// ---------------------------------------------------------------------------
// Ground Device Variables
// ---------------------------------------------------------------------------

export enum GroundDeviceVariable {
    OnGround = "ground_onground",
    IsFlat = "ground_isflat",
    Striking = "ground_striking",
    Skidding = "ground_skidding",
    Slipping = "ground_slipping",
    BlocknameX = "ground_blockname_XXXXX",
    BlockmaterialX = "ground_blockmaterial_XXXXX",
    Rotation = "ground_rotation",
    RotationNormalized = "ground_rotation_normalized",
    Distance = "ground_distance",
    AngularVelocity = "ground_angular_velocity",
    AngularVelocityScaled = "ground_angular_velocity_scaled",
}

// ---------------------------------------------------------------------------
// Seat Variables
// ---------------------------------------------------------------------------

export enum SeatVariable {
    Occupied = "seat_occupied",
    OccupiedClient = "seat_occupied_client",
    RiderYaw = "seat_rider_yaw",
    RiderPitch = "seat_rider_pitch",
}

// ---------------------------------------------------------------------------
// Effector Variables
// ---------------------------------------------------------------------------

export enum EffectorVariable {
    Active = "effector_active",
    Operated = "effector_operated",
    DrillBroken = "effector_drill_broken",
    DrillMax = "effector_drill_max",
    DrillPercentage = "effector_drill_percentage",
}

// ---------------------------------------------------------------------------
// Block Variables
// ---------------------------------------------------------------------------

export enum BlockVariable {
    RedstoneActive = "redstone_active",
    RedstoneLevel = "redstone_level",
}

export enum DecorVariable {
    Clicked = "clicked",
    Activated = "activated",
    InventoryCount = "inventory_count",
    InventoryPercent = "inventory_percent",
    InventoryCapacity = "inventory_capacity",
    FuelPumpActive = "fuelpump_active",
    FuelPumpFree = "fuelpump_free",
    FuelPumpStored = "fuelpump_stored",
    FuelPumpDispensed = "fuelpump_dispensed",
    FuelPumpPurchased = "fuelpump_purchased",
    FuelPumpFluid = "fuelpump_fluid",
    FuelPumpFluidX = "fuelpump_fluid_x",
    ChargerActive = "charger_active",
    ChargerFree = "charger_free",
    ChargerDispensed = "charger_dispensed",
    ChargerPurchased = "charger_purchased",
    ChargerVehiclePercentage = "charger_vehicle_percentage",
    TankLoadingActive = "tank_loading_active",
    TankUnloadingActive = "tank_unloading_active",
    TankBufferActive = "tank_buffer_active",
}

export enum PoleVariable {
    Linked = "linked",
    SlabPresentUp = "slab_present_up",
    SlabPresentDown = "slab_present_down",
    NeighborPresentAxis = "neighbor_present_<AXIS>",
    MatchingPresentAxis = "matching_present_<AXIS>",
    SolidPresentAxis = "solid_present_<AXIS>",
}

// ---------------------------------------------------------------------------
// Bullet Variables
// ---------------------------------------------------------------------------

export enum BulletVariable {
    Hit = "bullet_hit",
    HitBlock = "bullet_hit_block",
    HitEntity = "bullet_hit_entity",
    HitVehicle = "bullet_hit_vehicle",
    HitArmor = "bullet_hit_armor",
    HitBurst = "bullet_hit_burst",
    HitPenetrated = "bullet_hit_penetrated",
    Burntime = "bullet_burntime",
}

// ---------------------------------------------------------------------------
// Union type for use in animation variable fields
// ---------------------------------------------------------------------------

export type AnimationVariable =
    | GlobalBinaryVariable
    | GlobalAnalogVariable
    | VehicleBinaryVariable
    | VehicleAnalogVariable
    | PartVariable
    | EngineBinaryVariable
    | EngineAnalogVariable
    | GunBinaryVariable
    | GunAnalogVariable
    | GunTextVariable
    | InteractableVariable
    | PropellerVariable
    | GroundDeviceVariable
    | SeatVariable
    | EffectorVariable
    | BlockVariable
    | DecorVariable
    | PoleVariable
    | BulletVariable
    | (string & {}); // allows custom/parameterized variables while keeping autocomplete

export const AnimationVariables = {
    GlobalBinary: GlobalBinaryVariable,
    GlobalAnalog: GlobalAnalogVariable,
    VehicleBinary: VehicleBinaryVariable,
    VehicleAnalog: VehicleAnalogVariable,
    Part: PartVariable,
    EngineBinary: EngineBinaryVariable,
    EngineAnalog: EngineAnalogVariable,
    GunBinary: GunBinaryVariable,
    GunAnalog: GunAnalogVariable,
    GunText: GunTextVariable,
    Interactable: InteractableVariable,
    Propeller: PropellerVariable,
    GroundDevice: GroundDeviceVariable,
    Seat: SeatVariable,
    Effector: EffectorVariable,
    Block: BlockVariable,
    Decor: DecorVariable,
    Pole: PoleVariable,
    Bullet: BulletVariable,
} as const;