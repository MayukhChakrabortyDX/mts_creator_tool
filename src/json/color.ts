//! REVIEW INCOMPLETE

/**
 * A color value in MTS JSON format.
 *
 * Accepted formats:
 * - Hexadecimal string: a 6-character RGB hex code, optionally prefixed with `#` or `0x`.
 *   e.g. `"FF0000"`, `"#BABA00"`, `"0xFF0000"`
 * - HSV array: `[hue, saturation, value]`
 *   - Hue:        0–360 (angle on the color wheel)
 *   - Saturation: 0–100 (0 = white, 100 = full color)
 *   - Value:      0–100 (0 = black, 100 = full brightness)
 *   e.g. `[120, 100, 50]`
 */
export type MTSColor = string | [number, number, number];

/**
 * Validates a hex color string. Accepts optional `#` or `0x` prefix
 * followed by exactly 6 hex characters.
 */
export function isValidHexColor(value: string): boolean {
    return /^(#|0x)?[0-9A-Fa-f]{6}$/.test(value);
}

/**
 * Validates an HSV color array.
 * Hue: 0–360, Saturation: 0–100, Value: 0–100.
 */
export function isValidHSVColor(value: [number, number, number]): boolean {
    const [h, s, v] = value;
    return h >= 0 && h <= 360
        && s >= 0 && s <= 100
        && v >= 0 && v <= 100;
}

/**
 * Validates any MTSColor value, whether hex string or HSV array.
 */
export function isValidMTSColor(value: MTSColor): boolean {
    if (typeof value === "string") return isValidHexColor(value);
    return isValidHSVColor(value);
}

/**
 * Normalises a hex color string to uppercase with no prefix.
 * e.g. `"#baba00"` → `"BABA00"`, `"0xFF0000"` → `"FF0000"`
 */
export function normaliseHexColor(value: string): string {
    return value.replace(/^(#|0x)/i, "").toUpperCase();
}