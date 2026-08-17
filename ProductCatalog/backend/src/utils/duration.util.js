/**
 * Turns a jwt-style duration string into milliseconds, so cookie maxAge can be
 * derived from the same .env value the token expiry uses instead of being
 * hardcoded in two places.
 *
 *   "30s" -> 30000      "1m" -> 60000      "2h" -> 7200000      "7d" -> 604800000
 *   "60"  -> 60000      (a bare number is seconds, same as jsonwebtoken)
 */

const MULTIPLIERS = {
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
};

export const durationToMs = (value, fallbackMs) => {
    if (!value) return fallbackMs;

    const match = String(value).trim().match(/^(\d+)\s*(s|m|h|d)?$/i);
    if (!match) return fallbackMs;

    const amount = Number(match[1]);
    const unit = (match[2] ?? "s").toLowerCase();

    return amount * MULTIPLIERS[unit];
};

export default durationToMs;
