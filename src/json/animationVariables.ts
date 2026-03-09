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

export const GlobalBinaryVariables = [
    "text_X_present",
    "inliquid",
    "player_interacting",
    "player_crafteditem",
    "player_cursor_hovered",
    "collision_X_player_cursor_hovered",
    "random_flip",
    "damage_totaled",
    "collision_X_totaled",
    "repainted",
    "repaired",
    "config_simplethrottle",
    "config_innerwindows",
    "radar_detected",
    "radar_X_detected",
    "blockname_NAME",
    "blockmaterial_NAME",
    "terrain_blockname_NAME",
    "terrain_blockmaterial_NAME",
    "XXX_YYY_ZZZ_cycle",
    "radio_active",
] as const;

export const GlobalAnalogVariables = [
    "light_sunlight",
    "light_total",
    "snowfall_strength",
    "rain_strength",
    "rain_sin",
    "rain_cos",
    "tick",
    "tick_sin",
    "tick_cos",
    "time",
    "terrain_distance",
    "posX",
    "posY",
    "posZ",
    "damage",
    "damage_percent",
    "collision_X_damage",
    "textureIndex",
    "distance_client",
    "orientation_client_x",
    "orientation_client_y",
    "orientation_client_z",
    "random",
    "radio_volume",
    "radio_preset",
    "radar_X_distance",
    "radar_X_direction",
    "radar_aircraft_X_distance",
    "radar_aircraft_X_direction",
    "radar_aircraft_X_speed",
    "radar_aircraft_X_altitude",
    "radar_aircraft_X_angle",
    "radar_ground_X_distance",
    "radar_ground_X_direction",
    "radar_ground_X_speed",
    "radar_ground_X_altitude",
    "radar_ground_X_angle",
] as const;

// ---------------------------------------------------------------------------
// Vehicle Variables
// ---------------------------------------------------------------------------

export const VehicleBinaryVariables = [
    "navigation_light",     // *
    "strobe_light",         // *
    "taxi_light",           // *
    "landing_light",        // *
    "running_light",        // *
    "headlight",            // *
    "left_turn_signal",     // *
    "right_turn_signal",    // *
    "autopilot_present",    // *
    "autopilot_active",     // *
    "door",
    "engines_on",
    "engines_starting",
    "engines_running",
    "flaps_moving",
    "flaps_increasing",
    "flaps_decreasing",
    "fueling",
    "gear_present",
    "gear_setpoint",
    "gear_moving",
    "horn",
    "locked",
    "beacon_connected",
    "missile_incoming",
    "p_brake",
    "reverser",
    "reverser_present",
] as const;

export const VehicleAnalogVariables = [
    "acceleration",
    "aileron",
    "altitude",
    "autopilot",            // *
    "ballastControl",
    "beacon_bearing_setpoint",
    "beacon_bearing_delta",
    "beacon_direction",
    "beacon_distance",
    "beacon_glideslope_setpoint",
    "beacon_glideslope_actual",
    "beacon_glideslope_delta",
    "brake",                // *
    "electric_power",
    "electric_usage",       // *
    "elevator",
    "flaps_actual",         // *
    "flaps_setpoint",       // *
    "fuel",
    "heading",
    "input_aileron",        // *
    "input_elevator",       // *
    "input_rudder",         // *
    "lift_reserve",
    "mass",
    "missile_#_direction",
    "missile_#_distance",
    "pitch",
    "road_angle_front",
    "road_angle_rear",
    "roll",
    "rudder",
    "slip",
    "slip_degrees",
    "slip_understeer",
    "speed",
    "speed_scaled",
    "speed_factor",
    "throttle",             // *
    "trim_aileron",
    "trim_elevator",
    "trim_rudder",
    "turn_coordinator",
    "turn_indicator",
    "pitch_indicator",
    "velocity",
    "velocity_scaled",
    "vertical_speed",
    "vertical_acceleration",
    "vertical_acceleration_scaled",
    "lateral_acceleration",
    "lateral_acceleration_scaled",
    "load_factor",
    "load_factor_scaled",
    "yaw",
    "thrust",
] as const;

