//! REVIEW INCOMPLETE

import { JSONDefs, type Versions } from "./json";
import { type AnimationProps } from "./animation";
import { type ConditionProps } from "./conditions";
import { type PotionEffectProps } from "./potionEffect";
import { type AnimationVariable } from "./animationVariables";
import type { PartConvention } from "./partConvention";
import type { Expand } from "../utils/expand";

export enum GroundDevicePosition {
    FrontLeft   = "front_left",
    FrontRight  = "front_right",
    FrontCenter = "front_center",
    RearLeft    = "rear_left",
    RearRight   = "rear_right",
    RearCenter  = "rear_center",
}

export type TreadPathEntry = {
    /**
     * The name of the object on the model that defines this point in the tread path.
     */
    objectName: string;
}

export type PartSlotProps = {
    /**
     * The x,y,z center point where this part attaches.
     * Parts with a negative X position will have part_ismirrored set to 1.
     */
    pos: [number, number, number];

    /**
     * The x,y,z rotations applied to this part slot.
     * May be omitted if no rotation is desired.
     */
    rot: [number, number, number];

    /**
     * If true, this part will be used to steer the vehicle.
     * Visual turning must be handled separately in the animation block.
     */
    turnsWithSteer: boolean;

    /**
     * If true, the seat at this location is a controller seat, allowing the
     * occupant to control the vehicle. Multiple controller seats are permitted
     * (e.g. pilot and co-pilot), and all inputs are handled equally.
     */
    isController: boolean;

    /**
     * If true, this part is located outside the vehicle.
     * Only used for seats — MTS will treat the player as standing outside
     * the vehicle for sound purposes.
     */
    isExterior: boolean;

    /**
     * If true, the part in this slot cannot be removed.
     * Useful in conjunction with `defaultPart` for parts that animate
     * sections of the vehicle and should never be changed.
     */
    isPermanent: boolean;

    /**
     * If true, this part is marked as a spare.
     * Ground devices in spare slots are excluded from ground operations.
     * Guns in spare slots cannot be fired or selected.
     * Useful for decorations like spare tires and gun racks.
     */
    isSpare: boolean;

    /**
     * If true, this part is flagged as mirrored.
     * Causes ground devices to return negative rotation values for rotation variables,
     * and sets part_ismirrored on the part. Useful for mirrored wheels, seats, and doors.
     */
    isMirrored: boolean;

    /**
     * If true, and this slot is on a seat, the player can deselect all guns
     * when selecting from this seat. Useful when guns should not always be active.
     */
    canDisableGun: boolean;

    /**
     * If true, the gun in this slot will return to its default yaw and pitch
     * when not active.
     */
    resetPosition: boolean;

    /**
     * If true, and this slot contains a gun, the gun can control the parent gun
     * when active. Allows switching to sub-guns (e.g. SMGs on turrets) while
     * still moving the turret without firing it.
     */
    isCoAxial: boolean;

    /**
     * If true, custom cameras for this slot will always be used in first-person mode.
     * Designed for seats where first-person is undesirable (e.g. tanks, gunner pods).
     * Does not affect third-person mode.
     */
    forceCameras: boolean;

    /**
     * The list of part types accepted by this slot.
     * Usually one entry, though multiple types can be listed for flexible slots
     * (e.g. a slot accepting both seats and chests).
     */
    types: PartConvention[];

    /**
     * If set, this slot will only accept parts whose customType matches one of
     * the entries in this list. A blank entry ("") permits parts with no customType.
     * Useful for restricting slots to specific part subsets or pack-specific parts.
     */
    customTypes: PartConvention[];

    /**
     * If set, this slot only accepts parts on the specified definition subName variants.
     * Used for variant-specific configurations such as police variants of vehicles.
     */
    validSubNames: PartConvention[];

    /**
     * If set, the part in this slot will attempt to match the specified tone index
     * when the vehicle is painted. Default parts match tones automatically;
     * hand-placed parts will not change unless manually painted.
     */
    toneIndex: number;

    /**
     * How many levels deep parts in this slot allow sub-parts to be stacked.
     */
    maxPartLevels: number;

    /**
     * The minimum accepted value for parts in this slot.
     * Engines use fuelConsumption, ground devices and propellers use diameter.
     * Parts below this value appear as red holograms.
     */
    minValue: number;

    /**
     * The maximum accepted value for parts in this slot.
     */
    maxValue: number;

    /**
     * The minimum yaw for a gun in this slot, in degrees.
     * If minYaw is -180 and maxYaw is 180, all yaw bounds checks are bypassed
     * and the gun can rotate a full 360 degrees.
     */
    minYaw: number;

    /**
     * The maximum yaw for a gun in this slot, in degrees.
     */
    maxYaw: number;

    /**
     * The default yaw for a gun in this slot.
     * Used when `resetPosition` is true. Clamped to minYaw/maxYaw.
     */
    defaultYaw: number;

    /**
     * How fast the gun in this slot can rotate in yaw, in degrees per tick.
     * If both this and the part's own value are set, the lower value is used.
     */
    yawSpeed: number;

    /**
     * The minimum pitch for a gun in this slot, in degrees.
     */
    minPitch: number;

    /**
     * The maximum pitch for a gun in this slot, in degrees.
     */
    maxPitch: number;

    /**
     * The default pitch for a gun in this slot.
     * Used when `resetPosition` is true. Clamped to minPitch/maxPitch.
     */
    defaultPitch: number;

    /**
     * How fast the gun in this slot can rotate in pitch, in degrees per tick.
     * If both this and the part's own value are set, the lower value is used.
     */
    pitchSpeed: number;

    /**
     * If this slot is for an engine, defines how far above the engine the intake is.
     * Used to prevent the engine from drowning when submerged.
     * Mainly used in SUVs and military vehicles.
     */
    intakeOffset: number;

    /**
     * If set, creates an extra collision box offset in the +Z direction by this amount
     * when the part is placed on a vehicle. Useful for treads whose length depends on
     * the vehicle. Overrides the same parameter in the part JSON if set.
     */
    extraCollisionBoxOffset: number;

    /**
     * The width of the holographic slot box for this slot.
     * Does not apply to generic parts which use their defined size.
     */
    slotWidth: number;

    /**
     * The height of the holographic slot box for this slot.
     */
    slotHeight: number;

    /**
     * A list of model objects defining the tread path for a tread part in this slot.
     * The tread starts at the bottom of the first roller and follows the path
     * back to the first roller.
     */
    treadPath: TreadPathEntry[];

    /**
     * If set, treads along the top rollers will droop by this amount.
     * Higher values mean less droop. Keep idler roller spacing consistent
     * to avoid uneven droop across the tread.
     */
    treadDroopConstant: number;

    /**
     * If set, the part will be scaled to this x,y,z value as its base scale.
     * Future scaling will multiply this value.
     */
    partScale: [number, number, number];

    /**
     * If set, the player will be scaled to this x,y,z value when sitting in this seat.
     * Multiplied by any scaling applied by the seat itself.
     * Can be used to make the player invisible with a sufficiently small value.
     */
    playerScale: [number, number, number];

    /**
     * If set, the player will dismount at this position instead of the default
     * left/right of the seat. If the position is blocked, MTS falls back to
     * Minecraft's default dismount logic. Set this for vehicles with complex hitboxes.
     */
    dismountPos: [number, number, number];

    /**
     * Potion effects applied to the rider while sitting in this seat slot.
     */
    seatEffects: Partial<PotionEffectProps>[];

    /**
     * The pack-qualified name of the part to place in this slot by default when
     * the vehicle is first spawned (e.g. "packID:partName").
     * MTS will not verify the part exists — ensure the pack is a dependency.
     * WARNING: Placing this on an additionalPart without the parent also having
     * a defaultPart WILL crash the game.
     */
    defaultPart: string;

    /**
     * Requests a part to transfer into or out of this slot via this variable.
     * Setting to true without a part attempts to grab one from the world.
     * Setting to true with a part drops it into the world.
     * Only works with parts that can be placed on the ground.
     * Resets to false after the operation completes.
     */
    transferVariable: AnimationVariable;

    /**
     * Like `defaultPart`, but maps variable values to specific parts.
     * The first valid entry whose variable is true will be used as the default part.
     */
    conditionalDefaultParts: Record<string, string>;

    /**
     * If true, the parent part can be removed even if this part is still installed.
     */
    allowParentRemoval: boolean;

    /**
     * A list of part slot indexes linked to this slot. Required for linking:
     * wheels to engines, propellers to engines, guns to controlling seats,
     * guns to ammo crates, and effectors to supply/drop crates.
     * Linking is bi-directional and recursive.
     */
    linkedParts: number[];

    /**
     * If set, this slot's animations will first apply the animations of the
     * specified rendering object before those defined here.
     * Resolved recursively if the referenced object also has an `applyAfter`.
     */
    applyAfter: string;

    /**
     * Manually defines which GroundDeviceBox this part is added to.
     * Only valid for ground devices.
     */
    groundDevicePosition: GroundDevicePosition;

    /**
     * Animations applied to move this part slot based on animation values.
     * Should only be used when the part physically needs to move
     * (e.g. retractable landing gear, offset gun mounting tracks).
     */
    animations: Partial<AnimationProps>[];

    /**
     * Conditions determining whether this part is active.
     * Defaults to always active if omitted.
     * Active state controls whether effectors effect, guns fire, seats can be sat in, etc.
     * Does NOT block placement or interaction — use `interactableVariables` for that.
     */
    activeAnimations: Partial<ConditionProps>[];

    /**
     * Conditions determining whether this part can be interacted with.
     * All conditions must be true for interaction to be permitted.
     * If false, the part also cannot be placed.
     * If this slot is a seat and the player enters it, all variables are set to false.
     * If the player exits, all variables are set to true (useful for auto doors).
     */
    interactableVariables: Partial<ConditionProps>[];

    /**
     * A double-nested list of variable sets. The part is locked unless all sets
     * evaluate as true (each set is OR'd internally, sets are AND'd together).
     */
    lockingVariables: AnimationVariable[][];

    /**
     * Additional constant values appended to the part's internal constantValues list.
     * Useful for activating specific internal features on a per-slot basis.
     */
    constantValues: Record<string, number>;
}

