//! REVIEW INCOMPLETE

import { JSONDefs, type Versions } from "./json";

// =============================================================================
// Enums
// =============================================================================

export enum RoadType {
    /**
     * Static core component. Must be placed before any other road components.
     * Has defined lanes, paths, and collision.
     */
    CoreStatic  = "core_static",

    /**
     * Dynamic core component. Must be placed before any other road components.
     * Has flexible collision and lane paths, but defined lane counts and offsets.
     */
    CoreDynamic = "core_dynamic",
}

// =============================================================================
// Sector End Point
// =============================================================================

export type SectorEndPointProps = {
    /**
     * The ending position for this sector end point.
     */
    pos: [number, number, number];

    /**
     * The ending rotation for this sector end point.
     */
    angles: [number, number, number];
}

// =============================================================================
// Lane
// =============================================================================

export type LaneProps = {
    /**
     * The starting point for this lane.
     * Vehicles arriving at a junction only transition to the next road segment
     * if a start position exists — this allows merge areas (two lanes into one)
     * and one-way roads.
     * Note: does NOT account for the road's collision height; adjust as needed.
     */
    startPoint: [number, number, number];

    /**
     * A list of end points for this lane.
     * These will typically match the start points of lanes from other sectors,
     * forming the connections through an intersection.
     */
    endPoints: Partial<SectorEndPointProps>[];
}

// =============================================================================
// Sector
// =============================================================================

export type SectorProps = {
    /**
     * The start position for this sector — should be the right-most side.
     * For example, the south-facing sector of a 4-way intersection starts at 0,0,0.
     */
    sectorStartPos: [number, number, number];

    /**
     * The start angles for this sector.
     * Roads are normally oriented heading south; angles applied here modify that.
     * Pitch and roll are supported but are not considered during connection checks.
     */
    sectorStartAngles: [number, number, number];

    /**
     * How far from the start position the border of this sector is.
     * Used to calculate the total road width, similar to `borderOffset` on
     * dynamic road components.
     */
    borderOffset: number;

    /**
     * The list of lanes that make up the paths for this sector.
     */
    lanes: Partial<LaneProps>[];
}

// =============================================================================
// Collision Area
// =============================================================================

export type CollisionAreaProps = {
    /**
     * The first corner of this collision area.
     * The Y position must match `secondCorner`'s Y position exactly.
     * For collision over 1 block high, define additional collision areas at
     * higher Y positions.
     */
    firstCorner: [number, number, number];

    /**
     * The second corner of this collision area.
     * The Y position MUST be the same as `firstCorner`.
     */
    secondCorner: [number, number, number];

    /**
     * The height of collision for this area, in pixels.
     * Must not exceed 15 (cannot go above one full block height per area).
     * Stack multiple areas at increasing Y positions for taller collision.
     */
    collisionHeight: number;
}

// =============================================================================
// Road Props
// =============================================================================

export type RoadProps = {
    /**
     * The type of this road component. Determines its properties and behaviour.
     */
    type: RoadType;

    /**
     * The X offsets for each lane on a dynamic core component.
     * 0 starts at X = 0.
     * Only used when `type` is `RoadType.CoreDynamic`.
     */
    laneOffsets: number[];

    /**
     * The offset for the opposite side of the road on a dynamic core component.
     * Essentially defines the total width of the road.
     * Only used when `type` is `RoadType.CoreDynamic`.
     */
    borderOffset: number;

    /**
     * How long each repeating model segment is for this road.
     * Allows for variable-length model segments.
     */
    segmentLength: number;

    /**
     * The height of collision for this dynamic core component, in pixels.
     * Normally a low value.
     * Only used when `type` is `RoadType.CoreDynamic`.
     */
    collisionHeight: number;

    /**
     * A list of lane sectors defining the paths for this road.
     * Each sector represents one end of an intersection (e.g. a 4-way
     * intersection has 4 sectors). Sector properties determine which lanes
     * can connect and where.
     * Only used when `type` is `RoadType.CoreStatic`.
     */
    sectors: Partial<SectorProps>[];

    /**
     * A list of collision areas for this road component.
     * Normally a single square entry, but may extend in +Y for complex
     * components like bridges.
     * Only used when `type` is `RoadType.CoreStatic`.
     */
    collisionAreas: Partial<CollisionAreaProps>[];
}

// =============================================================================
// Class
// =============================================================================

export class Road extends JSONDefs {

    type?: RoadType;
    laneOffsets?: number[];
    borderOffset?: number;
    segmentLength?: number;
    collisionHeight?: number;
    sectors?: Partial<SectorProps>[];
    collisionAreas?: Partial<CollisionAreaProps>[];

    constructor(properties: Partial<RoadProps>) {
        super();
        this.type            = properties.type;
        this.laneOffsets     = properties.laneOffsets;
        this.borderOffset    = properties.borderOffset;
        this.segmentLength   = properties.segmentLength;
        this.collisionHeight = properties.collisionHeight;
        this.sectors         = properties.sectors;
        this.collisionAreas  = properties.collisionAreas;
    }

    override toJSON(version: Versions): object {
        return {
            road: {
                type:            this.type,
                laneOffsets:     this.laneOffsets,
                borderOffset:    this.borderOffset,
                segmentLength:   this.segmentLength,
                collisionHeight: this.collisionHeight,
                sectors:         this.sectors,
                collisionAreas:  this.collisionAreas,
            }
        };
    }

}