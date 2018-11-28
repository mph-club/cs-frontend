
import styled from 'styled-components'

const Title = styled.h1`
font-size: 1.5em;
text-align: left;
color: black;
`;

const Title1 = styled.h2`
font-size: 1.2em;
text-align: left;
color: black;
margin-bottom:10px;
`;
const Title2 = styled.h4`
font-size: 0.9em;
text-align: left;
color: black;
margin-bottom:0px;
`;
const Carouselbutton = styled.button`
color: rgba(0, 0, 0, 0.87);
box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 3px 1px -2px rgba(0, 0, 0, 0.12);
background-color: #fff;
padding: 8px 16px;
font-size: 0.875rem;
box-sizing: border-box;
transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
border-radius: 4px;
cursor: pointer;
display: inline-flex;
outline: none;
border: 0;
&:disabled {
  opacity:0.7;
  cursor: not-allowed;
}
`;

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    borderBottom: `1px solid ${theme.palette.text.lightDivider}`,
    borderLeft: `1px solid ${theme.palette.text.lightDivider}`,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  table: {
    minWidth: 700,
  },
  divider: {
    marginTop: 20,
    marginBottom: 20,
    height: 3,
  },
  fontXlarge: {
    fontSize: '3em'
  },
  subheading: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  button: {
    fontSize: '1em',
    fontWeight: '700',
    padding: '15px 25px',
    marginTop: 15,
  },
  carouselimg: {
    display: 'block',
    overflow: 'hidden',
    width: '100%',
    height: '500px',
  },
  featurelist: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  reviewsavatar: {
    width: 60,
    height: 60,
  },
  ownedavatar: {
    width: 100,
    height: 100,
    maxWidth: '100%',
  },
  reviewlink: {
    fontWeight: 700,
    display: 'inline-block',
    marginRight: 15,
  },
  guideline: {
    padding: '5px 0',
  },
  positionRelative: {
    position: 'relative',
  },
  mobileStepper: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '50%',
    backgroundColor: 'transparent',
    marginTop: -27,
  },
});

export const NTitle = Title;
export const NTitle1 = Title1;
export const NTitle2 = Title2;
export const NCarouselbutton = Carouselbutton;
export const Nstyles = styles;