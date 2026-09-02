/**
 * Four parameters is what makes this an ERROR handler rather than ordinary
 * middleware — Express checks fn.length. Removing the unused `next` silently
 * turns it back into a normal middleware and errors stop reaching it.
 */
export const errorHandler = (error, req, res, next) => {

    const status = error.statusCode ?? error.status ?? 500;

    // Never leak internals on a 500 in production — stack traces and driver
    // messages tell an attacker about your stack. Your own 4xx messages are
    // deliberate, so those are safe to show.
    const message = status === 500 && process.env.NODE_ENV === "production"
        ? "Internal Server Error"
        : error.message || "Internal Server Error";

    if (status === 500) console.error(error);

    const payload = { success: false, message };
    if (typeof error.code === "string") payload.code = error.code;

    res.status(status).json(payload);
};
