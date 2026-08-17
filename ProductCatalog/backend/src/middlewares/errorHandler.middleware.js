export const errorHandler = (error, req, res, next) => {
    
    if (error.name == "ValidationError") {
        const errors = Object.values(error.errors).map((err) => err.message);
        return res.status(400).json({ success: false, message: errors[0], errors });
    }
    
    if (error.name === "CastError") {
        return res.status(400).json({ success: false, message: `Invalid ${error.path} : ${error.value}` });
    }

    if (error.code === 11000) {
        const fields = Object.keys(error.keyValue ?? {});

        const message = fields.length > 1
            ? `That combination of ${fields.join(" and ")} already exists`
            : `That ${fields[0] ?? "value"} is already taken`;

        return res.status(409).json({ success: false, message });
    }
    console.log(error);
    const errorStatus = error.statusCode ?? error.status ?? 500;
    const message = errorStatus == 500 && process.env.NODE_ENV == "production" ? "Internal Server Error" : error.message || "Internal Server Error";
    
    const payload = { success: false, message };

    // only string codes are ours — mongo's duplicate-key code is the number 11000
    if (typeof error.code === "string") payload.code = error.code;

    res.status(errorStatus).json(payload);

}