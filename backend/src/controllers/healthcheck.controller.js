/**
 * Controllers are the ONLY layer that touches req and res.
 * Keep them thin: read input, call something, shape the response.
 */

const healthcheck = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is up and running",
    uptimeInSeconds: Math.floor(process.uptime()),
  });
};

/**
 * Demo route — safe to delete once you've seen it work.
 *
 * This throws inside an async function with no try/catch. In Express 4 the
 * request would hang forever, which is why every tutorial wraps controllers
 * in `asyncHandler`. Express 5 forwards the rejected promise to the error
 * middleware in app.js automatically, so you get a clean 500 instead.
 */
const boom = async (req, res) => {
  throw new Error("This error was thrown from an async controller");
};

export { healthcheck, boom };
