'use client';

import { styled } from '@mui/material';
import { ActivityPreview, GlobalPool, PoolAccountsPreview } from '~/containers';

export const Main = () => {
  return (
    <MainContainer>
      <PoolAccountsPreview />

      <GlobalPool />

      <ActivityPreview />
    </MainContainer>
  );
};

export const MainContainer = styled('div')(() => {
  return {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    gap: '2.4rem',
    marginTop: '2rem',
  };
});
