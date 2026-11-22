import { useEffect, useRef, useState } from 'react';
import Icon from './Icon.jsx';
import { initials } from '../useProfile.js';

// Avatar dropdown: Esc / outside click closes, arrow keys move between items.
export default function ProfileMenu({ profile }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const ini = initials(profile.name);

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

  return (
    <div className="profile" ref={ref}>
      <button type="button" className="avatar-btn" aria-haspopup="menu" aria-expanded={open}
        aria-label={`Account menu for ${profile.name}`} onClick={() => setOpen((o) => !o)}>
        <span className="avatar">{ini}</span><Icon name="down" size={14} />
      </button>
      {open && (
        <div className="menu profile-menu" role="menu" onKeyDown={arrows}>
          <div className="menu-user">
            <span className="avatar big" aria-hidden="true">{ini}</span>
            <div><strong>{profile.name}</strong><span>Workspace member</span></div>
          </div>
          <a href="#tasks" role="menuitem" onClick={() => setOpen(false)}>My tasks</a>
          <a href="#calendar" role="menuitem" onClick={() => setOpen(false)}>Calendar</a>
          <a href="#settings" role="menuitem" onClick={() => setOpen(false)}>Profile &amp; settings</a>
        </div>
      )}
    </div>
  );
}
