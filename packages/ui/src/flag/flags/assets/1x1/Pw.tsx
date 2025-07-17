import * as React from 'react';
import Svg, { Defs, ClipPath, Path, G } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgPw = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <Defs>
      <ClipPath id="pw_svg__a">
        <Path fillOpacity={0.7} d="M61.7 4.2h170.8V175H61.7z" />
      </ClipPath>
    </Defs>
    <G
      fillRule="evenodd"
      strokeWidth="1pt"
      clipPath="url(#pw_svg__a)"
      transform="translate(-185 -12.5)scale(2.9973)"
    >
      <Path fill="#4aadd6" d="M0 4.2h301.2V175H0z" />
      <Path
        fill="#ffde00"
        d="M185.9 86.8a52 52 0 0 1-53 50.8 52 52 0 0 1-53.2-50.8c0-28 23.8-50.8 53.1-50.8s53 22.7 53 50.8z"
      />
    </G>
  </Svg>
);
export default SvgPw;
