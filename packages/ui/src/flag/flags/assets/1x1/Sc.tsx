import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgSc = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <Path fill="#fff" d="M0 0h512v512H0Z" />
    <Path fill="#d92223" d="M0 512V0h512v170.7z" />
    <Path fill="#fcd955" d="M0 512V0h341.3z" />
    <Path fill="#003d88" d="M0 512V0h170.7z" />
    <Path fill="#007a39" d="m0 512 512-170.7V512Z" />
  </Svg>
);
export default SvgSc;
