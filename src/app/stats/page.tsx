'use client';

import { styled, Box, Typography } from '@mui/material';
import { AdvancedViewContainer } from '~/components';

const StatsContainer = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
  padding: theme.spacing(0, 2),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),
}));

const ChartRow = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(3),
  width: '100%',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
}));

const ChartContainer = styled('div')(() => ({
  flex: 1,
  minHeight: '400px',
  width: '100%',
  '& iframe': {
    width: '100%',
    height: '400px',
    border: 'none',
    borderRadius: '8px',
  },
}));

const SingleChartContainer = styled('div')(() => ({
  width: '100%',
  minHeight: '400px',
  '& iframe': {
    width: '100%',
    height: '400px',
    border: 'none',
    borderRadius: '8px',
  },
}));

const StatsPage = () => {
  return (
    <AdvancedViewContainer>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant='h3' component='h1' gutterBottom>
          Privacy Pools Statistics
        </Typography>
        <Typography variant='h6' color='text.secondary'>
          Real-time analytics and insights from Dune Analytics
        </Typography>
      </Box>

      <StatsContainer>
        {/* First row - Single chart */}
        <SingleChartContainer>
          <iframe src='https://dune.com/embeds/4936163/8182373' title='Privacy Pools Overview' />
        </SingleChartContainer>

        {/* Second row - Two charts side by side */}
        <ChartRow>
          <ChartContainer>
            <iframe src='https://dune.com/embeds/5037734/8324351' title='Privacy Pools Chart 1' />
          </ChartContainer>
          <ChartContainer>
            <iframe src='https://dune.com/embeds/5037734/8324353' title='Privacy Pools Chart 2' />
          </ChartContainer>
        </ChartRow>

        {/* Third row - Single chart */}
        <SingleChartContainer>
          <iframe src='https://dune.com/embeds/5037734/8324356' title='Privacy Pools Analytics' />
        </SingleChartContainer>
      </StatsContainer>
    </AdvancedViewContainer>
  );
};

export default StatsPage;
