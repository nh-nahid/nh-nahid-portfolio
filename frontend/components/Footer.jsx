export default function Footer() {
  return (
    <footer className="relative z-40 border-t border-zinc-800 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-5 text-center sm:px-8">
        <p className="font-display text-sm font-semibold text-white">
          <span className="text-lime-400">&lt;/&gt;</span> nahid
          <span className="text-lime-400">.dev</span>
        </p>
        <p className="text-xs text-zinc-500">
          © {new Date().getFullYear()} Nahid Hossain. Building fast, scalable
          and accessible web experiences.
        </p>
      </div>
    </footer>
  );
}
