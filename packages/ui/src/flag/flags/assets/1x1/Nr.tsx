import * as React from 'react';
import Svg, { Defs, ClipPath, Path, G } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgNr = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <Defs>
      <ClipPath id="nr_svg__a">
        <Path fillOpacity={0.7} d="M135.6 0h496.1v496h-496z" />
      </ClipPath>
    </Defs>
    <G
      fillRule="evenodd"
      strokeWidth="1pt"
      clipPath="url(#nr_svg__a)"
      transform="translate(-140)scale(1.0321)"
    >
      <Path fill="#002170" d="M0 0h992.1v496H0z" />
      <Path fill="#ffb20d" d="M0 226.8h992.1v42.4H0z" />
      <Path
        fill="#fff"
        d="m292.4 424.4-31.9-32-10.2 44-11.7-43.7-30.9 33 11.8-43.6-43.2 13 32-31.8-44-10.3 43.6-11.6-33-31 43.6 11.8-13-43.2 31.8 32 10.3-44 11.7 43.6 30.8-32.9-11.7 43.6 43.2-13-32 31.8 44 10.3L290 362l33 30.9-43.7-11.7z"
      />
    </G>
  </Svg>
);
export default SvgNr;
