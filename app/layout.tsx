import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { SITE_NAME, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: { default: 'NitroDrive | Race. Drift. Dominate.', template: '%s | NitroDrive' },
  description: 'Play free racing, drifting, stunt and 3D car games online on NitroDrive.',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 }
  },
  openGraph: { type: 'website', siteName: SITE_NAME, locale: 'en_US', title: 'NitroDrive | Race. Drift. Dominate.', description: 'Play free racing, drifting, stunt and 3D car games online.' },
  twitter: { card: 'summary_large_image', title: 'NitroDrive | Race. Drift. Dominate.', description: 'Play free racing, drifting, stunt and 3D car games online.' }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><Header /><main>{children}</main><Footer /></body></html>;
}
