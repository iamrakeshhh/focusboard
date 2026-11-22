import { useState } from 'react';
import Modal from './Modal.jsx';
import Select from './Select.jsx';
import Icon from './Icon.jsx';
import { STATUSES, PRIORITIES } from '../data.js';

const EMPTY = { title: '', description: '', category: 'General', status: 'todo', priority: 'medium', dueDate: '' };

export default function TaskForm({ task, onSave, onClose }) {
  const [v, setV] = useState(task ?? EMPTY);
  const [error, setError] = useState('');
  const set = (k) => (e) => {
    setV({ ...v, [k]: e.target.value });
    if (k === 'title') setError('');
  };

  const submit = (e) => {
    e.preventDefault();
    const title = v.title.trim();
    if (!title) return setError('Task title is required. Enter a short name for your task.');
    if (title.length > 80) return setError('Task title must be 80 characters or fewer.');
    onSave({ ...v, title, description: v.description.trim() });
  };

  return (
    <Modal title={task ? 'Edit task' : 'Create new task'}
      subtitle={task ? 'Update the details of your task.' : 'Add your task details to stay on top of your work.'} onClose={onClose}>
      <form onSubmit={submit} noValidate>
        <div className="field">
          <label htmlFor="f-title">Task title <span aria-hidden="true">*</span></label>
          <input id="f-title" value={v.title} onChange={set('title')} placeholder="e.g. Update pricing page" maxLength={120}
            aria-required="true" aria-invalid={!!error} aria-describedby={error ? 'f-err' : undefined} />
          {error && <p className="error" id="f-err" role="alert">{error}</p>}
        </div>
        <div className="field">
          <label htmlFor="f-desc">Description</label>
          <textarea id="f-desc" rows="3" value={v.description} onChange={set('description')} placeholder="Add notes about this task..." />
        </div>
        <div className="grid2">
          <div className="field">
            <label htmlFor="f-status">Status</label>
            <Select id="f-status" value={v.status} onChange={set('status')}>
              {STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </Select>
          </div>
          <div className="field">
            <label htmlFor="f-pri">Priority</label>
            <Select id="f-pri" value={v.priority} onChange={set('priority')}>
              {PRIORITIES.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
            </Select>
          </div>
        </div>
        <div className="field">
          <label htmlFor="f-due">Due date</label>
          <div className="date"><Icon name="calendar" size={18} /><input id="f-due" type="date" value={v.dueDate} onChange={set('dueDate')} /></div>
        </div>
        <p className="req-note">* Required field</p>
        <div className="form-actions">
          <button type="button" className="btn ghost" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn primary">{task ? 'Save changes' : 'Create task'}</button>
        </div>
      </form>
    </Modal>
  );
}
