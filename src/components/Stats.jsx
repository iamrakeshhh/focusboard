import Icon from './Icon.jsx';

// Every number here is derived from the tasks array.
export default function Stats({ tasks }) {
  const total = tasks.length;
  const inProgress = tasks.filter((t) => t.status === 'in-progress').length;
  const completed = tasks.filter((t) => t.status === 'completed').length;
  const pct = total ? Math.round((completed / total) * 100) : 0;
  const cards = [
    { key: 'total', icon: 'list', label: 'Total tasks', value: total, hint: 'Across all projects' },
    { key: 'progress', icon: 'clock', label: 'In progress', value: inProgress, hint: 'Keep the momentum' },
    { key: 'done', icon: 'check', label: 'Completed', value: completed, hint: 'Great work this week', pct },
  ];
  return (
    <section aria-labelledby="overview-h">
      <h2 id="overview-h" className="overview-h">Overview</h2>
      <div className="stats">
        {cards.map((c) => (
          <div className={`stat stat-${c.key}`} key={c.key}>
            <div className="stat-top">
              <span className="stat-ico"><Icon name={c.icon} size={18} /></span>
              {c.label}
              {c.pct !== undefined && <span className="pct-chip" aria-label={`${c.pct} percent complete`}>{c.pct}%</span>}
            </div>
            <div className="stat-bottom"><strong>{c.value}</strong><span>{c.hint}</span></div>
          </div>
        ))}
      </div>
    </section>
  );
}
