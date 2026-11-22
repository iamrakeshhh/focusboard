import { useState } from 'react';
import Modal from './Modal.jsx';

export default function Settings({ profile, onProfile, count, onReset, onClear }) {
  const [ask, setAsk] = useState(null); // null | 'reset' | 'clear'
  const [name, setName] = useState(profile.name);
  const [msg, setMsg] = useState('');
  const saveName = (e) => {
    e.preventDefault();
    const n = name.trim();
    if (!n) return setMsg('Display name is required.');
    onProfile({ ...profile, name: n });
    setName(n);
    setMsg('Profile saved.');
  };
  const copy = {
    reset: { title: 'Reset to sample data?', text: 'All your tasks will be replaced with the original sample tasks.', ok: 'Reset data', run: onReset },
    clear: { title: 'Delete all tasks?', text: 'Every task will be removed permanently.', ok: 'Delete all', run: onClear },
  };
  const c = ask && copy[ask];
  return (
    <section aria-label="Settings" className="settings">
      <form className="panel" onSubmit={saveName} noValidate>
        <h2>Profile</h2>
        <p className="sub">Your name appears in the account menu in the top corner.</p>
        <div className="field profile-field">
          <label htmlFor="p-name">Display name</label>
          <input id="p-name" value={name} maxLength={40} onChange={(e) => { setName(e.target.value); setMsg(''); }}
            aria-invalid={msg === 'Display name is required.'} aria-describedby="p-msg" />
          <p id="p-msg" className={msg.startsWith('Profile') ? 'ok' : 'error'} role="status">{msg}</p>
        </div>
        <button type="submit" className="btn primary">Save profile</button>
      </form>
      <div className="panel">
        <h2>Your data</h2>
        <p className="sub">Tasks are stored only in this browser (localStorage). You currently have {count} {count === 1 ? 'task' : 'tasks'}.</p>
        <div className="setting-row">
          <div><h3>Reset to sample data</h3><p className="sub">Restore the original 12 example tasks.</p></div>
          <button type="button" className="btn ghost" onClick={() => setAsk('reset')}>Reset data</button>
        </div>
        <div className="setting-row">
          <div><h3>Delete all tasks</h3><p className="sub">Start with a clean, empty board.</p></div>
          <button type="button" className="btn ghost danger-text" onClick={() => setAsk('clear')}>Delete all</button>
        </div>
      </div>
      {c && (
        <Modal small title={c.title} subtitle={c.text} onClose={() => setAsk(null)}>
          <div className="form-actions">
            <button type="button" className="btn ghost" data-autofocus onClick={() => setAsk(null)}>Cancel</button>
            <button type="button" className="btn danger" onClick={() => { c.run(); setAsk(null); }}>{c.ok}</button>
          </div>
        </Modal>
      )}
    </section>
  );
}