export class PartSlot extends JSONDefs {

    pos?: [number, number, number]; //!REVIEW
    rot?: [number, number, number];
    turnsWithSteer?: boolean;
    isController?: boolean;
    isExterior?: boolean;
    isPermanent?: boolean;
    isSpare?: boolean;
    isMirrored?: boolean;
    canDisableGun?: boolean;
    resetPosition?: boolean;
    isCoAxial?: boolean;
    forceCameras?: boolean;
    types?: string[];
    customTypes?: string[];
    validSubNames?: string[];
    toneIndex?: number;
    maxPartLevels?: number;
    minValue?: number;
    maxValue?: number;
    minYaw?: number;
    maxYaw?: number;
    defaultYaw?: number;
    yawSpeed?: number;
    minPitch?: number;
    maxPitch?: number;
    defaultPitch?: number;
    pitchSpeed?: number;
    intakeOffset?: number;
    extraCollisionBoxOffset?: number;
    slotWidth?: number;
    slotHeight?: number;
    treadPath?: TreadPathEntry[];
    treadDroopConstant?: number;
    partScale?: [number, number, number];
    playerScale?: [number, number, number];
    dismountPos?: [number, number, number];
    seatEffects?: Partial<PotionEffectProps>[];
    defaultPart?: string;
    transferVariable?: AnimationVariable;
    conditionalDefaultParts?: Record<string, string>;
    allowParentRemoval?: boolean;
    linkedParts?: number[];
    applyAfter?: string;
    groundDevicePosition?: GroundDevicePosition;
    animations?: Partial<AnimationProps>[];
    activeAnimations?: Partial<ConditionProps>[];
    interactableVariables?: Partial<ConditionProps>[];
    lockingVariables?: AnimationVariable[][];
    constantValues?: Record<string, number>;

