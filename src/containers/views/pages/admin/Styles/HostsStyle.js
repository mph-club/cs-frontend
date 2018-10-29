import styled from 'styled-components'

const Title = styled.h1`
  font-size: 1.5em;
  text-align: left;
  color: black;
`;

const styles = theme => ({
  ArrowRightAlt: {
    'cursor': 'pointer'
  },
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    borderBottom: `1px solid ${theme.palette.text.lightDivider}`,
    borderLeft: `1px solid ${theme.palette.text.lightDivider}`,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  avatar: {
    borderRadius: 0,
    width: 150,
    height: 100,
  },

})


export const NTitle = Title;

export const Nstyles = styles;


