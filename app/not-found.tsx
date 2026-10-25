export default function NotFound() {
  return (
    <section id="top" className="page flex min-h-[60vh] flex-col justify-center py-section">
      <p className="tabular text-small font-semibold text-muted">404</p>
      <h1 className="mt-3 font-display text-h2 font-semibold">There’s nothing at this address.</h1>
      <p className="mt-5 max-w-measure text-lead text-muted">
        The page may have moved, or the link was mistyped. Everything on this site lives on one page.
      </p>
      <p className="mt-9">
        {/* A plain link: next/link would add its runtime (about 9 kB) to every page for this one button. */}
        <a href="/" className="btn btn-primary">
          Go to the home page
        </a>
      </p>
    </section>
  )
}
