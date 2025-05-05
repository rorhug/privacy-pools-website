'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { formatEther } from 'viem';
import { getConfig } from '~/config';
import { useChainContext, useExternalServices, useAccountContext } from '~/hooks';
import { aspClient } from '~/utils';

const {
  constants: { ITEMS_PER_PAGE },
} = getConfig();

export const useAdvancedView = () => {
  const {
    chainId,
    chain: { poolInfo, aspUrl },
  } = useChainContext();
  const { aspData, isLoading: isLoadingExternalServices } = useExternalServices();
  const { poolAccounts, historyData, hideEmptyPools } = useAccountContext();

  // moved outside useExternalServices to avoid pre-rendering errors with useSearchParams
  // https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page') || 1);

  const allEventsByPageQuery = useQuery({
    queryKey: ['asp_all_events_by_page', currentPage, chainId],
    queryFn: () => aspClient.fetchAllEvents(aspUrl, chainId, poolInfo.scope.toString(), currentPage),
    refetchInterval: 60000,
    retryOnMount: false,
  });
  const allEventsByPage = allEventsByPageQuery.data?.events ?? [];

  const isLoading = isLoadingExternalServices || allEventsByPageQuery.isLoading;

  // Ordered personal activity from newest to oldest
  const orderedPersonalActivity = useMemo(() => historyData.sort((a, b) => b.timestamp - a.timestamp), [historyData]);

  // Filter pool accounts based on hideEmptyPools setting
  const filteredPoolAccounts = useMemo(() => {
    return hideEmptyPools ? poolAccounts.filter((account) => formatEther(account.balance) !== '0') : poolAccounts;
  }, [poolAccounts, hideEmptyPools]);

  // Ordered pool accounts from newest to oldest
  const orderedPoolAccounts = useMemo(
    () => [...filteredPoolAccounts].sort((a, b) => Number(b.deposit.timestamp || 0) - Number(a.deposit.timestamp || 0)),
    [filteredPoolAccounts],
  );

  const fullPoolAccounts = useMemo(() => orderedPoolAccounts, [orderedPoolAccounts]);
  const previewPoolAccounts = useMemo(() => orderedPoolAccounts.slice(0, 6), [orderedPoolAccounts]);

  const fullPersonalActivity = useMemo(() => orderedPersonalActivity, [orderedPersonalActivity]);
  const previewPersonalActivity = useMemo(() => orderedPersonalActivity.slice(0, 6), [orderedPersonalActivity]);

  const recentGlobalEvents = useMemo(() => aspData?.allEventsData?.events ?? [], [aspData?.allEventsData?.events]);
  const previewGlobalEvents = useMemo(() => recentGlobalEvents?.slice(0, 6), [recentGlobalEvents]);

  return {
    ITEMS_PER_PAGE,
    previewPoolAccounts,
    fullPoolAccounts,
    previewGlobalEvents,
    allEventsByPage,
    previewPersonalActivity,
    fullPersonalActivity,
    isLoading,
    globalEventsCount: aspData?.allEventsData?.total ?? 0,
  };
};
