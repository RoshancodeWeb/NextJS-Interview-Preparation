// PAGE at app/(store)/cart/page.tsx → URL is /cart (group name dropped).

export default function CartPage() {
  return (
    <div className="demo-box">
      <h4>/cart</h4>
      <p>
        At <code>app/(store)/cart/page.tsx</code>, served as <code>/cart</code>.
        Because it&apos;s in a different group than <code>/about</code>, it can use
        a completely different layout.
      </p>
    </div>
  );
}
