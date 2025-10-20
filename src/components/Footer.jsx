import { Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t backdrop-blur mt-8" style={{ backgroundColor: "var(--surface)", borderColor: "var(--ring)" }}>
      <div className="mx-auto max-w-3xl px-4 py-4 text-center text-sm flex justify-between" style={{ color: "var(--text-muted)" }}>
        <span>© {new Date().getFullYear()} مایند گارد</span>
        <a href="https://github.com/calvorya/Mind-Guard" className="hover:underline transition-colors" target="_blank" rel="noopener noreferrer">
          <Github />
        </a>
      </div>
    </footer>
  );
}
