type Props = { label?: string; className?: string };

export default function AdSlot({ label = 'Advertisement', className = '' }: Props) {
  return <div className={`ad ad-slot ${className}`} aria-label={label} role="complementary"><span>{label}</span></div>;
}
