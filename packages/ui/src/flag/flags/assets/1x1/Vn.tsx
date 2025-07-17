import * as React from 'react';
import Svg, { Defs, ClipPath, Path, G } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgVn = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <Defs>
      <ClipPath id="vn_svg__a">
        <Path fillOpacity={0.7} d="M177.2 0h708.6v708.7H177.2z" />
      </ClipPath>
    </Defs>
    <G fillRule="evenodd" clipPath="url(#vn_svg__a)" transform="translate(-128)scale(.72249)">
      <Path fill="#da251d" d="M0 0h1063v708.7H0z" />
      <Path
        fill="#ff0"
        d="m661 527.5-124-92.6-123.3 93.5 45.9-152-123.2-93.8 152.4-1.3L536 129.8 584.3 281l152.4.2-122.5 94.7z"
      />
    </G>
  </Svg>
);
export default SvgVn;
