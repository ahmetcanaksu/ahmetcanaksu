const PageHeader = ({ kicker, title, children }) => (
  <header className="mb-14 max-w-3xl">
    {kicker && <p className="kicker mb-4">{kicker}</p>}
    <h1 className="text-4xl font-semibold leading-[1.05] sm:text-5xl">{title}</h1>
    {children && (
      <p className="mt-5 text-lg leading-relaxed text-ink-2">{children}</p>
    )}
  </header>
);

export default PageHeader;
