import { Connector, CreateConnectorFn, useConnect } from 'wagmi';
import { setUserConnectedCookie } from '~/actions';
import { getEnv } from '~/config/env';
import { useNotifications } from './context/useNotificationsContext';
const { TEST_MODE } = getEnv();

export const useCustomConnect = () => {
  const { addNotification } = useNotifications();
  const { connectors, connectAsync } = useConnect();
  const availableConnectors = TEST_MODE ? connectors.filter((connector) => connector.id === 'mock') : connectors;

  const customConnect = async (connector: Connector<CreateConnectorFn>) => {
    try {
      await connectAsync({ connector });
      setUserConnectedCookie();
    } catch (error) {
      const err = error as Error;
      console.error(err);
      addNotification('error', `Failed to connect: ${err.message}`);
    }
  };

  return {
    availableConnectors,
    customConnect,
  };
};
