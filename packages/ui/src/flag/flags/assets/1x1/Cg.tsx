import * as React from 'react';
import Svg, { Defs, ClipPath, Path, G } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgCg = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <Defs>
      <ClipPath id="cg_svg__a">
        <Path fillOpacity={0.7} d="M115.7 0h496.1v496h-496z" />
      </ClipPath>
    </Defs>
    <G
      fillRule="evenodd"
      strokeWidth="1pt"
      clipPath="url(#cg_svg__a)"
      transform="translate(-119.5)scale(1.032)"
    >
      <Path fill="#ff0" d="M0 0h744v496H0z" />
      <Path fill="#00ca00" d="M0 0v496L496 0z" />
      <Path fill="red" d="M248 496h496V0z" />
    </G>
  </Svg>
);
export default SvgCg;
