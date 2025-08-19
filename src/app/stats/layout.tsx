import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Statistics | Privacy Pools',
  description:
    'Real-time analytics and insights for Privacy Pools. View transaction volumes, user statistics, and privacy metrics.',
  openGraph: {
    title: 'Statistics | Privacy Pools',
    description:
      'Real-time analytics and insights for Privacy Pools. View transaction volumes, user statistics, and privacy metrics.',
    images: ['/BANNER.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Statistics | Privacy Pools',
    description:
      'Real-time analytics and insights for Privacy Pools. View transaction volumes, user statistics, and privacy metrics.',
    images: ['/BANNER.png'],
  },
};

export default function StatsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
