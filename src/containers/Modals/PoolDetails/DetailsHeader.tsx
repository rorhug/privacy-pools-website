import { styled, Stack, Typography } from '@mui/material';
import { ExtendedTooltip as Tooltip, StatusChip } from '~/components';
import { getConstants } from '~/config/constants';
import { usePoolAccountsContext } from '~/hooks';
import { ReviewStatus } from '~/types';
import { ModalTitle } from '../Deposit/DepositForm';

type StatusObject = {
  decisionStatus?: ReviewStatus;
  reviewStatus?: ReviewStatus;
  status?: ReviewStatus;
  [key: string]: string | boolean | ReviewStatus | undefined;
};

export const DetailsHeader = () => {
  const { PENDING_STATUS_MESSAGE } = getConstants();
  const { poolAccount } = usePoolAccountsContext();

  // Handle case where reviewStatus is an object
  const getStatus = () => {
    let reviewStatus = poolAccount?.reviewStatus;
    if (typeof reviewStatus === 'object' && reviewStatus !== null) {
      const statusObj = reviewStatus as StatusObject;
      reviewStatus = statusObj.decisionStatus || statusObj.reviewStatus || statusObj.status || ReviewStatus.PENDING;
    }
    return reviewStatus || ReviewStatus.PENDING;
  };

  const status = getStatus();
  const tooltipTitle = status === ReviewStatus.PENDING ? PENDING_STATUS_MESSAGE : '';

  return (
    <Container>
      <Stack direction='row' alignItems='center' gap='2.2rem'>
        <ModalTitle variant='h2'>{`PA-${poolAccount?.name}`}</ModalTitle>
        <Tooltip title={tooltipTitle} placement='top' disableInteractive>
          <StatusChip status={status} />
        </Tooltip>
      </Stack>

      {/* Temporarily disabled */}
      {/* <Stack direction='column' alignItems='start' gap='0.8rem' minWidth='30rem'>
        <Row>
          <Label variant='body2'>From:</Label>
          <Tooltip title={from} placement='top'>
            <Value variant='body2'>{truncateAddress(from)}</Value>
          </Tooltip>
        </Row>
      </Stack> */}
    </Container>
  );
};

const Container = styled(Stack)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'start',
  justifyContent: 'space-between',

  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}));

// const Row = styled(Stack)(() => ({
//   gap: '0.6rem',
//   display: 'flex',
//   flexDirection: 'row',
//   flexWrap: 'wrap',
// }));

export const Label = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[500],
  fontSize: '1.6rem',
  fontStyle: 'normal',
  fontWeight: 700,
  lineHeight: '150%',
}));

// const Value = styled(Label)(() => ({
//   fontWeight: 400,
// }));
