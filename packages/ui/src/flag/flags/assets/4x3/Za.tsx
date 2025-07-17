import * as React from 'react';
import Svg, { Defs, ClipPath, Path, G } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgZa = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" {...props}>
    <Defs>
      <ClipPath id="za_svg__a">
        <Path fillOpacity={0.7} d="M-71.9 0h682.7v512H-71.9z" />
      </ClipPath>
    </Defs>
    <G clipPath="url(#za_svg__a)" transform="translate(67.4)scale(.93748)">
      <G fillRule="evenodd" strokeWidth="1pt">
        <Path fill="#000001" d="M-71.9 407.8V104.4L154 256.1z" />
        <Path fill="#000c8a" d="m82.2 512.1 253.6-170.6H696V512H82.2z" />
        <Path fill="#e1392d" d="M66 0h630v170.8H335.7S69.3-1.7 66 0" />
        <Path fill="#ffb915" d="M-71.9 64v40.4L154 256-72 407.8v40.3l284.5-192z" />
        <Path
          fill="#007847"
          d="M-71.9 64V0h95l301.2 204h371.8v104.2H324.3L23 512h-94.9v-63.9l284.4-192L-71.8 64z"
        />
        <Path
          fill="#fff"
          d="M23 0h59.2l253.6 170.7H696V204H324.3zm0 512.1h59.2l253.6-170.6H696v-33.2H324.3L23 512z"
        />
      </G>
    </G>
  </Svg>
);
export default SvgZa;
