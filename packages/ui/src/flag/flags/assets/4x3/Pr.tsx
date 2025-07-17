import * as React from 'react';
import Svg, { Defs, ClipPath, Path, G } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgPr = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" {...props}>
    <Defs>
      <ClipPath id="pr_svg__a">
        <Path fillOpacity={0.7} d="M-37.3 0h682.7v512H-37.3z" />
      </ClipPath>
    </Defs>
    <G fillRule="evenodd" clipPath="url(#pr_svg__a)" transform="translate(35)scale(.9375)">
      <Path fill="#ed0000" d="M-37.3 0h768v512h-768z" />
      <Path fill="#fff" d="M-37.3 102.4h768v102.4h-768zm0 204.8h768v102.4h-768z" />
      <Path fill="#0050f0" d="m-37.3 0 440.7 255.7L-37.3 511z" />
      <Path
        fill="#fff"
        d="M156.4 325.5 109 290l-47.2 35.8 17.6-58.1-47.2-36 58.3-.4 18.1-58 18.5 57.8 58.3.1-46.9 36.3z"
      />
    </G>
  </Svg>
);
export default SvgPr;
