export const STATUSES = [
  { value: 'todo', label: 'To do' },
  { value: 'in-progress', label: 'In progress' },
  { value: 'completed', label: 'Completed' },
];
export const PRIORITIES = [
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
];
export const statusLabel = (v) => STATUSES.find((s) => s.value === v)?.label ?? v;
export const priorityLabel = (v) => PRIORITIES.find((p) => p.value === v)?.label ?? v;

// 12 tasks: 5 in progress + 7 completed, matching the Figma overview (12 / 5 / 7).
// Names, categories, priorities and dates come from the Figma frames; t3-t5 are extra in-progress items.
export const SAMPLE_TASKS = [
  { id: 't1', title: 'Design landing page', description: 'Website redesign · Due soon', category: 'Design', status: 'in-progress', priority: 'high', dueDate: '2026-11-22' },
  { id: 't2', title: 'Fix mobile navigation', description: 'Frontend sprint · UI polish', category: 'Development', status: 'in-progress', priority: 'medium', dueDate: '2026-11-24' },
  { id: 't3', title: 'Write onboarding emails', description: 'Draft the three-part welcome sequence', category: 'Content', status: 'in-progress', priority: 'medium', dueDate: '2026-11-26' },
  { id: 't4', title: 'Set up analytics events', description: 'Track sign-up and task creation', category: 'Development', status: 'in-progress', priority: 'high', dueDate: '2026-11-28' },
  { id: 't5', title: 'Plan launch campaign', description: 'Outline channels and messaging', category: 'Marketing', status: 'in-progress', priority: 'medium', dueDate: '2026-11-30' },
  { id: 't6', title: 'Review onboarding copy', description: 'Content updates · Approved', category: 'Content', status: 'completed', priority: 'low', dueDate: '2026-11-16' },
  { id: 't7', title: 'Update brand guidelines', description: 'Refresh color tokens and type scale', category: 'Design', status: 'completed', priority: 'low', dueDate: '2026-11-12' },
  { id: 't8', title: 'Write release notes', description: 'Version 1.2 highlights and fixes', category: 'Content', status: 'completed', priority: 'medium', dueDate: '2026-11-14' },
  { id: 't9', title: 'Audit color contrast', description: 'Check all components against WCAG AA', category: 'Design', status: 'completed', priority: 'medium', dueDate: '2026-11-10' },
  { id: 't10', title: 'Refactor task helpers', description: 'Extract shared filtering utilities', category: 'Development', status: 'completed', priority: 'low', dueDate: '2026-11-09' },
  { id: 't11', title: 'Plan Q1 roadmap', description: 'Outline goals and milestones for next quarter', category: 'Planning', status: 'completed', priority: 'medium', dueDate: '2026-11-18' },
  { id: 't12', title: 'Archive old campaigns', description: 'Clean up expired promotion pages', category: 'Marketing', status: 'completed', priority: 'low', dueDate: '2026-11-08' },
];

// The three Focus Notes slides from Figma (15:2, 15:30, 15:58).
export const FOCUS_NOTES = [
  { title: 'Make today count.', sub: 'A little focus goes a long way.', tag: 'Next up', card: 'Design landing page', pct: 62 },
  { title: 'Small steps, big progress.', sub: 'Keep your priorities in view.', tag: 'In progress', card: 'Fix navigation', pct: 47 },
  { title: 'Celebrate the wins.', sub: 'Every completed task moves you forward.', tag: 'Completed', card: 'Onboarding copy', pct: 100 },
];