    constructor(properties: Expand<Partial<PartSlotProps>>) {
        super();
        this.pos                    = properties.pos;
        this.rot                    = properties.rot;
        this.turnsWithSteer         = properties.turnsWithSteer;
        this.isController           = properties.isController;
        this.isExterior             = properties.isExterior;
        this.isPermanent            = properties.isPermanent;
        this.isSpare                = properties.isSpare;
        this.isMirrored             = properties.isMirrored;
        this.canDisableGun          = properties.canDisableGun;
        this.resetPosition          = properties.resetPosition;
        this.isCoAxial              = properties.isCoAxial;
        this.forceCameras           = properties.forceCameras;
        this.types                  = properties.types;
        this.customTypes            = properties.customTypes;
        this.validSubNames          = properties.validSubNames;
        this.toneIndex              = properties.toneIndex;
        this.maxPartLevels          = properties.maxPartLevels;
        this.minValue               = properties.minValue;
        this.maxValue               = properties.maxValue;
        this.minYaw                 = properties.minYaw;
        this.maxYaw                 = properties.maxYaw;
        this.defaultYaw             = properties.defaultYaw;
        this.yawSpeed               = properties.yawSpeed;
        this.minPitch               = properties.minPitch;
        this.maxPitch               = properties.maxPitch;
        this.defaultPitch           = properties.defaultPitch;
        this.pitchSpeed             = properties.pitchSpeed;
        this.intakeOffset           = properties.intakeOffset;
        this.extraCollisionBoxOffset = properties.extraCollisionBoxOffset;
        this.slotWidth              = properties.slotWidth;
        this.slotHeight             = properties.slotHeight;
        this.treadPath              = properties.treadPath;
        this.treadDroopConstant     = properties.treadDroopConstant;
        this.partScale              = properties.partScale;
        this.playerScale            = properties.playerScale;
        this.dismountPos            = properties.dismountPos;
        this.seatEffects            = properties.seatEffects;
        this.defaultPart            = properties.defaultPart;
        this.transferVariable       = properties.transferVariable;
        this.conditionalDefaultParts = properties.conditionalDefaultParts;
        this.allowParentRemoval     = properties.allowParentRemoval;
        this.linkedParts            = properties.linkedParts;
        this.applyAfter             = properties.applyAfter;
        this.groundDevicePosition   = properties.groundDevicePosition;
        this.animations             = properties.animations;
        this.activeAnimations       = properties.activeAnimations;
        this.interactableVariables  = properties.interactableVariables;
        this.lockingVariables       = properties.lockingVariables;
        this.constantValues         = properties.constantValues;
    }

