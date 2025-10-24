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
import { getMotivation } from "./components/QuoteBanner.jsx";
import { Loading } from "./components/Loading.jsx";
import { getEvents, addEvent, removeLastEvent } from "./storage.js";
import { themeFromRecentCount } from "./theme.js";
import { Resources } from "./components/Resources.jsx";

const STORAGE_KEYS = {
  lastRelapse: "mindguard:lastRelapse",
  cleanStart: "mindguard:cleanStart",
};

function getJalaliDateString(dateLike) {
  if (!dateLike) return "—";
  const d = typeof dateLike === "string" ? new Date(dateLike) : dateLike;
  if (Number.isNaN(d.getTime())) return "—";
  return formatJalaliDate(d);
}

function startOfUserDay(date) {
  const d = new Date(date);
  d.setHours(4, 0, 0, 0);
  return d;
}

function diffJalaliDays(fromDate, toDate) {
  const from = startOfUserDay(fromDate);
  const to = startOfUserDay(toDate);
  return Math.max(0, Math.floor((to - from) / (24 * 60 * 60 * 1000)));
}

function getRecentJalaliDays(n) {
  const arr = [];
  const today = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setHours(4, 0, 0, 0);
    d.setDate(d.getDate() - i);
    arr.push(new Date(d));
  }
  return arr;
}
function formatJalaliDate(date) {
  if (!date) return "—";

  let d = date instanceof Date ? new Date(date) : new Date(date);

  if (isNaN(d)) return "—";

  d = new Date(d.getFullYear(), d.getMonth(), d.getDate());

  return d.toLocaleDateString("fa-IR-u-ca-persian", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function groupEventsByJalaliDay(events, days) {
  return days.map((day) => {
    const next = new Date(day);
    next.setDate(next.getDate() + 1);
    const count = events.filter((e) => {
      const t = new Date(e.timestamp);
      return t >= day && t < next;
    }).length;
    return { date: new Date(day), count };
  });
}

function getWeekdayNameFa(date) {
  const names = ["شنبه", "یک‌شنبه", "دو‌شنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه"];
  return names[date.getDay() === 6 ? 0 : date.getDay() + 1];
}

function calcDaysClean(events, cleanStart) {
  if (!cleanStart) return 0;
  if (!events.length) return diffJalaliDays(cleanStart, new Date());
  const lastRelapse = events.reduce((a, b) => (new Date(a.timestamp) > new Date(b.timestamp) ? a : b));
  return diffJalaliDays(lastRelapse.timestamp, new Date());
}

export default function App() {
  const [lastRelapse, setLastRelapse] = useState(null);
  const [cleanStart, setCleanStart] = useState(null);
  const [events, setEvents] = useState(null);
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
  }, [dark, themeSource]);

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

  useEffect(() => {
    const storedLast = localStorage.getItem(STORAGE_KEYS.lastRelapse);
    const storedStart = localStorage.getItem(STORAGE_KEYS.cleanStart);

    setTimeout(() => {
      if (storedLast) setLastRelapse(storedLast);
      if (storedStart) setCleanStart(storedStart);
      if (!storedLast && !storedStart) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const iso = today.toISOString();
        localStorage.setItem(STORAGE_KEYS.lastRelapse, iso);
        localStorage.setItem(STORAGE_KEYS.cleanStart, iso);
        setLastRelapse(iso);
        setCleanStart(iso);
      }
      setEvents(getEvents());
    }, 1050);
  }, []);

  const daysClean = useMemo(() => calcDaysClean(events || [], cleanStart), [events, cleanStart]);

  const motivation = useMemo(() => getMotivation(daysClean), [daysClean]);
  const weekDays = useMemo(() => getRecentJalaliDays(7), []);
  const last7 = useMemo(() => groupEventsByJalaliDay(events || [], weekDays), [events, weekDays]);
  const last30DaysJalali = useMemo(() => getRecentJalaliDays(30), []);
  const last30 = useMemo(() => groupEventsByJalaliDay(events || [], last30DaysJalali), [events, last30DaysJalali]);
  const totalLast7 = useMemo(() => last7.reduce((sum, day) => sum + day.count, 0), [last7]);
  const totalLast30 = useMemo(() => last30.reduce((sum, day) => sum + day.count, 0), [last30]);
  const theme = useMemo(() => themeFromRecentCount(last7.reduce((s, d) => s + d.count, 0)), [last7]);
  const todayCount = last7[6]?.count ?? 0;
  const [goal, setGoal] = useState(() => JSON.parse(localStorage.getItem("mindguard:settings") || "{}").goal || 7);
  const progress = Math.max(0, Math.min(1, 1 - last7.reduce((s, d) => s + d.count, 0) / goal));
  const { currentStreak, bestStreak } = useMemo(() => {
    if (!events?.length) {
      return { currentStreak: daysClean, bestStreak: daysClean };
    }
    const sorted = [...events].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    let best = 0;
    let prev = null;
    for (const e of sorted) {
      if (prev) {
        const prevD = startOfUserDay(prev.timestamp);
        const eD = startOfUserDay(e.timestamp);
        const gap = Math.max(0, Math.floor((eD - prevD) / (24 * 60 * 60 * 1000)) - 1);
        if (gap > best) best = gap;
      }
      prev = e;
    }
    const lastEvent = sorted[sorted.length - 1];
    const curr = Math.max(0, Math.floor((startOfUserDay(new Date()) - startOfUserDay(lastEvent.timestamp)) / (24 * 60 * 60 * 1000)));
    return { currentStreak: curr, bestStreak: Math.max(best, curr) };
  }, [events, daysClean]);
  const userStats = useMemo(
    () => ({
      streak: currentStreak,
      total: events ? events.length : 0,
      totalLast7: totalLast7,
      totalLast30: totalLast30,
      days: daysClean,
    }),
    [currentStreak, events, totalLast7, totalLast30, daysClean]
  );

  const weekLabels = weekDays.map(getWeekdayNameFa);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>
      <Header
        dark={dark}
        onToggleDark={() => {
          setThemeSource("user");
          setDark((d) => !d);
        }}
      />
      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
        {events === null ? (
          <Loading />
        ) : (
          <>
            <div className="flex justify-center mb-4">
              <div className="backdrop-blur-md rounded-xl px-6 py-3 shadow animate-fade-in-scale max-w-md w-full text-center">{motivation}</div>
            </div>
            <div className="mx-auto w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 animate-fade-in-up">
              <StatsCard title="روزهای بدون بازگشت" value={daysClean} subtitle={`آخرین بازگشت: ${getJalaliDateString(events.filter((e) => e.type === "relapse").sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0]?.timestamp)}`} />
              <CounterCard title="تعداد امروز" value={todayCount} />
              <StatsCard title="سری فعلی بدون بازگشت" value={currentStreak} />
              <StatsCard title="بهترین رکورد بدون بازگشت" value={bestStreak} />
              <div className="md:col-span-2">
                <Actions onAdd={() => setEvents(addEvent({ type: "relapse" }))} onUndo={() => setEvents(removeLastEvent())} />
              </div>
              <div className="rounded-2xl shadow-sm ring-1 p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: "var(--surface)", borderColor: "var(--ring)" }}>
                <div className="flex items-center justify-between">
                  <div className="text-sm" style={{ color: "var(--text-muted)" }}>
                    ۷ روز اخیر (شمسی)
                  </div>
                  <div className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                    مجموع: {totalLast7} بار
                  </div>
                </div>
                <BarChart data={last7.map((d) => d.count)} labels={weekLabels} color={theme.name === "danger" ? "var(--danger)" : theme.name === "warning" ? "var(--warning)" : "var(--success)"} />
              </div>
              <StatusCard {...userStats} />
              <div className="rounded-2xl shadow-sm ring-1 p-5 md:col-span-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: "var(--surface)", borderColor: "var(--ring)" }}>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm" style={{ color: "var(--text-muted)" }}>
                    ۳۰ روز اخیر (شمسی)
                  </div>
                  <div className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                    مجموع: {totalLast30} بار
                  </div>
                </div>
                <BarChart data={last30.map((d) => d.count)} labels={last30.map((d) => formatJalaliDate(d.date))} color="var(--chart-primary)" />
              </div>
              <div className="rounded-2xl shadow-sm ring-1 p-5 md:col-span-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: "var(--surface)", borderColor: "var(--ring)" }}>
                <div className="text-sm mb-2" style={{ color: "var(--text-muted)" }}>
                  هدف هفتگی: حداکثر {goal} بار بازگشت
                </div>
                <ProgressRing progress={progress} label="پیشرفت شما" />
              </div>
              <Triggers />
              <Resources />
              <div className="md:col-span-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
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
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
