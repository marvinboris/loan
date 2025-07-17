import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgSe = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <Path fill="#005293" d="M0 0h512v512H0z" />
    <Path fill="#fecb00" d="M134 0v204.8H0v102.4h134V512h102.4V307.2H512V204.8H236.4V0z" />
  </Svg>
);
export default SvgSe;
