import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgTd = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" {...props}>
    <G fillRule="evenodd">
      <Path fill="#002664" d="M0 0h214v480H0z" />
      <Path fill="#c60c30" d="M426 0h214v480H426z" />
      <Path fill="#fecb00" d="M214 0h212v480H214z" />
    </G>
  </Svg>
);
export default SvgTd;
