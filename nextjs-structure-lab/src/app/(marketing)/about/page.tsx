// PAGE at app/(marketing)/about/page.tsx → URL is /about (group name dropped).

export default function AboutPage() {
  return (
    <div className="demo-box">
      <h4>/about</h4>
      <p>
        This file lives at <code>app/(marketing)/about/page.tsx</code>, yet its URL
        is just <code>/about</code>. The <code>(marketing)</code> group gives it a
        shared marketing layout while contributing nothing to the path.
      </p>
    </div>
  );
}
