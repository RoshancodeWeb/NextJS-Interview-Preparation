export const errorHandler = (err, req, res, next) => {
    console.error(err);

    if (err.name == "ValidationError") {
        const errors = Object.values(err.errors).map((e) => e.message);
        return res.status(400).json({ success: false, message: errors[0], errors });
    }

    // 2. A value couldn't be cast to its schema type — usually a malformed id
    if (err.name === "CastError") {
        return res.status(400).json({
            success: false,
            message: `Invalid ${err.path}: '${err.value}'`,
        });
    }

    // 3. A `unique` index rejected the write
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue ?? {})[0] ?? "value";
        return res.status(409).json({
            success: false,
            message: `That ${field} is already taken`,
        });
    }

    // 4. Anything unrecognized is genuinely our fault
    const statusCode = err.statusCode ?? err.status ?? 500;
    const message =
        statusCode === 500 && process.env.NODE_ENV === "production"
            ? "Internal Server Error"
            : err.message ?? "Internal Server Error";

    res.status(statusCode).json({ success: false, message });

}