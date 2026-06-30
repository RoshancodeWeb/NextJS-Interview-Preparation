// The unnamed slot for /dashboard (the `children` prop of the layout).

export default function DashboardPage() {
  return (
    <div className="demo-box">
      <h4>Dashboard overview</h4>
      <p style={{ marginBottom: 0 }}>
        The two panels below are <strong>separate routes</strong> (
        <code>@team</code> and <code>@analytics</code>) rendered in parallel by this
        segment&apos;s layout — each can have its own loading/error state and even
        navigate independently.
      </p>
    </div>
  );
}
