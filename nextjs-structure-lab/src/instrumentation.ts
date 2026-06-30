// INSTRUMENTATION (top-level file: `instrumentation.ts`).
// Next calls the exported `register()` once when a server instance boots — the
// place to initialize monitoring/observability (e.g. OpenTelemetry). With a
// `src/` folder it lives in `src/`, alongside `app/`.

export async function register() {
  // In a real app you'd initialize tracing here, e.g.:
  //   await import("./otel");
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // Visible in the terminal when the dev/prod server starts.
    console.log("[instrumentation] register() ran on server startup");
  }
}
