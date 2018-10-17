//@flow
import styled from '@emotion/styled';
import { createComponent } from 'util';
import CardContent from './CardContent';
import CardImage from './CardImage';
import CardHeader from './CardHeader';

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

const Card = createComponent(styled('div')`
  transition: 0.3;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  min-height: 64px;
  min-width: 256px;
  display: block;
  transition: all 0.3s ease-in;
  ${({ theme }) => `color: ${theme.yikTextDark}`};
  &:hover {
    ${({ theme }) => `color: ${theme.yikTextDark}`};
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
  border-radius: 4px;
  margin: 8px;
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
`);

Card.Content = CardContent;
Card.Header = CardHeader;
Card.Image = CardImage;

export default Card;
