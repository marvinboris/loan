import * as React from 'react';
import Svg, { Defs, ClipPath, Rect, G, Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgSl = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <Defs>
      <ClipPath id="sl_svg__a">
        <Rect width={384} height={512} rx={4.6} ry={7.6} />
      </ClipPath>
    </Defs>
    <G fillRule="evenodd" clipPath="url(#sl_svg__a)" transform="scale(1.33333 1)">
      <Path fill="#0000cd" d="M0 341.7h512V512H0z" />
      <Path fill="#fff" d="M0 171.4h512v170.3H0z" />
      <Path fill="#00cd00" d="M0 0h512v171.4H0z" />
    </G>
  </Svg>
);
export default SvgSl;
