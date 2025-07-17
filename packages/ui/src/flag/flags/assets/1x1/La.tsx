import * as React from 'react';
import Svg, { Defs, ClipPath, Path, G } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgLa = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <Defs>
      <ClipPath id="la_svg__a">
        <Path fillOpacity={0.7} d="M177.2 0h708.6v708.7H177.2z" />
      </ClipPath>
    </Defs>
    <G fillRule="evenodd" clipPath="url(#la_svg__a)" transform="translate(-128)scale(.72249)">
      <Path fill="#ce1126" d="M0 0h1063v708.7H0z" />
      <Path fill="#002868" d="M0 176h1063v356.6H0z" />
      <Path fill="#fff" d="M684.2 354.3a152.7 152.7 0 1 1-305.4 0 152.7 152.7 0 0 1 305.4 0" />
    </G>
  </Svg>
);
export default SvgLa;
