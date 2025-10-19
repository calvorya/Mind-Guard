import { Flame, Trophy, Shield, Zap, Brain, Star, Moon } from "lucide-react";

export default function StatusCard({ streak = 0, total = 0, totalLast7, totalLast30, days = 0 }) {
    const getLevel = () => {
        if (total === 0) return { level: "پاک‌ترین ذهن", icon: <Brain className="w-7 h-7 text-purple-400" /> };
        if (total <= 3) return { level: "استاد کنترل", icon: <Trophy className="w-7 h-7 text-yellow-400" /> };
        if (total <= 7) return { level: "پیشروی با اراده", icon: <Shield className="w-7 h-7 text-blue-400" /> };
        if (total <= 14) return { level: "در مسیر کاهش", icon: <Zap className="w-7 h-7 text-emerald-400" /> };
        return { level: "شروع تازه", icon: <Moon className="w-7 h-7 text-gray-400" /> };
      };
    
      const level = getLevel();
    
      const badges = [
        { name: "پاک ذهن", value: total === 0, icon: <Brain className="w-5 h-5 text-purple-400" /> },
        { name: "ثبات اراده", value: streak >= 7 && totalLast7 <= 1, icon: <Flame className="w-5 h-5 text-orange-400" /> },
        { name: "پشتکار", value: days >= 30 && totalLast30 <= 5, icon: <Shield className="w-5 h-5 text-blue-400" /> },
        { name: "کنترل عالی", value: total / days < 0.1, icon: <Zap className="w-5 h-5 text-emerald-400" /> },
        { name: "تعادل", value: streak >= 3 && total <= 5, icon: <Star className="w-5 h-5 text-yellow-400" /> },
        { name: "اسطوره اراده", value: streak >= 30 && total === 0, icon: <Trophy className="w-5 h-5 text-red-400" /> },
        { name: "قهرمان ذهن", value: days >= 100 && total <= 3, icon: <Brain className="w-5 h-5 text-purple-600" /> },
      ];

  return (
    <div
      className="rounded-2xl shadow-md ring-1 p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
      style={{
        backgroundColor: "var(--surface)",
        borderColor: "var(--ring)",
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
          وضعیت کلی
        </div>
        <div className="flex items-center gap-2 font-semibold text-sm" style={{ color: "var(--text-primary)" }}>
          {level.icon}
          {level.level}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 text-center mb-4">
        <div className="flex flex-col items-center">
          <div className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
            {streak}
          </div>
          <div className="text-xs" style={{ color: "var(--text-muted)" }}>
            روز متوالی
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
            {total}
          </div>
          <div className="text-xs" style={{ color: "var(--text-muted)" }}>
            کل ثبت‌ها
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
            {days}
          </div>
          <div className="text-xs" style={{ color: "var(--text-muted)" }}>
            روز از شروع
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mt-2">
        {badges.map((b, i) => (
          <div key={i} className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-all ${b.value ? "ring-1 ring-green-500/30 bg-green-500/10 text-green-400" : "ring-1 ring-gray-600/30 bg-gray-600/10 text-gray-400 opacity-60"}`}>
            {b.icon}
            {b.name}
          </div>
        ))}
      </div>
    </div>
  );
}
