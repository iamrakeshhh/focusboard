import Icon from './Icon.jsx';
import ProfileMenu from './ProfileMenu.jsx';

export const VIEWS = [
  { id: 'overview', label: 'Overview', short: 'Overview', icon: 'grid' },
  { id: 'tasks', label: 'My tasks', short: 'Tasks', icon: 'list' },
  { id: 'calendar', label: 'Calendar', short: 'Calendar', icon: 'calendar' },
  { id: 'settings', label: 'Settings', short: 'Settings', icon: 'settings' },
];

export function Logo() {
  return (
    <span className="brand">
      <svg width="36" height="36" viewBox="0 0 36 36" aria-hidden="true">
        <rect width="36" height="36" rx="10" fill="#5b4de8" />
        <rect x="9" y="9" width="8" height="8" rx="2.5" fill="#fff" />
        <rect x="19" y="9" width="8" height="8" rx="2.5" fill="#fff" opacity=".85" />
        <rect x="9" y="19" width="8" height="8" rx="2.5" fill="#fff" opacity=".85" />
        <rect x="19" y="19" width="8" height="8" rx="2.5" fill="#fff" />
      </svg>
      FocusBoard
    </span>
  );
}

// Links change location.hash; App listens for hashchange, so back/forward and refresh work.
export function Sidebar({ view }) {
  return (
    <aside className="sidebar">
      <Logo />
      <p className="ws-label">Workspace</p>
      <nav aria-label="Main">
        <ul>
          {VIEWS.map((it) => (
            <li key={it.id}>
              <a href={`#${it.id}`} className="nav-item" aria-current={view === it.id ? 'page' : undefined}>
                <Icon name={it.icon} size={22} />{it.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export function BottomNav({ view }) {
  return (
    <nav className="bottomnav" aria-label="Mobile">
      <ul>
        {VIEWS.map((it) => (
          <li key={it.id}>
            <a href={`#${it.id}`} aria-current={view === it.id ? 'page' : undefined}>
              <Icon name={it.icon} size={22} /><span>{it.short}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Header({ label, profile }) {
  return (
    <header className="topbar">
      <div className="topbar-brand"><Logo /></div>
      <p className="crumbs"><span>Workspace</span><span aria-hidden="true">/</span><strong>{label}</strong></p>
      <ProfileMenu profile={profile} />
    </header>
  );
}
