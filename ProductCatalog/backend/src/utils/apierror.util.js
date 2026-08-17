class ApiError extends Error {
    /**
     * @param statusCode  HTTP status to send
     * @param message     human-readable text, safe to show a user
     * @param code        optional machine-readable tag the frontend can branch on,
     *                    e.g. "TOKEN_EXPIRED". Never string-match the message —
     *                    you'll reword it one day and quietly break the client.
     */
    constructor(statusCode, message, code) {
        super(message);
        this.statusCode = statusCode;
        if (code) this.code = code;

        Error.captureStackTrace(this, this.constructor);
    }

}


export default ApiError;
