import { getConfig } from '~/config';

const url = `https://api.g.alchemy.com/prices/v1/${getConfig().env.ALCHEMY_KEY}/tokens/by-symbol?`;
const options = { method: 'GET', headers: { accept: 'application/json' } };

export const fetchTokenPrice = async (tokenSymbol: string) => {
  const response = await fetch(`${url}symbols=${tokenSymbol}`, options);
  const json = await response.json();
  const value = json.data?.[0]?.prices?.[0]?.value;
  return value;
};
