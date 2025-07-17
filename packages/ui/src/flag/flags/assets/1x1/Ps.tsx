import * as React from 'react';
import Svg, { Defs, ClipPath, Path, G } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgPs = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <Defs>
      <ClipPath id="ps_svg__a">
        <Path fillOpacity={0.7} d="M237.1 0h493.5v493.5H237.1z" />
      </ClipPath>
    </Defs>
    <G clipPath="url(#ps_svg__a)" transform="translate(-246)scale(1.0375)">
      <G fillRule="evenodd" strokeWidth="1pt">
        <Path fill="#000001" d="M0 0h987v164.5H0z" />
        <Path fill="#fff" d="M0 164.5h987V329H0z" />
        <Path fill="#090" d="M0 329h987v164.5H0z" />
        <Path fill="red" d="m0 493.5 493.5-246.8L0 0z" />
      </G>
    </G>
  </Svg>
);
export default SvgPs;
