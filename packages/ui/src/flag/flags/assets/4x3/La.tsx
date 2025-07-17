import * as React from 'react';
import Svg, { Defs, ClipPath, Path, G } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgLa = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" {...props}>
    <Defs>
      <ClipPath id="la_svg__a">
        <Path fillOpacity={0.7} d="M0 0h640v480H0z" />
      </ClipPath>
    </Defs>
    <G fillRule="evenodd" clipPath="url(#la_svg__a)">
      <Path fill="#ce1126" d="M-40 0h720v480H-40z" />
      <Path fill="#002868" d="M-40 119.3h720v241.4H-40z" />
      <Path fill="#fff" d="M423.4 240a103.4 103.4 0 1 1-206.8 0 103.4 103.4 0 1 1 206.8 0" />
    </G>
  </Svg>
);
export default SvgLa;
