import * as React from 'react';
import Svg, { Defs, ClipPath, Path, G } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgSo = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" {...props}>
    <Defs>
      <ClipPath id="so_svg__a">
        <Path fillOpacity={0.7} d="M-85.3 0h682.6v512H-85.3z" />
      </ClipPath>
    </Defs>
    <G fillRule="evenodd" clipPath="url(#so_svg__a)" transform="translate(80)scale(.9375)">
      <Path fill="#40a6ff" d="M-128 0h768v512h-768z" />
      <Path
        fill="#fff"
        d="M336.5 381.2 254 327.7l-82.1 54 30.5-87.7-82-54.2L222 239l31.4-87.5 32.1 87.3 101.4.1-81.5 54.7z"
      />
    </G>
  </Svg>
);
export default SvgSo;
