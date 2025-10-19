export default function Footer() {
  return (
    <footer className="w-full border-t backdrop-blur mt-8" style={{backgroundColor:'var(--surface)', borderColor:'var(--ring)'}}>
      <div className="mx-auto max-w-3xl px-4 py-4 text-center text-sm" style={{color:'var(--text-muted)'}}>
        <span>© {new Date().getFullYear()} مایند گارد</span>
      </div>
    </footer>
  );
}


