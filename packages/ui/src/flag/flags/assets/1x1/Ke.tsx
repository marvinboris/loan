import * as React from 'react';
import Svg, { Defs, Path, G, Use, Ellipse } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgKe = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 512 512"
    {...props}
  >
    <Defs>
      <Path
        id="ke_svg__a"
        strokeMiterlimit={10}
        d="m-28.6 47.5 1.8 1 46.7-81c2.7-.6 4.2-3.2 5.7-5.8 1-1.8 5-8.7 6.7-17.7a58 58 0 0 0-11.9 14.7c-1.5 2.6-3 5.2-2.3 7.9z"
      />
    </Defs>
    <Path fill="#fff" d="M0 0h512v512H0z" />
    <Path fill="#000001" d="M0 0h512v153.6H0z" />
    <Path fill="#060" d="M0 358.4h512V512H0z" />
    <G id="ke_svg__b" transform="matrix(3.2 0 0 3.2 255.8 256)">
      <Use xlinkHref="#ke_svg__a" width="100%" height="100%" stroke="#000" />
      <Use xlinkHref="#ke_svg__a" width="100%" height="100%" fill="#fff" />
    </G>
    <Use xlinkHref="#ke_svg__b" width="100%" height="100%" transform="matrix(-1 0 0 1 511.7 0)" />
    <Path
      fill="#b00"
      d="M255.8 102.4c-19.2 0-51.2 51.2-60.8 76.8H0v153.6h195c9.7 25.6 41.7 76.8 60.9 76.8s51.2-51.2 60.8-76.8H512V179.2H316.6c-9.6-25.6-41.6-76.8-60.8-76.8"
    />
    <Path
      id="ke_svg__c"
      d="M316.6 332.8a220 220 0 0 0 16-76.8 220 220 0 0 0-16-76.8 220 220 0 0 0-16 76.8 220 220 0 0 0 16 76.8"
    />
    <Use xlinkHref="#ke_svg__c" width="100%" height="100%" transform="matrix(-1 0 0 1 511.7 0)" />
    <G fill="#fff" transform="matrix(3.2 0 0 3.2 255.8 256)">
      <Ellipse rx={4} ry={6} />
      <Path id="ke_svg__d" d="M1 5.8s4 8 4 21-4 21-4 21z" />
      <Use xlinkHref="#ke_svg__d" width="100%" height="100%" transform="scale(-1)" />
      <Use xlinkHref="#ke_svg__d" width="100%" height="100%" transform="scale(-1 1)" />
      <Use xlinkHref="#ke_svg__d" width="100%" height="100%" transform="scale(1 -1)" />
    </G>
  </Svg>
);
export default SvgKe;
