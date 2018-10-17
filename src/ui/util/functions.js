//@flow
import { getLuminance, rgba } from 'polished';

export function findColorInvert($color) {
  if (getLuminance($color) > 0.55) return rgba('#000', 0.7);
  return '#fff';
}

export function isColor(color) {
  return (
    typeof color === 'string' &&
    /(^[a-zA-Z]+$)|(#(?:[0-9a-f]{2}){2,4}|#[0-9a-f]{3}|(?:rgba?|hsla?)\((?:\d+%?(?:deg|rad|grad|turn)?(?:,|\s)+){2,3}[\s/]*[\d.]+%?\))/i.test(
      color
    )
  ); // eslint-disable-line no-useless-escape
}

export const themeSelector = (selector) => (props) => selector(props.theme);

export const th = (key) => (props) => props.theme[key];
