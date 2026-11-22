import { useEffect, useRef, useState } from 'react';
import Icon from './Icon.jsx';
import { STATUSES, statusLabel, priorityLabel } from '../data.js';

const fmt = (d) => (d ? new Date(d + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'No date');
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-');

function RowMenu({ task, onStatus, onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    ref.current.querySelector('[role="menuitem"]')?.focus();
    const away = (e) => !ref.current.contains(e.target) && setOpen(false);
    const key = (e) => {
      if (e.key === 'Escape') { setOpen(false); ref.current.querySelector('button').focus(); }
    };
    document.addEventListener('mousedown', away);
    document.addEventListener('keydown', key);
    return () => { document.removeEventListener('mousedown', away); document.removeEventListener('keydown', key); };
  }, [open]);

  const arrows = (e) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    e.preventDefault();
    const items = [...ref.current.querySelectorAll('[role="menuitem"]')];
    const i = items.indexOf(document.activeElement);
    items[(i + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length].focus();
  };
  const run = (fn) => () => { setOpen(false); fn(); };

  return (
    <div className="menu-wrap" ref={ref}>
      <button type="button" className="icon-btn" aria-haspopup="menu" aria-expanded={open}
        aria-label={`Actions for ${task.title}`} onClick={() => setOpen((o) => !o)}><Icon name="dots" /></button>
      {open && (
        <div className="menu" role="menu" onKeyDown={arrows}>
          {STATUSES.filter((s) => s.value !== task.status).map((s) => (
            <button key={s.value} type="button" role="menuitem" onClick={run(() => onStatus(task.id, s.value))}>Move to {s.label}</button>
          ))}
          <button type="button" role="menuitem" onClick={run(() => onEdit(task))}>Edit task</button>
          <button type="button" role="menuitem" className="danger" onClick={run(() => onDelete(task))}>Delete task</button>
        </div>
      )}
    </div>
  );
}

export default function TaskRow({ task, onStatus, onEdit, onDelete }) {
  const done = task.status === 'completed';
  return (
    <li className="row">
      <button type="button" className={`check ${task.status}`} aria-pressed={done}
        aria-label={`Mark ${task.title} as completed`} onClick={() => onStatus(task.id, done ? 'todo' : 'completed')}>
        {done ? <Icon name="check" size={16} strokeWidth={3} /> : <i />}
      </button>
      <div className="row-main">
        <h3>{task.title}</h3>
        {task.description && <p>{task.description}</p>}
        <span className="sr-only">Status: {statusLabel(task.status)}</span>
      </div>
      <div className="tags">
        <span className={`pill cat-${slug(task.category || 'general')}`}>{task.category || 'General'}</span>
        <span className={`pill pri-${task.priority}`}>{priorityLabel(task.priority)}</span>
        <time className="due" dateTime={task.dueDate}><Icon name="calendar" size={16} />{fmt(task.dueDate)}</time>
      </div>
      <RowMenu task={task} onStatus={onStatus} onEdit={onEdit} onDelete={onDelete} />
    </li>
  );
}
