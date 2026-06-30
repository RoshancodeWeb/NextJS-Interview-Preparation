// The @analytics slot's page. Reaches the layout as the `analytics` prop.

export default function AnalyticsSlot() {
  return (
    <div className="panel">
      <h4 className="tag" style={{ marginTop: 0 }}>
        @analytics slot
      </h4>
      <p style={{ margin: "4px 0" }}>Visitors today: 1,284</p>
      <p style={{ margin: "4px 0" }}>Conversion: 3.2%</p>
    </div>
  );
}
