import { getEnv } from '~/config/env';

const { SHOW_DISCLAIMER } = getEnv();

/*=============================================
=               Style Variables               =
=============================================*/

export const BREAKPOINTS = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
};

export const zIndex = {
  HEADER: 200,
  ASIDE: 100,
  MODAL: 300,
  BACKDROP: -1,
  TOAST: 500,
};

export const HEADER_HEIGHT = 6; // Header height in rem units

export const DYNAMIC_HEADER_HEIGHT = SHOW_DISCLAIMER ? 10 : 6; // Header height in rem units (with disclaimer)

export const FOOTER_HEIGHT = 4.8; // Footer height in rem units
