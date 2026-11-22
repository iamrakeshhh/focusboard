import { useEffect, useReducer } from 'react';
import { SAMPLE_TASKS } from './data.js';

const KEY = 'focusboard.tasks.v2';

// Seed data is used ONLY when nothing valid is saved, so it never overwrites user work.
function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw !== null) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    /* corrupted or blocked storage: fall through to seed */
  }
  return SAMPLE_TASKS;
}

function reducer(tasks, action) {
  switch (action.type) {
    case 'add':
      return [{ ...action.task, id: crypto.randomUUID?.() ?? String(Date.now() + Math.random()) }, ...tasks];
    case 'update':
      return tasks.map((t) => (t.id === action.task.id ? { ...t, ...action.task } : t));
    case 'status':
      return tasks.map((t) => (t.id === action.id ? { ...t, status: action.status } : t));
    case 'reset':
      return SAMPLE_TASKS;
    case 'clear':
      return [];
    case 'delete':
      return tasks.filter((t) => t.id !== action.id);
    default:
      return tasks;
  }
}

export function useTasks() {
  const [tasks, dispatch] = useReducer(reducer, undefined, load);
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(tasks));
    } catch {
      /* quota exceeded or private mode: app still works in memory */
    }
  }, [tasks]);
  return [tasks, dispatch];
}
