//@flow
import { defaultProps, componentFromProp } from 'recompose';

export default (tagName: string = 'div') => {
  const enhance = defaultProps({ as: tagName });
  return enhance(componentFromProp('as'));
};
