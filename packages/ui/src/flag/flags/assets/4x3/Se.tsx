import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgSe = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" {...props}>
    <Path fill="#005293" d="M0 0h640v480H0z" />
    <Path fill="#fecb00" d="M176 0v192H0v96h176v192h96V288h368v-96H272V0z" />
  </Svg>
);
export default SvgSe;
