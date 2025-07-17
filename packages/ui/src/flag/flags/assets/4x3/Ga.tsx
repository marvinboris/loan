import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgGa = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" {...props}>
    <G fillRule="evenodd">
      <Path fill="#ffe700" d="M640 480H0V0h640z" />
      <Path fill="#36a100" d="M640 160H0V0h640z" />
      <Path fill="#006dbc" d="M640 480H0V320h640z" />
    </G>
  </Svg>
);
export default SvgGa;
