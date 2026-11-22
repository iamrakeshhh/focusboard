import { useMemo } from 'react';
import { STATUSES, PRIORITIES } from '../data.js';
import TaskRow from './TaskRow.jsx';
import Select from './Select.jsx';
import Icon from './Icon.jsx';

const TABS = [{ value: 'all', label: 'All tasks' }, ...STATUSES];

// Search + status tab + priority filter, shared by Overview and My tasks.
export default function TasksPanel({ tasks, f, onStatus, onEdit, onDelete, onNew, onViewAll }) {
  const { query, setQuery, tab, setTab, priority, setPriority, reset } = f;

  // Derived data (never stored): the three filters combine with AND.
  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tasks.filter((t) =>
      (!q || t.title.toLowerCase().includes(q)) &&
      (tab === 'all' || t.status === tab) &&
      (priority === 'all' || t.priority === priority));
  }, [tasks, query, tab, priority]);

  const count = (v) => (v === 'all' ? tasks.length : tasks.filter((t) => t.status === v).length);

  return (
    <section className="tasks-sec" aria-labelledby="tasks-h">
      <div className="sec-head">
        <div>
          <h2 id="tasks-h">My tasks</h2>
          <p className="sub"><span className="hide-sm">Manage and track everything in one place.</span><span className="show-sm">Your priorities for this week.</span></p>
        </div>
        {onViewAll && <button type="button" className="btn soft hide-sm" onClick={onViewAll}>View all tasks</button>}
        <button type="button" className="plus show-sm" onClick={onNew} aria-label="New task"><Icon name="plus" size={20} /></button>
      </div>

      <div className="filters">
        <div className="tabs" role="group" aria-label="Filter by status">
          {TABS.map((t) => (
            <button key={t.value} type="button" aria-pressed={tab === t.value} onClick={() => setTab(t.value)}>
              <span>{t.value === 'all' ? <>All<span className="hide-sm"> tasks</span></> : t.label}</span>
              {tab === t.value && <span className="count">{count(t.value)}</span>}
            </button>
          ))}
        </div>
        <div className="search">
          <Icon name="search" size={18} />
          <label className="sr-only" htmlFor="search">Search tasks by title</label>
          <input id="search" type="search" placeholder="Find a task..." value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <Select id="pri" className="pri-select" aria-label="Filter by priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="all">Priority: All</option>
          {PRIORITIES.map((p) => <option key={p.value} value={p.value}>Priority: {p.label}</option>)}
        </Select>
      </div>

      {visible.length ? (
        <ul className="rows">
          {visible.map((t) => <TaskRow key={t.id} task={t} onStatus={onStatus} onEdit={onEdit} onDelete={onDelete} />)}
        </ul>
      ) : (
        <div className="empty" role="status">
          <p>{tasks.length ? 'No tasks match your search or filters.' : 'No tasks yet. Create your first task to get started.'}</p>
          {tasks.length > 0 && <button type="button" className="btn soft" onClick={reset}>Clear filters</button>}
        </div>
      )}
    </section>
  );
}
