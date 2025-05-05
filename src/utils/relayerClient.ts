import { FeesResponse, RelayRequestBody, RelayerResponse } from '~/types';

interface FetchClient {
  fetchFees: (relayerUrl: string, chainId: number, assetAddress: string) => Promise<FeesResponse>;
  relay: (relayerUrl: string, input: RelayRequestBody) => Promise<RelayerResponse>;
}

const fetchClient: FetchClient = {
  fetchFees: async (relayerUrl: string, chainId: number, assetAddress: string) => {
    const response = await fetch(`${relayerUrl}/relayer/details?chainId=${chainId}&assetAddress=${assetAddress}`);
    const data = await response.json();
    return data;
  },
  relay: async (relayerUrl: string, { withdrawal, proof, publicSignals, scope, chainId }: RelayRequestBody) => {
    const response = await fetch(`${relayerUrl}/relayer/request`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          withdrawal,
          proof,
          publicSignals,
          scope,
          chainId,
        },
        (_key, value) => (typeof value === 'bigint' ? value.toString() : value),
      ),
    });

    const data = await response.json();
    return data;
  },
};

export const relayerClient = fetchClient;
