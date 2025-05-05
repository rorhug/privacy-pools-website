'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import { styled } from '@mui/material';
import { getConfig } from '~/config';

export const Footer = () => {
  const { FOOTER_LINKS } = getConfig().constants;

  return (
    <FooterContainer>
      <Links>
        {FOOTER_LINKS.map((item, i) => (
          <Fragment key={item.label}>
            <LinkItem>
              <Link href={item.href} target='_blank'>
                {item.label}
              </Link>
            </LinkItem>
            {i < FOOTER_LINKS.length - 1 && <VBar>|</VBar>}
          </Fragment>
        ))}
      </Links>
    </FooterContainer>
  );
};

const FooterContainer = styled('footer')(({ theme }) => {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: theme.spacing(6),
    marginTop: 'auto',
    padding: '0',
    zIndex: 10,
  };
});

const Links = styled('ul')`
  display: flex;
  gap: 1.2rem;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const LinkItem = styled('li')(({ theme }) => {
  return {
    padding: '0',
    cursor: 'pointer',
    '& a': {
      color: theme.palette.text.primary,
      textDecoration: 'none',
      fontSize: theme.typography.caption.fontSize,
      '&:hover': {
        fontWeight: 700,
      },
    },
  };
});

const VBar = styled('span')(({ theme }) => {
  return {
    color: theme.palette.text.disabled,
  };
});
