export default function Header({ dark = false, onToggleDark }) {
  return (
    <header className="w-full border-b backdrop-blur" style={{ backgroundColor: "var(--surface)", borderColor: "var(--ring)" }}>
      <div className="mx-auto max-w-3xl px-4 py-4 flex items-center justify-between">
        <img src="/ico.png" alt="Mind Guard" className="w-[32px]" />
        <h1 className="text-xl font-bold tracking-tight ml-auto p-1" style={{ color: "var(--text-primary)" }}>
          مایند گارد
        </h1>
        <div className="flex items-center gap-4">
          <div className="text-xs hidden sm:block" style={{ color: "var(--text-muted)" }}>
            پیگیری پیشرفت فردی
          </div>
          <button type="button" aria-label="تبدیل حالت تاریک" onClick={onToggleDark} className={`group relative inline-flex h-8 w-14 items-center rounded-full px-1 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${dark ? "bg-slate-800" : "bg-slate-300"}`}>
            <span className={`absolute inset-0 overflow-hidden rounded-full`}>
              <span className={`absolute inset-0 ${dark ? "opacity-100" : "opacity-0"} transition-opacity duration-300`} style={{ background: "radial-gradient(120% 120% at 100% 0%, rgba(34,211,238,0.35) 0%, rgba(34,211,238,0.15) 40%, transparent 70%)" }} />
            </span>
            <span className={`relative inline-block h-6 w-6 transform rounded-full bg-white shadow-md transition-transform duration-300 ${dark ? "translate-x-[-24px]" : "translate-x-0"}`}>
              <span className={`absolute inset-0 flex items-center justify-center transition-opacity ${dark ? "opacity-0" : "opacity-100"}`}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 4v2m0 12v2m8-8h-2M6 12H4m12.95 5.657l-1.414-1.414M8.464 8.464 7.05 7.05m10.607 0-1.414 1.414M8.464 15.536 7.05 16.95" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="12" cy="12" r="3" fill="#f59e0b" />
                </svg>
              </span>
              <span className={`absolute inset-0 flex items-center justify-center transition-opacity ${dark ? "opacity-100" : "opacity-0"}`}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="#38bdf8" strokeWidth="2" fill="#0ea5e9" />
                </svg>
              </span>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
