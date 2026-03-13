/*!DO NOT TOUCH*/

export type ResourceLocation =
    | "/gear_indicator_icon.png"
    | "/instruments.png";

export function asset<T extends ResourceLocation>(path: T): ResourceLocation {
    return path;
}