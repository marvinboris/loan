import * as React from 'react';
import Svg, { Defs, ClipPath, Path, G } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgPw = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" {...props}>
    <Defs>
      <ClipPath id="pw_svg__a">
        <Path fillOpacity={0.7} d="M-70.3 0h640v480h-640z" />
      </ClipPath>
    </Defs>
    <G fillRule="evenodd" strokeWidth="1pt" clipPath="url(#pw_svg__a)" transform="translate(70.3)">
      <Path fill="#4aadd6" d="M-173.4 0h846.3v480h-846.3z" />
      <Path fill="#ffde00" d="M335.6 232.1a135.9 130.1 0 1 1-271.7 0 135.9 130.1 0 1 1 271.7 0" />
    </G>
  </Svg>
);
export default SvgPw;
