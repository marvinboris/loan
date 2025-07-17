import * as React from 'react';
import Svg, { Defs, ClipPath, Path, G } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgAx = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <Defs>
      <ClipPath id="ax_svg__a">
        <Path fillOpacity={0.7} d="M166 0h850v850H166z" />
      </ClipPath>
    </Defs>
    <G clipPath="url(#ax_svg__a)" transform="translate(-100)scale(.6024)">
      <Path fill="#0053a5" d="M0 0h1300v850H0z" />
      <G fill="#ffce00">
        <Path d="M400 0h250v850H400z" />
        <Path d="M0 300h1300v250H0z" />
      </G>
      <G fill="#d21034">
        <Path d="M475 0h100v850H475z" />
        <Path d="M0 375h1300v100H0z" />
      </G>
    </G>
  </Svg>
);
export default SvgAx;
