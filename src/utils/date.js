export function startOfDay(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function daysBetween(start, end) {
  return Math.floor((startOfDay(end) - startOfDay(start)) / (24 * 60 * 60 * 1000));
}

export function lastNDays(n, from = new Date()) {
  const days = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(from);
    d.setDate(d.getDate() - i);
    days.push(startOfDay(d));
  }
  return days;
}

export function groupEventsByDay(events, daysArray) {
  const map = new Map(daysArray.map(d => [startOfDay(d).toISOString(), 0]));
  for (const e of events) {
    const key = startOfDay(new Date(e.timestamp)).toISOString();
    if (map.has(key)) map.set(key, map.get(key) + 1);
  }
  return daysArray.map(d => ({ date: d, count: map.get(startOfDay(d).toISOString()) || 0 }));
}

export function groupEventsByMonth(events, monthsBack = 1, from = new Date()) {
  const buckets = [];
  const base = new Date(from);
  base.setDate(1);
  for (let i = monthsBack - 1; i >= 0; i--) {
    const d = new Date(base);
    d.setMonth(d.getMonth() - i);
    buckets.push({ key: `${d.getFullYear()}-${d.getMonth() + 1}`, year: d.getFullYear(), month: d.getMonth(), count: 0 });
  }
  for (const e of events) {
    const dt = new Date(e.timestamp);
    const key = `${dt.getFullYear()}-${dt.getMonth() + 1}`;
    const bucket = buckets.find(b => b.key === key);
    if (bucket) bucket.count += 1;
  }
  return buckets;
}


