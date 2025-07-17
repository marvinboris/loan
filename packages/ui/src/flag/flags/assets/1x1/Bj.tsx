import * as React from 'react';
import Svg, { Defs, ClipPath, Path, G } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgBj = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <Defs>
      <ClipPath id="bj_svg__a">
        <Path fill="gray" d="M67.6-154h666v666h-666z" />
      </ClipPath>
    </Defs>
    <G clipPath="url(#bj_svg__a)" transform="translate(-52 118.4)scale(.7688)">
      <G fillRule="evenodd" strokeWidth="1pt">
        <Path fill="#319400" d="M0-154h333v666H0z" />
        <Path fill="#ffd600" d="M333-154h666v333H333z" />
        <Path fill="#de2110" d="M333 179h666v333H333z" />
      </G>
    </G>
  </Svg>
);
export default SvgBj;
