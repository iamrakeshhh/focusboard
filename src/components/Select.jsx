import Icon from './Icon.jsx';

// Native <select> (keyboard + screen-reader friendly) with a custom chevron.
export default function Select({ className = '', children, ...props }) {
  return (
    <div className={`select ${className}`}>
      <select {...props}>{children}</select>
      <Icon name="down" size={16} />
    </div>
  );
}
