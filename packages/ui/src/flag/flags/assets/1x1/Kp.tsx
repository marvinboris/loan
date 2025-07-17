import * as React from 'react';
import Svg, { Defs, ClipPath, Path, G } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgKp = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <Defs>
      <ClipPath id="kp_svg__a">
        <Path fillOpacity={0.7} d="M92.2 7.8h593.6v485.5H92.2z" />
      </ClipPath>
    </Defs>
    <G
      fillRule="evenodd"
      clipPath="url(#kp_svg__a)"
      transform="matrix(.86254 0 0 1.0546 -79.5 -8.3)"
    >
      <Path fill="#fff" stroke="#000" strokeWidth={1.1} d="M991.8 492.9H4.2V8.4h987.6z" />
      <Path fill="#3e5698" d="M991.8 405.2H4.2V493h987.6z" />
      <Path fill="#c60000" d="M991.8 384.9H4.2V116.4h987.6z" />
      <Path fill="#3e5698" d="M991.8 8.4H4.2V96h987.6z" />
      <Path
        fill="#fff"
        d="M473 250.7c0 60.1-61.5 108.9-137.4 108.9-76 0-137.6-48.8-137.6-109 0-60.1 61.6-108.9 137.6-108.9S473 190.5 473 250.7"
      />
      <Path
        fill="#c40000"
        d="m402.9 326.8-66.1-38.6-67.1 39 26.3-62.8-66.1-38.5 82.4-.3 26.2-63 24.5 62.8 82.4-.4-67.2 39z"
      />
    </G>
  </Svg>
);
export default SvgKp;
