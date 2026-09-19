import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://nitrodrive.example'),
  title: { default: 'NitroDrive | Race. Drift. Dominate.', template: '%s | NitroDrive' },
  description: 'Play free racing, drifting, stunt and 3D car games online on NitroDrive.',
  openGraph: { type: 'website', siteName: 'NitroDrive', title: 'NitroDrive | Race. Drift. Dominate.', description: 'Play free racing, drifting, stunt and 3D car games online.' },
  twitter: { card: 'summary_large_image', title: 'NitroDrive | Race. Drift. Dominate.', description: 'Play free racing, drifting, stunt and 3D car games online.' }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><Header /><main>{children}</main><Footer /></body></html>;
}
