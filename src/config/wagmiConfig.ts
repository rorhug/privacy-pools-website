'use client';

import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  rainbowWallet,
  walletConnectWallet,
  injectedWallet,
  coinbaseWallet,
  metaMaskWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { HttpTransport } from 'viem';
import { createConfig, http } from 'wagmi';
import { mock } from 'wagmi/connectors';
import { getConfig, whitelistedChains, chainData } from '~/config';

const { PROJECT_ID, TEST_MODE } = getConfig().env;

const getWallets = () => {
  if (PROJECT_ID) {
    return [rainbowWallet, walletConnectWallet, metaMaskWallet, coinbaseWallet];
  } else {
    return [injectedWallet];
  }
};

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: getWallets(),
    },
  ],
  {
    appName: 'Privacy Pool',
    projectId: PROJECT_ID,
  },
);

export const transports = whitelistedChains.reduce(
  (acc, chain) => {
    acc[chain.id] = http(chainData[chain.id].rpcUrl);
    return acc;
  },
  {} as Record<number, HttpTransport>,
);

export const defaultConfig = createConfig({
  chains: whitelistedChains,
  ssr: false,
  storage: null,
  transports,
  batch: { multicall: true },
  connectors,
});

// Random test address
export const USER_TEST_ADDRESS = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';

const testConfig = createConfig({
  chains: whitelistedChains,
  connectors: [
    mock({
      accounts: [USER_TEST_ADDRESS],
    }),
  ],
  batch: { multicall: true },
  transports,
  ssr: true,
});

export const config = TEST_MODE ? testConfig : defaultConfig;
