import * as React from 'react';
import Svg, { Defs, ClipPath, Path, G } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgCf = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <Defs>
      <ClipPath id="cf_svg__a">
        <Path fillOpacity={0.7} d="M0 0h512v512H0z" />
      </ClipPath>
    </Defs>
    <G fillRule="evenodd" clipPath="url(#cf_svg__a)">
      <Path fill="#00f" d="M-52-.5h768v127H-52z" />
      <Path fill="#ff0" d="M-52 383.5h768V512H-52z" />
      <Path fill="#009a00" d="M-52 255h768v128.5H-52z" />
      <Path fill="#fff" d="M-52 126.5h768V255H-52z" />
      <Path fill="red" d="M268 0h128v512H268z" />
      <Path
        fill="#ff0"
        d="M109.5 112.3 75.9 89.1l-33.4 23.4 11.6-39.2-32.5-24.6 40.7-1L75.7 8.8l13.5 38.6 40.8.8L97.6 73"
      />
    </G>
  </Svg>
);
export default SvgCf;
