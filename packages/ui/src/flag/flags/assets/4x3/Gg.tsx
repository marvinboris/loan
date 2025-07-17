import * as React from 'react';
import Svg, { Path, Use } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgGg = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 640 480"
    {...props}
  >
    <Path fill="#fff" d="M0 0h640v480H0z" />
    <Path fill="#e8112d" d="M256 0h128v480H256z" />
    <Path fill="#e8112d" d="M0 176h640v128H0z" />
    <Path id="gg_svg__a" fill="#f9dd16" d="m110 286.7 23.3-23.4h210v-46.6h-210L110 193.3z" />
    <Use xlinkHref="#gg_svg__a" width={36} height={24} transform="rotate(90 320 240)" />
    <Use xlinkHref="#gg_svg__a" width={36} height={24} transform="rotate(-90 320 240)" />
    <Use xlinkHref="#gg_svg__a" width={36} height={24} transform="rotate(180 320 240)" />
  </Svg>
);
export default SvgGg;
