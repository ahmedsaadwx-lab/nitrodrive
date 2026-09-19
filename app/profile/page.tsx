import type { Metadata } from 'next';
import ProfileDashboard from '@/components/profile/ProfileDashboard';

export const metadata: Metadata = { title: 'Player Profile', robots: { index: false, follow: false } };

export default function ProfilePage() {
  return <ProfileDashboard />;
}
