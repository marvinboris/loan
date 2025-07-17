import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgSc = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" {...props}>
    <Path fill="#fff" d="M0 0h640v480H0Z" />
    <Path fill="#d92223" d="M0 480V0h640v160z" />
    <Path fill="#fcd955" d="M0 480V0h426.7z" />
    <Path fill="#003d88" d="M0 480V0h213.3z" />
    <Path fill="#007a39" d="m0 480 640-160v160z" />
  </Svg>
);
export default SvgSc;
