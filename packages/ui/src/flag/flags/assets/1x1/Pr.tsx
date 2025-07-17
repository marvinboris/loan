import * as React from 'react';
import Svg, { Defs, ClipPath, Path, G } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgPr = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <Defs>
      <ClipPath id="pr_svg__a">
        <Path fillOpacity={0.7} d="M51.6 0h708.7v708.7H51.6z" />
      </ClipPath>
    </Defs>
    <G fillRule="evenodd" clipPath="url(#pr_svg__a)" transform="translate(-37.3)scale(.72249)">
      <Path fill="#ed0000" d="M0 0h1063v708.7H0z" />
      <Path fill="#fff" d="M0 141.7h1063v141.8H0zm0 283.5h1063v141.7H0z" />
      <Path fill="#0050f0" d="m0 0 610 353.9L0 707.3z" />
      <Path
        fill="#fff"
        d="m268.2 450.5-65.7-49-65.3 49.5 24.3-80.5-65.3-49.7 80.7-.7 25-80.2 25.6 80 80.7.1-64.9 50.2z"
      />
    </G>
  </Svg>
);
export default SvgPr;
