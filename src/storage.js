const KEYS = {
  events: 'mindguard:events', // [{timestamp: ISO, type: 'masturbation'|'relapse'}]
  notes: 'mindguard:notes',   // [{id, timestamp, text}]
  triggers: 'mindguard:triggers', // [string]
  settings: 'mindguard:settings', // {pinHash?, goal?, theme?}
};

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getEvents() {
  return readJson(KEYS.events, []);
}

export function addEvent(event) {
  const events = getEvents();
  events.push({ ...event, timestamp: event.timestamp ?? new Date().toISOString() });
  writeJson(KEYS.events, events);
  return events;
}

export function removeLastEvent() {
  const events = getEvents();
  events.pop();
  writeJson(KEYS.events, events);
  return events;
}

export function getNotes() {
  return readJson(KEYS.notes, []);
}

export function addNote(text) {
  const notes = getNotes();
  const note = { id: crypto.randomUUID(), timestamp: new Date().toISOString(), text };
  notes.unshift(note);
  writeJson(KEYS.notes, notes);
  return note;
}

export function getTriggers() {
  return readJson(KEYS.triggers, []);
}

export function setTriggers(list) {
  writeJson(KEYS.triggers, list);
}

export function getSettings() {
  return readJson(KEYS.settings, {});
}

export function setSettings(partial) {
  const current = getSettings();
  writeJson(KEYS.settings, { ...current, ...partial });
}

export function exportAll() {
  return {
    events: getEvents(),
    notes: getNotes(),
    triggers: getTriggers(),
    settings: getSettings(),
  };
}

export function importAll(data) {
  if (data.events) writeJson(KEYS.events, data.events);
  if (data.notes) writeJson(KEYS.notes, data.notes);
  if (data.triggers) writeJson(KEYS.triggers, data.triggers);
  if (data.settings) writeJson(KEYS.settings, data.settings);
}

export const StorageKeys = KEYS;


