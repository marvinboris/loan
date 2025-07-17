import * as React from 'react';
import Svg, { Path, G, Use } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgSt = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 640 480"
    {...props}
  >
    <Path fill="#12ad2b" d="M0 0h640v480H0z" />
    <Path fill="#ffce00" d="M0 137.1h640V343H0z" />
    <Path fill="#d21034" d="M0 0v480l240-240" />
    <G id="st_svg__c" transform="translate(351.6 240)scale(.34286)">
      <G id="st_svg__b">
        <Path id="st_svg__a" fill="#000001" d="M0-200V0h100" transform="rotate(18 0 -200)" />
        <Use xlinkHref="#st_svg__a" width="100%" height="100%" transform="scale(-1 1)" />
      </G>
      <Use xlinkHref="#st_svg__b" width="100%" height="100%" transform="rotate(72)" />
      <Use xlinkHref="#st_svg__b" width="100%" height="100%" transform="rotate(144)" />
      <Use xlinkHref="#st_svg__b" width="100%" height="100%" transform="rotate(-144)" />
      <Use xlinkHref="#st_svg__b" width="100%" height="100%" transform="rotate(-72)" />
    </G>
    <Use xlinkHref="#st_svg__c" width="100%" height="100%" x={700} transform="translate(-523.2)" />
  </Svg>
);
export default SvgSt;
