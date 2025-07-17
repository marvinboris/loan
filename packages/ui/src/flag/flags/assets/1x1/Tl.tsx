import * as React from 'react';
import Svg, { Defs, ClipPath, Path, G } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgTl = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <Defs>
      <ClipPath id="tl_svg__a">
        <Path fillOpacity={0.7} d="M0 0h496v496H0z" />
      </ClipPath>
    </Defs>
    <G fillRule="evenodd" clipPath="url(#tl_svg__a)" transform="scale(1.0321)">
      <Path fill="#cb000f" d="M0 0h999v496H0z" />
      <Path fill="#f8c00c" d="M0 0c3.1 0 496 248.7 496 248.7L0 496.1z" />
      <Path fill="#000001" d="M0 0c2 0 330 248.7 330 248.7L0 496.1z" />
      <Path
        fill="#fff"
        d="m181.9 288.9-59-13L93 327l-5-57.8-58.8-13 53.1-24-3.2-57.5 39 42 53.6-24.4-28 52.2 38 44.4z"
      />
    </G>
  </Svg>
);
export default SvgTl;
