import * as React from 'react';
import Svg, { Path, G, Use } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgGw = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 640 480"
    {...props}
  >
    <Path fill="#ce1126" d="M0 0h220v480H0z" />
    <Path fill="#fcd116" d="M220 0h420v240H220z" />
    <Path fill="#009e49" d="M220 240h420v240H220z" />
    <G id="gw_svg__b" transform="matrix(80 0 0 80 110 240)">
      <Path id="gw_svg__a" fill="#000001" d="M0-1v1h.5" transform="rotate(18 0 -1)" />
      <Use xlinkHref="#gw_svg__a" width="100%" height="100%" transform="scale(-1 1)" />
    </G>
    <Use xlinkHref="#gw_svg__b" width="100%" height="100%" transform="rotate(72 110 240)" />
    <Use xlinkHref="#gw_svg__b" width="100%" height="100%" transform="rotate(144 110 240)" />
    <Use xlinkHref="#gw_svg__b" width="100%" height="100%" transform="rotate(-144 110 240)" />
    <Use xlinkHref="#gw_svg__b" width="100%" height="100%" transform="rotate(-72 110 240)" />
  </Svg>
);
export default SvgGw;
