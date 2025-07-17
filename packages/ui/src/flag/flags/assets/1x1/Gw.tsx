import * as React from 'react';
import Svg, { Path, G, Use } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgGw = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 512 512"
    {...props}
  >
    <Path fill="#ce1126" d="M0 0h160v512H0z" />
    <Path fill="#fcd116" d="M160 0h352v256H160z" />
    <Path fill="#009e49" d="M160 256h352v256H160z" />
    <G transform="translate(-46.2 72.8)scale(.7886)">
      <G id="gw_svg__b" transform="matrix(80 0 0 80 160 240)">
        <Path id="gw_svg__a" fill="#000001" d="M0-1v1h.5" transform="rotate(18 0 -1)" />
        <Use xlinkHref="#gw_svg__a" width="100%" height="100%" transform="scale(-1 1)" />
      </G>
      <Use xlinkHref="#gw_svg__b" width="100%" height="100%" transform="rotate(72 160 240)" />
      <Use xlinkHref="#gw_svg__b" width="100%" height="100%" transform="rotate(144 160 240)" />
      <Use xlinkHref="#gw_svg__b" width="100%" height="100%" transform="rotate(-144 160 240)" />
      <Use xlinkHref="#gw_svg__b" width="100%" height="100%" transform="rotate(-72 160 240)" />
    </G>
  </Svg>
);
export default SvgGw;
