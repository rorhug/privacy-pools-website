import Image from 'next/image';

export const Logo = () => {
  return <Image src='/logo.svg' alt='Privacy Pools logo' width={28} height={28} priority />;
};
