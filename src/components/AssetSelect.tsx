'use client';

import React, { useState } from 'react';
import { FormControl, MenuItem, Select, styled, SelectChangeEvent } from '@mui/material';
import { EtherIcon } from '~/assets/coins/ether';

export interface Option {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

// TODO: Replace with global state management
// This component will use global state to manage the selected asset across the application
// The global state should provide:
// 1. The currently selected asset
// 2. A function to change the selected asset
// 3. Available asset options

// Testing purposes - these will be moved to the global state later
const DEFAULT_TOKEN_OPTIONS = [
  { value: 'ETH', label: 'ETH', icon: <EtherIcon /> },
  { value: 'USDC', label: 'USDC' },
  { value: 'DAI', label: 'DAI' },
];

const DEFAULT_ASSET = 'ETH';

const MENU_STYLING = {
  MenuListProps: {
    sx: {
      '& .MuiMenuItem-root': {
        padding: '1.2rem 0rem',
      },
    },
  },
};

export interface AssetSelectProps {
  value?: string;
  options?: Option[];
}

export const AssetSelect: React.FC<AssetSelectProps> = ({ value = DEFAULT_ASSET, options = DEFAULT_TOKEN_OPTIONS }) => {
  // Local state - will be replaced with global state
  const [selectedAsset, setSelectedAsset] = useState(value);

  // This will be replaced with a hook to access global state
  // const { selectedAsset, setSelectedAsset, availableAssets } = useAssetContext();

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    setSelectedAsset(event.target.value as string);
    // When global state is implemented, this will update the global state
    // setSelectedAsset(event.target.value as string);
  };

  return (
    <FormControl fullWidth>
      <StyledSelect value={selectedAsset} onChange={handleChange} variant='outlined' MenuProps={MENU_STYLING}>
        {options?.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            <MenuItemContent>
              {option.icon && <IconWrapper>{option.icon}</IconWrapper>}
              <span>{option.label}</span>
            </MenuItemContent>
          </MenuItem>
        ))}
      </StyledSelect>
    </FormControl>
  );
};

const StyledSelect = styled(Select)(() => {
  return {
    // FYI: This is the expected height of the Select component extracted from FIGMA, we can change if it is not appropriate
    height: '3.8rem',
    fontWeight: 500,
  };
});

const MenuItemContent = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
  width: '100%',
}));

const IconWrapper = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '1.4rem',
  height: '1.4rem',
  '& > svg': {
    width: '100%',
    height: '100%',
  },
}));
