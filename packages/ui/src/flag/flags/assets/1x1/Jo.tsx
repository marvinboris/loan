import * as React from 'react';
import Svg, { Defs, ClipPath, Path, G } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgJo = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <Defs>
      <ClipPath id="jo_svg__a">
        <Path fillOpacity={0.7} d="M113.6 0H607v493.5H113.6z" />
      </ClipPath>
    </Defs>
    <G clipPath="url(#jo_svg__a)" transform="translate(-117.8)scale(1.0375)">
      <G fillRule="evenodd" strokeWidth="1pt">
        <Path fill="#000001" d="M0 0h987v164.5H0z" />
        <Path fill="#fff" d="M0 164.5h987V329H0z" />
        <Path fill="#090" d="M0 329h987v164.5H0z" />
        <Path fill="red" d="m0 493.5 493.5-246.8L0 0z" />
        <Path
          fill="#fff"
          d="m164.8 244 22 10.6h-24.5l5.5 24-15.3-19.3-15.3 19.2 5.5-23.9H118l22.1-10.7-15.3-19.1 22.1 10.6 5.5-23.9 5.5 24 22-10.7z"
        />
      </G>
    </G>
  </Svg>
);
export default SvgJo;