/**
 * Connection variable format: connection_groupIndex_connectionIndex_animation
 * or connection_groupIndex_animation (uses first/active connection in group).
 * Also available: connection_requested (set to group index to trigger connect/disconnect).
 */
export const ConnectionAnimations = [
    "present",
    "connected",
    "pitch",
    "roll",
    "yaw",
] as const;

// ---------------------------------------------------------------------------
// Part Variables (All Parts)
// ---------------------------------------------------------------------------

export const PartVariables = [
    "part_present",
    "part_ismirrored",
    "part_isonfront",
    "part_isspare",
    "part_onvehicle",
    "part_added_vehicle",
    "part_removed_vehicle",
    "part_added_ground",
    "part_removed_ground",
] as const;

// ---------------------------------------------------------------------------
// Engine Variables
// ---------------------------------------------------------------------------

export const EngineBinaryVariables = [
    "engine_clutch_upshift",
    "engine_clutch_downshift",
    "isAutomatic",
    "engine_badshift",
    "engine_reversed",
    "engine_magneto",
    "engine_starter",
    "engine_starter_hand",
    "engine_running",
    "engine_powered",
    "engine_shift_up",      // *
    "engine_shift_down",    // *
    "engine_shift_neutral", // *
    "engine_jumper_cable",
    "engine_backfired",
    "engine_piston_X_Y_Z_crank",
    "engine_pistion_X_Y_Z_cam",
] as const;

export const EngineAnalogVariables = [
    "engine_rotation",
    "engine_sin",
    "engine_cos",
    "engine_driveshaft_rotation",
    "engine_driveshaft_sin",
    "engine_driveshaft_cos",
    "engine_rpm",
    "maxRPM",
    "idleRPM",
    "startRPM",
    "stallRPM",
    "revlimitRPM",
    "engine_rpm_percent",
    "engine_rpm_percent_safe",
    "engine_rpm_percent_revlimit",
    "fuelConsumption",
    "engine_fuel_flow",
    "engine_fuel_remaining",
    "engine_temp",
    "engine_temp_ambient",
    "engine_pressure",
    "engine_gear",
    "gearRatio",
    "engine_gearshift",
    "engine_gearshift_hvertical",
    "engine_gearshift_hhorizontal",
    "engine_hours",
] as const;

// ---------------------------------------------------------------------------
// Gun Variables
// ---------------------------------------------------------------------------

export const GunBinaryVariables = [
    "gun_inhand",
    "gun_controller_firstperson",
    "gun_inhand_equipped",
    "gun_inhand_sneaking",
    "gun_inhand_aiming",
    "gun_active",
    "gun_firing",
    "firingRequested",      // *
    "ableToFire",           // *
    "gun_lockedon",
    "gun_pitching",
    "gun_yawing",
    "gun_fired",
    "gun_muzzleflash",
    "gun_cooldown",
    "gun_windup_complete",
    "gun_reload",
    "gun_reload_windup",
    "gun_reload_main",
    "gun_reload_winddown",
    "gun_ammo_X_loaded",
    "gun_bullet_present",
] as const;

export const GunAnalogVariables = [
    "gun_pitch",
    "gun_yaw",
    "gun_windup_time",
    "gun_windup_rotation",
    "gun_ammo_count",
    "gun_ammo_count_reloading",
    "gun_ammo_percent",
    "gun_lockedon_x",
    "gun_lockedon_y",
    "gun_lockedon_z",
    "gun_lockedon_direction",
    "gun_lockedon_angle",
    "gun_lockedon_leadpoint_direction",
    "gun_lockedon_leadpoint_angle",
    "gun_lockedon_leadangle_x",
    "gun_lockedon_leadangle_y",
    "gun_lockedon_distance",
    "gun_bullet_x",
    "gun_bullet_y",
    "gun_bullet_z",
    "gun_bullet_yaw",
    "gun_bullet_pitch",
    "gun_active_muzzlegroup",
] as const;

export const GunTextVariables = [
    "gun_lockedon_name",
] as const;

// ---------------------------------------------------------------------------
// Interactable Variables
// ---------------------------------------------------------------------------

