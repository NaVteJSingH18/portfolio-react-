export default function SocialIcon({ link, size = 20 }) {
  if (link.iconClass) {
    return <i className={link.iconClass} style={{ fontSize: `${size}px` }} aria-hidden="true" />;
  }
  const Icon = link.icon;
  return <Icon size={size} />;
}