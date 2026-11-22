import { useMemo, useState } from 'react';
import Icon from './Icon.jsx';
import TaskRow from './TaskRow.jsx';

const DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

// Month grid of due dates. Clicking a day lists its tasks below (with full edit/status/delete actions).
export default function Calendar({ tasks, onStatus, onEdit, onDelete }) {
  const today = iso(new Date());
  const [cursor, setCursor] = useState(() => { const d = new Date(); return new Date(d.getFullYear(), d.getMonth(), 1); });
  const [selected, setSelected] = useState(today);

  const byDate = useMemo(() => {
    const m = {};
    tasks.forEach((t) => { if (t.dueDate) (m[t.dueDate] ||= []).push(t); });
    return m;
  }, [tasks]);

  const cells = useMemo(() => {
    const y = cursor.getFullYear(), mo = cursor.getMonth();
    const offset = new Date(y, mo, 1).getDay();
    const total = Math.ceil((offset + new Date(y, mo + 1, 0).getDate()) / 7) * 7;
    return Array.from({ length: total }, (_, i) => new Date(y, mo, 1 - offset + i));
  }, [cursor]);

  const shift = (n) => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + n, 1));
  const goToday = () => { const d = new Date(); setCursor(new Date(d.getFullYear(), d.getMonth(), 1)); setSelected(today); };
  const dayTasks = byDate[selected] ?? [];
  const selLabel = new Date(selected + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <section aria-label="Calendar">
      <div className="cal">
        <div className="cal-head">
          <h2 aria-live="polite">{cursor.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h2>
          <button type="button" className="btn soft" onClick={goToday}>Today</button>
          <button type="button" className="icon-btn bordered" onClick={() => shift(-1)} aria-label="Previous month"><Icon name="left" size={18} /></button>
          <button type="button" className="icon-btn bordered" onClick={() => shift(1)} aria-label="Next month"><Icon name="right" size={18} /></button>
        </div>
        <div className="cal-grid">
          {DOW.map((d) => <div className="cal-dow" key={d}>{d}</div>)}
          {cells.map((d) => {
            const key = iso(d);
            const list = byDate[key] ?? [];
            const out = d.getMonth() !== cursor.getMonth();
            return (
              <button key={key} type="button" aria-pressed={selected === key}
                className={`cal-day${out ? ' out' : ''}${key === today ? ' today' : ''}`}
                onClick={() => setSelected(key)}
                aria-label={`${d.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}, ${list.length} ${list.length === 1 ? 'task' : 'tasks'}`}>
                <span className="num">{d.getDate()}</span>
                {list.slice(0, 2).map((t) => <span key={t.id} className={`ev ${t.status}`}>{t.title}</span>)}
                {list.length > 2 && <span className="more">+{list.length - 2} more</span>}
                {list.length > 0 && <span className="cal-dots" aria-hidden="true">{list.slice(0, 3).map((t) => <i key={t.id} />)}</span>}
              </button>
            );
          })}
        </div>
      </div>
      <h3 className="day-h">{selLabel}</h3>
      {dayTasks.length ? (
        <ul className="rows">
          {dayTasks.map((t) => <TaskRow key={t.id} task={t} onStatus={onStatus} onEdit={onEdit} onDelete={onDelete} />)}
        </ul>
      ) : <p className="empty" role="status">No tasks due on this day.</p>}
    </section>
  );
}
