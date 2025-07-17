import * as React from 'react';
import Svg, { Defs, ClipPath, Path, G, Circle } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgJp = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <Defs>
      <ClipPath id="jp_svg__a">
        <Path fillOpacity={0.7} d="M177.2 0h708.6v708.7H177.2z" />
      </ClipPath>
    </Defs>
    <G
      fillRule="evenodd"
      strokeWidth="1pt"
      clipPath="url(#jp_svg__a)"
      transform="translate(-128)scale(.72249)"
    >
      <Path fill="#fff" d="M0 0h1063v708.7H0z" />
      <Circle
        cx={523.1}
        cy={344.1}
        r={194.9}
        fill="#bc002d"
        transform="translate(-59.7 -34.5)scale(1.1302)"
      />
    </G>
  </Svg>
);
export default SvgJp;
