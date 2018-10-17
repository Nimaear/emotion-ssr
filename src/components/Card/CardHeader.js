//@flow
import styled from '@emotion/styled';
import {
  space,
  display,
  borderRadius,
  borderColor,
  borders,
  alignItems,
  alignContent,
  justifyContent,
  flexWrap,
  flexBasis,
  flexDirection,
  flex,
  justifySelf,
  alignSelf,
} from 'styled-system';

const CardHeader = styled('h2')`
  padding: ${(props) => props.theme.padding}px;
  ${space};
  ${display};
  ${borderRadius};
  ${borderColor};
  ${borders};
  ${alignItems};
  ${alignContent};
  ${justifyContent};
  ${flexWrap};
  ${flexBasis};
  ${flexDirection};
  ${flex};
  ${justifySelf};
  ${alignSelf};
`;

export default CardHeader;
