/**
 * Wraps an async route handler so a rejected promise reaches Express instead of
 * dying as an unhandled rejection.
 *
 *     route.post("/login", asyncHandler(createUser));
 *
 * Without it, every controller needs its own try/catch whose only job is
 * `catch (e) { next(e) }` — noise that's easy to get wrong (an empty catch
 * swallows the error and the request hangs until it times out).
 *
 * Express 5 already forwards rejected promises from async handlers, so on this
 * version it's belt-and-braces. It's kept because it still removes the
 * try/catch from every controller, and because it keeps behaviour identical if
 * a handler is ever called from somewhere that isn't an Express route.
 */
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
