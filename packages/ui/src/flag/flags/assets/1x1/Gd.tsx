import * as React from 'react';
import Svg, { Defs, G, Path, Use, Circle } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgGd = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 512 512"
    {...props}
  >
    <Defs>
      <G id="gd_svg__c">
        <G id="gd_svg__b">
          <Path id="gd_svg__a" fill="#fcd116" d="M0-1v1h.5" transform="rotate(18 0 -1)" />
          <Use xlinkHref="#gd_svg__a" width="100%" height="100%" transform="scale(-1 1)" />
        </G>
        <Use xlinkHref="#gd_svg__b" width="100%" height="100%" transform="rotate(72)" />
        <Use xlinkHref="#gd_svg__b" width="100%" height="100%" transform="rotate(144)" />
        <Use xlinkHref="#gd_svg__b" width="100%" height="100%" transform="rotate(-144)" />
        <Use xlinkHref="#gd_svg__b" width="100%" height="100%" transform="rotate(-72)" />
      </G>
    </Defs>
    <Path fill="#ce1126" d="M0 0h512v512H0z" />
    <Path fill="#007a5e" d="M71.7 71.7h368.6v368.6H71.7z" />
    <Path fill="#fcd116" d="M71.7 71.7h368.6L71.7 440.4h368.6z" />
    <Circle cx={255.9} cy={256.1} r={61.4} fill="#ce1126" />
    <Use
      xlinkHref="#gd_svg__c"
      width="100%"
      height="100%"
      transform="translate(256 256)scale(56.32)"
    />
    <Use
      xlinkHref="#gd_svg__d"
      width="100%"
      height="100%"
      x={-100}
      transform="translate(-16.4 -.1)"
    />
    <Use
      xlinkHref="#gd_svg__c"
      id="gd_svg__d"
      width="100%"
      height="100%"
      transform="translate(256 35.9)scale(33.28)"
    />
    <Use xlinkHref="#gd_svg__d" width="100%" height="100%" x={100} transform="translate(16.4)" />
    <Path fill="#ce1126" d="M99.8 256.8c7.7 14.3 22.6 29.8 35.7 35.3.2-14.5-5-33.2-12-48z" />
    <Path
      fill="#fcd116"
      d="M86.8 207.6c11.1 23.3-29 78.7 37.8 91.7a67.5 67.5 0 0 1-11.5-44.7 75.5 75.5 0 0 1 34.6 32.8c17.5-63.4-44.8-59.5-61-79.8z"
    />
    <Use
      xlinkHref="#gd_svg__d"
      width="100%"
      height="100%"
      x={-100}
      transform="translate(-16.4 442)"
    />
    <Use
      xlinkHref="#gd_svg__c"
      width="100%"
      height="100%"
      transform="translate(256 478)scale(33.28)"
    />
    <Use
      xlinkHref="#gd_svg__d"
      width="100%"
      height="100%"
      x={100}
      transform="translate(16.4 442.2)"
    />
  </Svg>
);
export default SvgGd;
