import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import StatsCard from "./components/StatsCard.jsx";
import StatusCard from "./components/StatusCard.jsx";
import Actions from "./components/Actions.jsx";
import BarChart from "./components/BarChart.jsx";
import Journal from "./components/Journal.jsx";
import CounterCard from "./components/CounterCard.jsx";
import ProgressRing from "./components/ProgressRing.jsx";
import SettingsBar from "./components/SettingsBar.jsx";
import Triggers from "./components/Triggers.jsx";
import { getEvents, addEvent, removeLastEvent } from "./storage.js";
import { lastNDays, groupEventsByDay, startOfDay } from "./utils/date.js";
import { themeFromRecentCount } from "./theme.js";

const STORAGE_KEYS = {
  lastRelapse: "mindguard:lastRelapse",
  cleanStart: "mindguard:cleanStart",
};

function formatDaysBetween(fromDate, toDate) {
  const msInDay = 24 * 60 * 60 * 1000;
  const start = new Date(fromDate);
  const end = new Date(toDate);
  const diff = Math.floor((end.setHours(0, 0, 0, 0) - start.setHours(0, 0, 0, 0)) / msInDay);
  return diff < 0 ? 0 : diff;
}

function formatDate(dateLike) {
  const d = new Date(dateLike);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

function getMotivation(days) {
  if (days < 1) return "Every reset is a step toward awareness. Start again now.";
  if (days < 3) return "Small wins count. Keep today clean.";
  if (days < 7) return "Momentum builds quietly. One day at a time.";
  if (days < 14) return "You’re proving you can choose differently.";
  if (days < 30) return "Consistency beats intensity. Keep showing up.";
  if (days < 60) return "You’re rewiring your habits. Stay the course.";
  return "Your future self is grateful for your discipline.";
}

export default function App() {
  const [lastRelapse, setLastRelapse] = useState(null);
  const [cleanStart, setCleanStart] = useState(null);
  const [count, setCount] = useState(0);
  const [events, setEvents] = useState(() => getEvents());
  const [themeSource, setThemeSource] = useState(() => JSON.parse(localStorage.getItem("mindguard:settings") || "{}").themeSource || "system");
  const [dark, setDark] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("mindguard:settings") || "{}");
    const hasUserChoice = saved.themeSource === "user" && typeof saved.darkMode === "boolean";
    if (hasUserChoice) return saved.darkMode;
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    return document.documentElement.classList.contains("dark") || prefersDark;
  });
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    const s = JSON.parse(localStorage.getItem("mindguard:settings") || "{}");
    localStorage.setItem("mindguard:settings", JSON.stringify({ ...s, darkMode: dark, themeSource }));
  }, [dark]);

  // Sync with system preference when not overridden by user
  useEffect(() => {
    const mql = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
    if (!mql) return;
    function handleChange(e) {
      const current = JSON.parse(localStorage.getItem("mindguard:settings") || "{}");
      if ((current.themeSource || "system") === "system") {
        setDark(e.matches);
      }
    }
    mql.addEventListener ? mql.addEventListener("change", handleChange) : mql.addListener(handleChange);
    return () => {
      mql.removeEventListener ? mql.removeEventListener("change", handleChange) : mql.removeListener(handleChange);
    };
  }, []);

  // Load persisted values
  useEffect(() => {
    const storedLast = localStorage.getItem(STORAGE_KEYS.lastRelapse);
    const storedStart = localStorage.getItem(STORAGE_KEYS.cleanStart);
    if (storedLast) setLastRelapse(storedLast);
    if (storedStart) setCleanStart(storedStart);
    // If nothing stored, initialize both to today
    if (!storedLast && !storedStart) {
      const today = new Date().toISOString();
      localStorage.setItem(STORAGE_KEYS.lastRelapse, today);
      localStorage.setItem(STORAGE_KEYS.cleanStart, today);
      setLastRelapse(today);
      setCleanStart(today);
    }
  }, []);

  const daysClean = useMemo(() => {
    if (!cleanStart) return 0;
    return formatDaysBetween(cleanStart, new Date());
  }, [cleanStart]);

  const motivation = useMemo(() => getMotivation(daysClean), [daysClean]);
  const last7 = useMemo(() => groupEventsByDay(events, lastNDays(7)), [events]);
  const last30 = useMemo(() => groupEventsByDay(events, lastNDays(30)), [events]);
  const totalLast7 = useMemo(() => last7.reduce((sum, day) => sum + day.count, 0), [last7]);
  const totalLast30 = useMemo(() => last30.reduce((sum, day) => sum + day.count, 0), [last30]);
  const theme = useMemo(() => themeFromRecentCount(last7.reduce((s, d) => s + d.count, 0)), [last7]);
  const todayCount = last7[last7.length - 1]?.count ?? 0;
  const [goal, setGoal] = useState(() => JSON.parse(localStorage.getItem("mindguard:settings") || "{}").goal || 7);
  const progress = Math.max(0, Math.min(1, 1 - last7.reduce((s, d) => s + d.count, 0) / goal));
  const { currentStreak, bestStreak } = useMemo(() => {
    if (!events.length) {
      return { currentStreak: daysClean, bestStreak: daysClean };
    }
    const sorted = [...events].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    let best = 0;
    let prev = null;
    for (const e of sorted) {
      if (prev) {
        const gap = Math.max(0, Math.floor((startOfDay(e.timestamp) - startOfDay(prev.timestamp)) / (24 * 60 * 60 * 1000)) - 1);
        if (gap > best) best = gap;
      }
      prev = e;
    }
    const lastEvent = sorted[sorted.length - 1];
    const curr = Math.max(0, Math.floor((startOfDay(new Date()) - startOfDay(lastEvent.timestamp)) / (24 * 60 * 60 * 1000)));
    return { currentStreak: curr, bestStreak: Math.max(best, curr) };
  }, [events, daysClean]);
  const userStats = useMemo(() => {
    return {
      streak: currentStreak,
      total: events.length,
      totalLast7: totalLast7,
      totalLast30: totalLast30,
      days: daysClean,
    };
  }, [currentStreak, events.length, totalLast7, totalLast30, daysClean]);

  return (
    <div className={`min-h-screen flex flex-col`} style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>
      <Header
        dark={dark}
        onToggleDark={() => {
          setThemeSource("user");
          setDark((d) => !d);
        }}
      />
      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 animate-fade-in-up">
          <StatsCard title="روزهای بدون بازگشت" value={daysClean} subtitle={`آخرین بازگشت: ${formatDate(lastRelapse)}`} />
          <CounterCard title="تعداد امروز" value={todayCount} />
          <StatsCard title="سری فعلی بدون بازگشت" value={currentStreak} />
          <StatsCard title="بهترین رکورد بدون بازگشت" value={bestStreak} />
          <div className="md:col-span-2">
            <Actions onAdd={() => setEvents(addEvent({ type: "relapse" }))} onUndo={() => setEvents(removeLastEvent())} />
          </div>
          <div className="rounded-2xl shadow-sm ring-1 p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--ring)" }}>
            <div className="flex items-center justify-between">
              <div className="text-sm" style={{ color: "var(--text-muted)" }}>
                ۷ روز اخیر
              </div>
              <div className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                مجموع: {totalLast7} بار
              </div>
            </div>
            <BarChart data={last7.map((d) => d.count)} labels={["ش", "ی", "د", "س", "چ", "پ", "ج"]} color={theme.name === "danger" ? "var(--danger)" : theme.name === "warning" ? "var(--warning)" : "var(--success)"} />
          </div>
          <StatusCard {...userStats} />

          <div className="rounded-2xl shadow-sm ring-1 p-5 md:col-span-2" style={{ backgroundColor: "var(--surface)", borderColor: "var(--ring)" }}>
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm" style={{ color: "var(--text-muted)" }}>
                ۳۰ روز اخیر
              </div>
              <div className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                مجموع: {totalLast30} بار
              </div>
            </div>
            <BarChart data={last30.map((d) => d.count)} labels={Array.from({ length: 30 }, (_, i) => i + 1)} color="var(--chart-primary)" />
          </div>
          <div className="rounded-2xl shadow-sm ring-1 p-5 md:col-span-2" style={{ backgroundColor: "var(--surface)", borderColor: "var(--ring)" }}>
            <div className="text-sm mb-2" style={{ color: "var(--text-muted)" }}>
              هدف هفتگی: حداکثر {goal} بار بازگشت
            </div>
            <ProgressRing progress={progress} label="پیشرفت شما" />
          </div>
          <Triggers />
          <div className="md:col-span-2">
            <Journal />
          </div>
          <div className="md:col-span-2">
            <SettingsBar
              goal={goal}
              onGoalChange={(g) => {
                setGoal(g);
                localStorage.setItem("mindguard:settings", JSON.stringify({ ...JSON.parse(localStorage.getItem("mindguard:settings") || "{}"), goal: g }));
              }}
            />
          </div>
        </div>
        <div className="mt-6 text-center">
          <p className="text-xs transition-colors duration-200" style={{ color: "var(--text-muted)" }}>
            تمام اطلاعات فقط در مرورگر شما ذخیره می‌شود.
          </p>
          <p className="mt-2 text-sm font-medium animate-fade-in-scale" style={{ color: "var(--text-primary)" }}>
            {motivation}
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
