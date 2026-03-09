//! REVIEW INCOMPLETE

import { JSONDefs, type Versions } from "./json";
import { type AnimationProps } from "./animation";

export type CameraProps = {
    /**
     * The x,y,z position of this camera on the entity.
     * Note that FOV may affect accuracy — fudging this value may be necessary.
     */
    pos: [number, number, number];

    /**
     * The x,y,z rotations for this camera.
     * Optional — omit if no rotation is needed.
     */
    rot: [number, number, number];

    /**
     * If set, MTS renders the specified texture as a full-screen overlay
     * when this camera is active. Also disables the hotbar and crosshair.
     * Format: packID:textureName
     */
    overlay: string;

    /**
     * If set, overrides the player's FOV to this value when in this camera.
     * Useful for simulating zoom on scopes and sights.
     */
    fovOverride: number;

    /**
     * If set, overrides the player's mouse sensitivity when in this camera.
     * Useful for zoomed views where reduced sensitivity aids aiming.
     */
    mouseSensitivityOverride: number;

    /**
     * If true, the player will have night vision while using this camera.
     */
    nightVision: boolean;

    /**
     * If true, this camera is considered to be interior.
     * Used in conjunction with the sound system.
     */
    isInterior: boolean;

    /**
     * Animations applied to this camera.
     * Translations and rotations work as expected.
     *
     * Visibility animations skip rendering the camera when false —
     * the camera index does NOT increment when skipped, so the next
     * camera in the list will be used instead. Useful for making cameras
     * replace each other conditionally (e.g. per active gun or component).
     */
    animations: Partial<AnimationProps>[];
}

export class Camera extends JSONDefs {

    pos?: [number, number, number];
    rot?: [number, number, number];
    overlay?: string;
    fovOverride?: number;
    mouseSensitivityOverride?: number;
    nightVision?: boolean;
    isInterior?: boolean;
    animations?: Partial<AnimationProps>[];

    constructor(properties: Partial<CameraProps>) {
        super();
        this.pos                     = properties.pos;
        this.rot                     = properties.rot;
        this.overlay                 = properties.overlay;
        this.fovOverride             = properties.fovOverride;
        this.mouseSensitivityOverride = properties.mouseSensitivityOverride;
        this.nightVision             = properties.nightVision;
        this.isInterior              = properties.isInterior;
        this.animations              = properties.animations;
    }

    override toJSON(version: Versions): object {
        return {
            cameraObjects: {
                pos:                     this.pos,
                rot:                     this.rot,
                overlay:                 this.overlay,
                fovOverride:             this.fovOverride,
                mouseSensitivityOverride: this.mouseSensitivityOverride,
                nightVision:             this.nightVision,
                isInterior:              this.isInterior,
                animations:              this.animations,
            }
        };
    }

}