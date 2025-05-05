'use client';

import { ChangeEvent, FocusEventHandler, useMemo, useState } from 'react';
import Image from 'next/image';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import { Address, formatEther, formatUnits, getAddress, parseEther, parseUnits } from 'viem';
import { mainnet, sepolia } from 'viem/chains';
import {
  AmountInput,
  CoinIcon,
  ImageContainer,
  InputContainer,
  MaxButton,
  ModalContainer,
  ModalTitle,
} from '~/containers/Modals/Deposit';
import { useChainContext, useExternalServices, useAccountContext, useModal, usePoolAccountsContext } from '~/hooks';
import { ModalType, PoolAccount, ReviewStatus } from '~/types';
import { getUsdBalance } from '~/utils';
import { LinksSection } from '../LinksSection';

export const WithdrawForm = () => {
  const { setModalOpen } = useModal();
  const {
    chain: { symbol, decimals, image },
    price: currentPrice,
    chainId,
    setSelectedRelayer,
    selectedRelayer,
    relayers,
    relayersData,
  } = useChainContext();

  const { relayerData } = useExternalServices();
  const { amount, setAmount, target, setTarget, poolAccount, setPoolAccount } = usePoolAccountsContext();
  const { poolAccounts } = useAccountContext();

  const filteredPoolAccounts = poolAccounts.filter((pa) => pa.balance > 0n);

  const [targetAddressHasError, setTargetAddressHasError] = useState(false);

  const balanceFormatted = formatEther(poolAccount?.balance ?? BigInt(0));
  const balanceUSD = getUsdBalance(currentPrice, balanceFormatted, decimals);
  const isValidAmount = parseEther(amount) <= BigInt(poolAccount?.balance ?? 0);

  const relayerFee = relayerData.fees ? (BigInt(relayerData.fees) * parseUnits(amount, decimals)) / 100n / 100n : '0';
  const feeFormatted = formatEther(BigInt(relayerFee));
  const feeUSD = getUsdBalance(currentPrice, feeFormatted, decimals);
  const feeText = `Fee ${feeFormatted} ${symbol} ~ ${feeUSD} USD`;

  const amountHasError = !Number(amount);

  const isWithdrawDisabled =
    amountHasError || !relayerData.relayerAddress || !target || targetAddressHasError || !isValidAmount;

  const errorMessage = useMemo(() => {
    if (!amount) return '';
    if (!isValidAmount) return `Maximum withdraw amount is ${formatEther(poolAccount?.balance ?? 0n)} ${symbol}`;
    if (amountHasError) return 'Withdrawal amount must be greater than 0';
    return '';
  }, [amount, isValidAmount, poolAccount?.balance, symbol, amountHasError]);

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const normalizedInput = e.target.value.replace(/[^0-9.]+/g, '').replace(/(\..*)\..*/g, '$1');
    setAmount(normalizedInput.slice(0, 6));
  };

  const handlePoolAccountChange = (e: SelectChangeEvent<unknown>) => {
    setPoolAccount(filteredPoolAccounts.find((pa) => pa.name === e.target.value) as PoolAccount);
  };

  const handleTargetAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTarget(e.target.value as Address);
  };

  const handleTargetAddressBlur: FocusEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.value) return;

    try {
      getAddress(e.target.value);
      setTargetAddressHasError(false);
    } catch (err) {
      console.error(err);
      setTargetAddressHasError(true);
    }
  };

  const handleRelayerChange = (e: SelectChangeEvent<unknown>) => {
    setSelectedRelayer(relayers.find((relayer) => relayer.url === e.target.value) as { name: string; url: string });
  };

  const handleUseMax = () => {
    setAmount(formatEther(poolAccount?.balance ?? 0n));
  };

  const handleWithdraw = () => {
    setModalOpen(ModalType.GENERATE_ZK_PROOF);
  };

  const chainIcon = useMemo(() => {
    if (chainId === sepolia.id || chainId === mainnet.id) {
      return <CoinIcon />;
    }
    return (
      <ImageContainer>
        <Image src={image} alt={symbol} width={54} height={34} />
      </ImageContainer>
    );
  }, [chainId, image, symbol]);

  return (
    <ModalContainer>
      <ModalTitle variant='h2'>Make a withdraw</ModalTitle>

      <DecorativeCircle />

      <InputContainer>
        <Stack alignItems='center' width='100%'>
          <Stack direction='row' alignItems='center' width='100%' flexDirection='column'>
            <Stack direction='row' gap='0.8rem' alignItems='center' width='100%'>
              {chainIcon}

              <FormControl className='amount-input'>
                <AmountInput
                  id='amount'
                  variant='outlined'
                  placeholder='0'
                  value={amount}
                  error={amountHasError}
                  onChange={handleAmountChange}
                  data-testid='withdrawal-amount-input'
                />
                <MaxButton onClick={handleUseMax} disableElevation variant='text'>
                  Use Max
                </MaxButton>
              </FormControl>
            </Stack>
            {isWithdrawDisabled && <FormHelperText error>{errorMessage}</FormHelperText>}
          </Stack>
        </Stack>

        <Stack gap='0' alignItems='center'>
          <Typography variant='body2'>
            <b>{`${balanceFormatted} ${symbol}`}</b> in PA-{poolAccount?.name}
          </Typography>
          <Typography variant='caption' color='textDisabled'>
            ~ {balanceUSD} USD
          </Typography>
        </Stack>
      </InputContainer>

      <Stack gap={2} width='100%' maxWidth='32.8rem' zIndex='1'>
        {/* TargetAddress Input */}
        <FormControl fullWidth>
          <TextField
            id='target-address'
            placeholder='Target Address'
            value={target}
            error={targetAddressHasError}
            onChange={handleTargetAddressChange}
            onBlur={handleTargetAddressBlur}
            helperText={targetAddressHasError ? 'Invalid address' : ''}
            data-testid='target-address-input'
          />
        </FormControl>

        {/* PoolAccount Selector */}
        <FormControl fullWidth>
          <StyledSelect
            id='pool-account-select'
            labelId='pool-account-select-label'
            value={poolAccount?.name}
            onChange={handlePoolAccountChange}
            defaultValue={poolAccount?.name}
          >
            {filteredPoolAccounts.map((value) => {
              if (value.reviewStatus === ReviewStatus.APPROVED) {
                return (
                  <SMenuItem key={value.name} value={value.name}>
                    PA-{value.name}{' '}
                    <span className='eth-value'>
                      {formatUnits(value.balance, decimals)} {symbol}
                    </span>
                  </SMenuItem>
                );
              }
            })}
          </StyledSelect>
        </FormControl>

        {/* Relayer Selector */}
        <Stack gap='1.2rem' width='100%' alignItems='center'>
          <FormControl fullWidth>
            <Select
              id='relayer-select'
              labelId='relayer-select-label'
              value={selectedRelayer.url}
              defaultValue={selectedRelayer.url}
              onChange={handleRelayerChange}
              renderValue={(url) => relayersData.find((r) => r.url === url)?.name}
            >
              {relayersData
                .sort((a, b) => (Number(a.fees) ?? 0) - (Number(b.fees) ?? 0))
                .map(({ name, url, fees, isSelectable }) => (
                  <RelayMenuItem key={name} value={url} disabled={!isSelectable}>
                    <Stack direction='row' justifyContent='space-between' alignItems='center' width='100%'>
                      <Box>
                        <Typography variant='body2'>{name}</Typography>
                        {fees !== undefined && (
                          <Typography variant='caption' color='textSecondary'>
                            Fee: {Number(fees) / 100}%
                          </Typography>
                        )}
                      </Box>
                      {!isSelectable && (
                        <Typography variant='caption' color='error'>
                          Unavailable
                        </Typography>
                      )}
                    </Stack>
                  </RelayMenuItem>
                ))}
            </Select>
          </FormControl>

          <Typography variant='body2' color='textSecondary'>
            {feeText}
          </Typography>
        </Stack>
      </Stack>

      <Button
        disabled={isWithdrawDisabled}
        onClick={handleWithdraw}
        data-testid='confirm-withdrawal-button'
        sx={{ zIndex: 2 }}
      >
        Withdraw
      </Button>

      <LinksSection />
    </ModalContainer>
  );
};

const DecorativeCircle = styled(Box)(() => {
  return {
    width: '647px',
    height: '646px',
    position: 'absolute',
    borderRadius: '50%',
    backgroundColor: 'transparent',
    border: '1px solid #D9D9D9',
    zIndex: 0,
    top: '84%',
  };
});

const StyledSelect = styled(Select)({
  '.eth-value': {
    fontWeight: 700,
  },
});

const SMenuItem = styled(MenuItem)({
  '.eth-value': {
    fontWeight: 700,
    marginLeft: '0.8rem',
  },
});

const RelayMenuItem = styled(MenuItem)({
  '&.Mui-disabled': {
    opacity: 0.5,
    span: {
      fontWeight: 700,
    },
  },
});
