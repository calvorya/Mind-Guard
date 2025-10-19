export function themeFromRecentCount(count7d) {
  if (count7d >= 10) return { name: 'danger', bg: 'from-rose-50 to-rose-100', ring: 'ring-rose-200', accent: 'bg-rose-600', text: 'text-rose-900' };
  if (count7d >= 5) return { name: 'warning', bg: 'from-amber-50 to-amber-100', ring: 'ring-amber-200', accent: 'bg-amber-600', text: 'text-amber-900' };
  return { name: 'calm', bg: 'from-emerald-50 to-emerald-100', ring: 'ring-emerald-200', accent: 'bg-emerald-600', text: 'text-emerald-900' };
}


