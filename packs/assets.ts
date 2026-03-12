//!DO NOT TOUCH

export type ResourceLocation =
    never;

export function asset<T extends ResourceLocation>(path: T): string {
    return path;
}