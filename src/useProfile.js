import { useEffect, useState } from 'react';

const KEY = 'focusboard.profile.v1';
const DEFAULT = { name: 'Jane Doe' };

function load() {
  try {
    const p = JSON.parse(localStorage.getItem(KEY));
    if (p && typeof p.name === 'string' && p.name.trim()) return p;
  } catch { /* ignore corrupted or blocked storage */ }
  return DEFAULT;
}

export const initials = (name) =>
  name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join('').toUpperCase() || '?';

export function useProfile() {
  const [profile, setProfile] = useState(load);
  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(profile)); } catch { /* storage unavailable */ }
  }, [profile]);
  return [profile, setProfile];
}
