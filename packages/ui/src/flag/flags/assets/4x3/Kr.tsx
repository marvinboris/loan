import * as React from 'react';
import Svg, { Defs, ClipPath, Path, G, Use, Circle } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgKr = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 640 480"
    {...props}
  >
    <Defs>
      <ClipPath id="kr_svg__a">
        <Path fillOpacity={0.7} d="M-95.8-.4h682.7v512H-95.8z" />
      </ClipPath>
    </Defs>
    <G fillRule="evenodd" clipPath="url(#kr_svg__a)" transform="translate(89.8 .4)scale(.9375)">
      <Path fill="#fff" d="M-95.8-.4H587v512H-95.8Z" />
      <G transform="rotate(-56.3 361.6 -101.3)scale(10.66667)">
        <G id="kr_svg__c">
          <Path id="kr_svg__b" fill="#000001" d="M-6-26H6v2H-6Zm0 3H6v2H-6Zm0 3H6v2H-6Z" />
          <Use xlinkHref="#kr_svg__b" width="100%" height="100%" y={44} />
        </G>
        <Path stroke="#fff" d="M0 17v10" />
        <Path fill="#cd2e3a" d="M0-12a12 12 0 0 1 0 24Z" />
        <Path fill="#0047a0" d="M0-12a12 12 0 0 0 0 24A6 6 0 0 0 0 0Z" />
        <Circle cy={-6} r={6} fill="#cd2e3a" />
      </G>
      <G transform="rotate(-123.7 191.2 62.2)scale(10.66667)">
        <Use xlinkHref="#kr_svg__c" width="100%" height="100%" />
        <Path stroke="#fff" d="M0-23.5v3M0 17v3.5m0 3v3" />
      </G>
    </G>
  </Svg>
);
export default SvgKr;
