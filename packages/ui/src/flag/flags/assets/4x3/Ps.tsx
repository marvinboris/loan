import * as React from 'react';
import Svg, { Defs, ClipPath, Path, G } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgPs = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" {...props}>
    <Defs>
      <ClipPath id="ps_svg__a">
        <Path fillOpacity={0.7} d="M-118 0h682.7v512H-118z" />
      </ClipPath>
    </Defs>
    <G clipPath="url(#ps_svg__a)" transform="translate(110.6)scale(.9375)">
      <G fillRule="evenodd" strokeWidth="1pt">
        <Path fill="#000001" d="M-246 0H778v170.7H-246z" />
        <Path fill="#fff" d="M-246 170.7H778v170.6H-246z" />
        <Path fill="#090" d="M-246 341.3H778V512H-246z" />
        <Path fill="red" d="m-246 512 512-256L-246 0z" />
      </G>
    </G>
  </Svg>
);
export default SvgPs;
