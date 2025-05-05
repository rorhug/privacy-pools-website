import type { Metadata } from 'next';
import { Main } from '~/containers';

export const metadata: Metadata = {
  title: 'Privacy Pools',
  description:
    'Privacy Pools by 0xbow is a compliant way to anonymously transact on Ethereum. 0xbow blocks illicit actors to ensure pool integrity.',
  openGraph: {
    title: 'Privacy Pools',
    description:
      'Privacy Pools by 0xbow is a compliant way to anonymously transact on Ethereum. 0xbow blocks illicit actors to ensure pool integrity.',
    images: ['/BANNER.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Pools',
    description:
      'Privacy Pools by 0xbow is a compliant way to anonymously transact on Ethereum. 0xbow blocks illicit actors to ensure pool integrity.',
    images: ['/BANNER.png'],
  },
};

const Home = () => {
  return <Main />;
};

export default Home;
