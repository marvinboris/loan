import * as React from 'react';
import Svg, { Defs, ClipPath, Path, G } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgNr = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" {...props}>
    <Defs>
      <ClipPath id="nr_svg__a">
        <Path fillOpacity={0.7} d="M-54.7 0H628v512H-54.7z" />
      </ClipPath>
    </Defs>
    <G
      fillRule="evenodd"
      strokeWidth="1pt"
      clipPath="url(#nr_svg__a)"
      transform="translate(51.3)scale(.9375)"
    >
      <Path fill="#002170" d="M-140 0H884v512H-140z" />
      <Path fill="#ffb20d" d="M-140 234.1H884V278H-140z" />
      <Path
        fill="#fff"
        d="m161.8 438-33-33-10.5 45.4-12-45-31.9 34 12.1-45L42 407.9l33-33-45.4-10.6 45-12-34-31.8 45 12L72 288l33 33 10.6-45.4 12 45 31.8-34-12 45 44.5-13.5-33 33 45.4 10.5-45 12 34 32-45-12.2z"
      />
    </G>
  </Svg>
);
export default SvgNr;