    override toJSON(version: Versions): object {
        return {
            parts: {
                pos:                     this.pos,
                rot:                     this.rot,
                turnsWithSteer:          this.turnsWithSteer,
                isController:            this.isController,
                isExterior:              this.isExterior,
                isPermanent:             this.isPermanent,
                isSpare:                 this.isSpare,
                isMirrored:              this.isMirrored,
                canDisableGun:           this.canDisableGun,
                resetPosition:           this.resetPosition,
                isCoAxial:               this.isCoAxial,
                forceCameras:            this.forceCameras,
                types:                   this.types,
                customTypes:             this.customTypes,
                validSubNames:           this.validSubNames,
                toneIndex:               this.toneIndex,
                maxPartLevels:           this.maxPartLevels,
                minValue:                this.minValue,
                maxValue:                this.maxValue,
                minYaw:                  this.minYaw,
                maxYaw:                  this.maxYaw,
                defaultYaw:              this.defaultYaw,
                yawSpeed:                this.yawSpeed,
                minPitch:                this.minPitch,
                maxPitch:                this.maxPitch,
                defaultPitch:            this.defaultPitch,
                pitchSpeed:              this.pitchSpeed,
                intakeOffset:            this.intakeOffset,
                extraCollisionBoxOffset: this.extraCollisionBoxOffset,
                slotWidth:               this.slotWidth,
                slotHeight:              this.slotHeight,
                treadPath:               this.treadPath,
                treadDroopConstant:      this.treadDroopConstant,
                partScale:               this.partScale,
                playerScale:             this.playerScale,
                dismountPos:             this.dismountPos,
                seatEffects:             this.seatEffects,
                defaultPart:             this.defaultPart,
                transferVariable:        this.transferVariable,
                conditionalDefaultParts: this.conditionalDefaultParts,
                allowParentRemoval:      this.allowParentRemoval,
                linkedParts:             this.linkedParts,
                applyAfter:              this.applyAfter,
                groundDevicePosition:    this.groundDevicePosition,
                animations:              this.animations,
                activeAnimations:        this.activeAnimations,
                interactableVariables:   this.interactableVariables,
                lockingVariables:        this.lockingVariables,
                constantValues:          this.constantValues,
            }
        };
    }

}