export default function Actions({ onAdd, onUndo }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      <button
        onClick={onAdd}
        className="inline-flex items-center justify-center rounded-xl text-white px-5 py-3 font-medium shadow-sm hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 transition-all duration-200 hover:scale-105 active:scale-95 focus-smooth"
        style={{backgroundColor:'var(--danger)'}}
      >
        ثبت خود ارضایی
      </button>
      <button
        onClick={onUndo}
        className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-medium shadow-sm hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 transition-all duration-200 hover:scale-105 active:scale-95 focus-smooth"
        style={{backgroundColor:'var(--surface-secondary)', color:'var(--text-primary)'}}
      >
        بازگردانی آخرین
      </button>
    </div>
  );
}


