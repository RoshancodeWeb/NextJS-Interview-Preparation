// The @team slot's page. Reaches the layout as the `team` prop.

export default function TeamSlot() {
  return (
    <div className="panel">
      <h4 className="tag" style={{ marginTop: 0 }}>
        @team slot
      </h4>
      <ul className="clean">
        <li>Ada — 🟢 online</li>
        <li>Linus — 🟡 away</li>
        <li>Grace — 🟢 online</li>
      </ul>
    </div>
  );
}
