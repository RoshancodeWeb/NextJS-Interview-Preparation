// PAGE for /blog/authors — a NESTED static route.
// Folder nesting (blog/authors) maps directly to URL nesting (/blog/authors),
// and it inherits blog/layout.tsx (the section nav stays visible).

export default function AuthorsPage() {
  return (
    <div className="demo-box">
      <h4>/blog/authors</h4>
      <p>
        A nested static route at <code>app/blog/authors/page.tsx</code>. Notice the
        blog section nav above is still here — that&apos;s <code>blog/layout.tsx</code>{" "}
        wrapping this child.
      </p>
      <ul className="clean">
        <li>Ada</li>
        <li>Linus</li>
        <li>Grace</li>
      </ul>
    </div>
  );
}
