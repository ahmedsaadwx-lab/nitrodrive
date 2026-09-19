type Props = { label?: string; className?: string };
export default function AdContainer({ label = 'Advertisement', className = '' }: Props) {
  return <div className={`ad ${className}`} aria-label={label}>{label}</div>;
}
