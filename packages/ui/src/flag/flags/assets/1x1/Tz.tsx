import * as React from 'react';
import Svg, { Defs, ClipPath, Path, G } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgTz = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <Defs>
      <ClipPath id="tz_svg__a">
        <Path fillOpacity={0.7} d="M102.9 0h496v496H103z" />
      </ClipPath>
    </Defs>
    <G clipPath="url(#tz_svg__a)" transform="translate(-106.2)scale(1.0321)">
      <G fillRule="evenodd" strokeWidth="1pt">
        <Path fill="#09f" d="M0 0h744.1v496H0z" />
        <Path fill="#090" d="M0 0h744.1L0 496z" />
        <Path fill="#000001" d="M0 496h165.4L744 103.4V0H578.7L0 392.7v103.4z" />
        <Path fill="#ff0" d="M0 378 567 0h56L0 415.3v-37.2zm121.1 118 623-415.3V118L177 496z" />
      </G>
    </G>
  </Svg>
);
export default SvgTz;
