import * as React from 'react';
import Svg, { Defs, ClipPath, Path, G } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgDj = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <Defs>
      <ClipPath id="dj_svg__a">
        <Path fillOpacity={0.7} d="M55.4 0H764v708.7H55.4z" />
      </ClipPath>
    </Defs>
    <G fillRule="evenodd" clipPath="url(#dj_svg__a)" transform="translate(-40)scale(.722)">
      <Path fill="#0c0" d="M0 0h1063v708.7H0z" />
      <Path fill="#69f" d="M0 0h1063v354.3H0z" />
      <Path fill="#fffefe" d="m0 0 529.7 353.9L0 707.3z" />
      <Path
        fill="red"
        d="m221.2 404.3-42.7-30.8-42.4 31 15.8-50.3-42.4-31.2 52.4-.4 16.3-50.2 16.6 50 52.4.2-42.1 31.4z"
      />
    </G>
  </Svg>
);
export default SvgDj;
