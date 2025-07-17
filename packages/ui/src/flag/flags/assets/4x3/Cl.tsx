import * as React from 'react';
import Svg, { Defs, ClipPath, Path, G } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgCl = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" {...props}>
    <Defs>
      <ClipPath id="cl_svg__a">
        <Path fillOpacity={0.7} d="M0 0h682.7v512H0z" />
      </ClipPath>
    </Defs>
    <G fillRule="evenodd" clipPath="url(#cl_svg__a)" transform="scale(.9375)">
      <Path fill="#fff" d="M256 0h512v256H256z" />
      <Path fill="#0039a6" d="M0 0h256v256H0z" />
      <Path
        fill="#fff"
        d="M167.8 191.7 128.2 162l-39.5 30 14.7-48.8L64 113.1l48.7-.5L127.8 64l15.5 48.5 48.7.1-39.2 30.4z"
      />
      <Path fill="#d52b1e" d="M0 256h768v256H0z" />
    </G>
  </Svg>
);
export default SvgCl;
