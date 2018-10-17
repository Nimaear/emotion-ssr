//@flow
import styled from '@emotion/styled';
import {
  space,
  color,
  width,
  fontSize,
  fontWeight,
  textAlign,
  lineHeight,
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

const CardContent = styled.div`
  padding: 8px 16px;
  ${space};
  ${width};
  ${color};
  ${fontSize};
  ${fontWeight};
  ${textAlign};
  ${lineHeight};
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

export default CardContent;