export const InteractableVariables = [
    "interactable_count_stacks",
    "interactable_count_items",
    "interactable_percent",
    "interactable_capacity",
    "interactable_fuel",
    "interactable_remaining",
    "interactable_fluid_x",
] as const;

// ---------------------------------------------------------------------------
// Propeller Variables
// ---------------------------------------------------------------------------

export const PropellerVariables = [
    "propeller_pitch_deg",
    "propeller_pitch_in",
    "propeller_pitch_percent",
    "propeller_rotation",
    "propeller_rpm",
] as const;

// ---------------------------------------------------------------------------
// Ground Device Variables
// ---------------------------------------------------------------------------

export const GroundDeviceVariables = [
    "ground_onground",
    "ground_isflat",
    "ground_striking",
    "ground_skidding",
    "ground_slipping",
    "ground_blockname_XXXXX",
    "ground_blockmaterial_XXXXX",
    "ground_rotation",
    "ground_rotation_normalized",
    "ground_distance",
    "ground_angular_velocity",
    "ground_angular_velocity_scaled",
] as const;

// ---------------------------------------------------------------------------
// Seat Variables
// ---------------------------------------------------------------------------

export const SeatVariables = [
    "seat_occupied",
    "seat_occupied_client",
    "seat_rider_yaw",
    "seat_rider_pitch",
] as const;

// ---------------------------------------------------------------------------
// Effector Variables
// ---------------------------------------------------------------------------

export const EffectorVariables = [
    "effector_active",
    "effector_operated",
    "effector_drill_broken",
    "effector_drill_max",
    "effector_drill_percentage",
] as const;

// ---------------------------------------------------------------------------
// Block Variables
// ---------------------------------------------------------------------------

export const BlockVariables = [
    "redstone_active",
    "redstone_level",
] as const;

export const DecorVariables = [
    "clicked",
    "activated",
    "inventory_count",
    "inventory_percent",
    "inventory_capacity",
    "fuelpump_active",
    "fuelpump_free",
    "fuelpump_stored",
    "fuelpump_dispensed",
    "fuelpump_purchased",
    "fuelpump_fluid",
    "fuelpump_fluid_x",
    "charger_active",
    "charger_free",
    "charger_dispensed",
    "charger_purchased",
    "charger_vehicle_percentage",
    "tank_loading_active",
    "tank_unloading_active",
    "tank_buffer_active",
] as const;

export const PoleVariables = [
    "linked",
    "slab_present_up",
    "slab_present_down",
    "neighbor_present_<AXIS>",
    "matching_present_<AXIS>",
    "solid_present_<AXIS>",
] as const;

// ---------------------------------------------------------------------------
// Bullet Variables
// ---------------------------------------------------------------------------

export const BulletVariables = [
    "bullet_hit",
    "bullet_hit_block",
    "bullet_hit_entity",
    "bullet_hit_vehicle",
    "bullet_hit_armor",
    "bullet_hit_burst",
    "bullet_hit_penetrated",
    "bullet_burntime",
] as const;

// ---------------------------------------------------------------------------
// Union type for use in animation variable fields
// ---------------------------------------------------------------------------

export type AnimationVariable =
    | typeof GlobalBinaryVariables[number]
    | typeof GlobalAnalogVariables[number]
    | typeof VehicleBinaryVariables[number]
    | typeof VehicleAnalogVariables[number]
    | typeof PartVariables[number]
    | typeof EngineBinaryVariables[number]
    | typeof EngineAnalogVariables[number]
    | typeof GunBinaryVariables[number]
    | typeof GunAnalogVariables[number]
    | typeof GunTextVariables[number]
    | typeof InteractableVariables[number]
    | typeof PropellerVariables[number]
    | typeof GroundDeviceVariables[number]
    | typeof SeatVariables[number]
    | typeof EffectorVariables[number]
    | typeof BlockVariables[number]
    | typeof DecorVariables[number]
    | typeof PoleVariables[number]
    | typeof BulletVariables[number]
    | (string & {}); // allows custom/parameterized variables while keeping autocomplete