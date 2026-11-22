import { useEffect, useState } from 'react';
import { useTasks } from './useTasks.js';
import { useProfile } from './useProfile.js';
import { Sidebar, BottomNav, Header, VIEWS } from './components/Nav.jsx';
import Stats from './components/Stats.jsx';
import Carousel from './components/Carousel.jsx';
import TasksPanel from './components/TasksPanel.jsx';
import Calendar from './components/Calendar.jsx';
import Settings from './components/Settings.jsx';
import TaskForm from './components/TaskForm.jsx';
import Modal from './components/Modal.jsx';

const readView = () => {
  const h = window.location.hash.slice(1);
  return VIEWS.some((v) => v.id === h) ? h : 'overview';
};

const PAGES = {
  overview: { title: <>Your work, <br className="show-sm" />in focus.</>, sub: 'Plan your day, stay organized, and celebrate small wins.' },
  tasks: { title: 'My tasks', sub: 'Search, filter and manage every task in one place.' },
  calendar: { title: 'Calendar', sub: 'See what is due and when.' },
  settings: { title: 'Settings', sub: 'Manage your FocusBoard data.' },
};

export default function App() {
  const [tasks, dispatch] = useTasks();
  const [profile, setProfile] = useProfile();
  const [view, setView] = useState(readView);
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState('all');
  const [priority, setPriority] = useState('all');
  const [form, setForm] = useState(null); // null | 'new' | task being edited
  const [toDelete, setToDelete] = useState(null);

  // Navigation lives in the URL hash so refresh and back/forward keep the current page.
  useEffect(() => {
    const onHash = () => setView(readView());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  const label = VIEWS.find((v) => v.id === view).label;
  useEffect(() => {
    document.title = `${label} · FocusBoard`;
    window.scrollTo(0, 0);
  }, [label]);

  const f = { query, setQuery, tab, setTab, priority, setPriority, reset: () => { setQuery(''); setTab('all'); setPriority('all'); } };
  const actions = {
    onStatus: (id, status) => dispatch({ type: 'status', id, status }),
    onEdit: setForm,
    onDelete: setToDelete,
    onNew: () => setForm('new'),
  };
  const save = (data) => {
    dispatch({ type: form === 'new' ? 'add' : 'update', task: data });
    setForm(null);
  };
  const page = PAGES[view];

  return (
    <div className="app">
      <Sidebar view={view} />
      <div className="main-col">
        <Header label={label} profile={profile} />
        <main className="page">
          <div className="hero">
            <div>
              <h1>{page.title}</h1>
              <p className="sub">{page.sub}</p>
            </div>
            {view !== 'settings' && <button type="button" className="btn primary hide-sm" onClick={actions.onNew}>New task</button>}
          </div>

          {view === 'overview' && (
            <>
              <Carousel />
              <Stats tasks={tasks} />
              <TasksPanel tasks={tasks} f={f} {...actions} onViewAll={() => { f.reset(); window.location.hash = 'tasks'; }} />
            </>
          )}
          {view === 'tasks' && <TasksPanel tasks={tasks} f={f} {...actions} />}
          {view === 'calendar' && <Calendar tasks={tasks} {...actions} />}
          {view === 'settings' && <Settings profile={profile} onProfile={setProfile} count={tasks.length} onReset={() => dispatch({ type: 'reset' })} onClear={() => dispatch({ type: 'clear' })} />}
        </main>
      </div>
      <BottomNav view={view} />

      {form && <TaskForm task={form === 'new' ? null : form} onSave={save} onClose={() => setForm(null)} />}
      {toDelete && (
        <Modal small title="Delete this task?" subtitle={`“${toDelete.title}” will be removed permanently.`} onClose={() => setToDelete(null)}>
          <div className="form-actions">
            <button type="button" className="btn ghost" data-autofocus onClick={() => setToDelete(null)}>Cancel</button>
            <button type="button" className="btn danger" onClick={() => { dispatch({ type: 'delete', id: toDelete.id }); setToDelete(null); }}>Delete task</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
