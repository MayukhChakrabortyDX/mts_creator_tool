//! REVIEW INCOMPLETE

import { JSONDefs, type Versions } from "./json";

/**
 * Conventional connection types from the MTS Part Pack Conventions.
 * Following these ensures cross-pack compatibility.
 *
 * Trailer types (hitch/hookup):
 * - `trailer_fifthwheel`  — Common truck trailer. Height: 20px
 * - `trailer_ring`        — Road trains, farm equipment, civilian trailers. Height: 10.5px
 * - `trailer_standard`    — Standard ball-type civilian trailers. Height: 8px
 *
 * Tow truck types (tow trucks use these as hitches; towed vehicles use them as hookups):
 * - `tow_bumper`          — Front bumper hookup. Place on every vehicle so it can be towed.
 * - `tow_bumper_heavy`    — Heavy duty variant of tow_bumper.
 * - `tow_wheel`           — Wheel-lift towing. Height: wheel mount Y - wheel radius.
 * - `tow_wheel_heavy`     — Heavy duty variant of tow_wheel.
 * - `tow_wheel_motorcycle`— Motorcycle variant of tow_wheel.
 *
 * Custom types are also permitted for pack-specific connections.
 */
export type ConnectionType =
    | "trailer_fifthwheel"
    | "trailer_ring"
    | "trailer_standard"
    | "tow_bumper"
    | "tow_bumper_heavy"
    | "tow_wheel"
    | "tow_wheel_heavy"
    | "tow_wheel_motorcycle"
    | (string & {}); // allows custom types while keeping autocomplete for the above

export type ConnectionProps = {
    /**
     * The type of connection. Use a conventional type where possible for cross-pack
     * compatibility. Custom strings are allowed for pack-specific connections.
     */
    type: ConnectionType;

    /**
     * The position of this connection on the vehicle.
     * No two connections may share the same position, and 0,0,0 is not permitted.
     */
    pos: [number, number, number];

    /**
     * The rotation of this connection. Only has effect on mounted and restricted connections.
     */
    rot: [number, number, number];

    /**
     * If true, connecting vehicles are mounted to this point rather than dragged.
     * Useful for flat-bed trailers where the connected vehicle should stay in place.
     */
    mounted: boolean;

    /**
     * If true, connecting vehicles are restricted to pitch changes only — yaw is not permitted.
     */
    restricted: boolean;

    /**
     * How far away this connection can reach. Defaults to 2 blocks if omitted.
     */
    distance: number;

    /**
     * If set, this connection will be repositioned based on the animations of the
     * specified object.
     */
    applyAfter: string;
}

export type ConnectionGroupProps = {
    /**
     * The display name of this group, shown in the vehicle panel.
     */
    name: string;

    /**
     * If true, a button appears in the panel allowing the player to initiate
     * all connections in this group.
     */
    canInitiateConnections: boolean;

    /**
     * If true, any connection/disconnect buttons that would appear on a towed
     * vehicle's panel will also appear on this vehicle's panel when connected via
     * this group. Useful for multi-trailer semi trucks.
     * Only applies to the hookup side of the connection.
     */
    canInitiateSubConnections: boolean;

    /**
     * If true, this group can tow hookup groups.
     */
    isHitch: boolean;

    /**
     * If true, this group can be towed by hitch groups.
     * A group can be both a hitch and a hookup simultaneously — useful for train couplers.
     */
    isHookup: boolean;

    /**
     * If true, this group will auto-connect to any valid nearby connections.
     * It will only disconnect when disabled (via hitbox click or panel button).
     * Re-enables itself after moving double the connection distance away.
     */
    isSnap: boolean;

    /**
     * The list of connections in this group.
     * Only one vehicle may be connected per group at any given time.
     */
    connections: Partial<ConnectionProps>[];
}

export class ConnectionGroup extends JSONDefs {

    name?: string;
    canInitiateConnections?: boolean;
    canInitiateSubConnections?: boolean;
    isHitch?: boolean;
    isHookup?: boolean;
    isSnap?: boolean;
    connections?: Partial<ConnectionProps>[];

    constructor(properties: Partial<ConnectionGroupProps>) {
        super();
        this.name = properties.name;
        this.canInitiateConnections = properties.canInitiateConnections;
        this.canInitiateSubConnections = properties.canInitiateSubConnections;
        this.isHitch = properties.isHitch;
        this.isHookup = properties.isHookup;
        this.isSnap = properties.isSnap;
        this.connections = properties.connections;
    }

    override toJSON(version: Versions): object {
        return {
            connectionGroups: {
                name: this.name,
                canInitiateConnections: this.canInitiateConnections,
                canInitiateSubConnections: this.canInitiateSubConnections,
                isHitch: this.isHitch,
                isHookup: this.isHookup,
                isSnap: this.isSnap,
                connections: this.connections,
            }
        };
    }

}