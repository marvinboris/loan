import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgGa = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <G fillRule="evenodd">
      <Path fill="#ffe700" d="M512 512H0V0h512z" />
      <Path fill="#36a100" d="M512 170.7H0V0h512z" />
      <Path fill="#006dbc" d="M512 512H0V341.3h512z" />
    </G>
  </Svg>
);
export default SvgGa;
