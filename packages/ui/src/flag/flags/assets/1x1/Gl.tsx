import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgGl = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <Path fill="#fff" d="M0 0h512v512H0z" />
    <Path
      fill="#d00c33"
      d="M0 256h512v256H0zm53.3 0a170.7 170.7 0 1 0 341.4 0 170.7 170.7 0 0 0-341.4 0"
    />
  </Svg>
);
export default SvgGl;
