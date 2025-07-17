import * as React from 'react';
import Svg, { Defs, ClipPath, Path, G } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgCl = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <Defs>
      <ClipPath id="cl_svg__a">
        <Path fillOpacity={0.7} d="M0 0h708.7v708.7H0z" />
      </ClipPath>
    </Defs>
    <G fillRule="evenodd" clipPath="url(#cl_svg__a)" transform="scale(.722)">
      <Path fill="#fff" d="M354.3 0H1063v354.3H354.3z" />
      <Path fill="#0039a6" d="M0 0h354.3v354.3H0z" />
      <Path
        fill="#fff"
        d="m232.3 265.3-55-41.1-54.5 41.5 20.3-67.5-54.5-41.7 67.4-.6 21-67.3 21.3 67.2h67.5L211.4 198z"
      />
      <Path fill="#d52b1e" d="M0 354.3h1063v354.4H0z" />
    </G>
  </Svg>
);
export default SvgCl;
