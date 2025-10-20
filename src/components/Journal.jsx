import { useState } from "react";
import { addNote, getNotes, setNotes } from "../storage.js";
import { Trash2 } from "lucide-react";

export default function Journal() {
  const [text, setText] = useState("");
  const [notes, setLocalNotes] = useState(() => getNotes());

  function submit(e) {
    e.preventDefault();
    if (!text.trim()) return;
    const note = addNote(text.trim());
    setLocalNotes((prev) => [note, ...prev]);
    setText("");
  }

  function deleteNote(id) {
    const newNotes = notes.filter((n) => n.id !== id);
    setLocalNotes(newNotes);
    setNotes(newNotes);
  }

  return (
    <div className="rounded-2xl shadow-sm ring-1 p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--ring)" }}>
      <div className="text-sm mb-3" style={{ color: "var(--text-secondary)" }}>
        یادداشت روزانه
      </div>
      <form onSubmit={submit} className="flex gap-2">
        <input value={text} onChange={(e) => setText(e.target.value)} className="flex-1 rounded-lg border px-3 py-2 focus:outline-none focus:ring-2" style={{ backgroundColor: "var(--surface-secondary)", borderColor: "var(--ring-secondary)", color: "var(--text-primary)" }} placeholder="چه چیزی را یاد گرفتی؟ چه پیشرفتی کردی؟" />
        <button className="rounded-lg text-white px-4 py-2 hover:opacity-90" style={{ backgroundColor: "var(--chart-primary)" }}>
          ثبت
        </button>
      </form>
      <ul className="mt-4 space-y-2">
        {notes.map((n) => (
          <li key={n.id} className="text-sm flex items-center gap-2 justify-between group p-2 rounded-lg hover:bg-gray-100/10" style={{ color: "var(--text-secondary)" }}>
            <div className="flex-1 truncate">
              <span className="ml-2 text-xs" style={{ color: "var(--text-muted)" }}>
                {new Date(n.timestamp).toLocaleDateString("fa-IR")}
              </span>
              {n.text}
            </div>
            <button onClick={() => deleteNote(n.id)} className="opacity-70 group-hover:opacity-100 transition-opacity duration-200 rounded-full px-2 py-1 ml-2 text-red-500 hover:bg-red-100/20 focus:outline-none text-xs" title="حذف" type="button">
              <Trash2 />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
