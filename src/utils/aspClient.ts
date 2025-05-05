import { getConfig } from '~/config';
import { MtRootResponse, PoolResponse, MtLeavesResponse, DepositsByLabelResponse, AllEventsResponse } from '~/types';

const {
  constants: { ITEMS_PER_PAGE },
} = getConfig();

const fetchJWT = async (): Promise<string> => {
  const response = await fetch('/api/token');
  if (!response.ok) throw new Error('Failed to get token');
  const { token } = await response.json();
  return token;
};

const fetchPublic = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  if (!response.ok) throw new Error(`Request failed: ${response.statusText}`);
  return response.json();
};

const fetchPrivate = async <T>(url: string, headers?: Record<string, string>): Promise<T> => {
  const token = await fetchJWT();

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      ...headers,
    },
  });

  if (!response.ok) throw new Error(`Request failed: ${response.statusText}`);
  return response.json();
};

const aspClient = {
  fetchPoolInfo: (aspUrl: string, chainId: number, scope: string) =>
    fetchPublic<PoolResponse>(`${aspUrl}/${chainId}/public/pool-info/${scope}`),

  fetchAllEvents: (aspUrl: string, chainId: number, scope: string, page = 1, perPage = ITEMS_PER_PAGE) =>
    fetchPrivate<AllEventsResponse>(`${aspUrl}/${chainId}/private/events/${scope}?page=${page}&perPage=${perPage}`),

  fetchDepositsByLabel: (aspUrl: string, chainId: number, scope: string, labels: string[]) =>
    fetchPrivate<DepositsByLabelResponse>(`${aspUrl}/${chainId}/private/deposits/${scope}`, {
      'X-labels': labels.join(','),
    }),

  fetchMtRoots: (aspUrl: string, chainId: number, scope: string) =>
    fetchPublic<MtRootResponse>(`${aspUrl}/${chainId}/public/mt-roots/${scope}`),

  fetchMtLeaves: (aspUrl: string, chainId: number, scope: string) =>
    fetchPrivate<MtLeavesResponse>(`${aspUrl}/${chainId}/private/mt-leaves/${scope}`),
};

export { aspClient };
