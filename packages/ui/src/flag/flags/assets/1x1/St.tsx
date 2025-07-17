import * as React from 'react';
import Svg, { Path, G, Use } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgSt = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 512 512"
    {...props}
  >
    <Path fill="#12ad2b" d="M0 0h512v512H0z" />
    <Path fill="#ffce00" d="M0 146.3h512v219.4H0z" />
    <Path fill="#d21034" d="M0 0v512l192-256" />
    <G id="st_svg__c" transform="translate(276.9 261.5)scale(.33167)">
      <G id="st_svg__b">
        <Path id="st_svg__a" fill="#000001" d="M0-200V0h100" transform="rotate(18 0 -200)" />
        <Use xlinkHref="#st_svg__a" width="100%" height="100%" transform="scale(-1 1)" />
      </G>
      <Use xlinkHref="#st_svg__b" width="100%" height="100%" transform="rotate(72)" />
      <Use xlinkHref="#st_svg__b" width="100%" height="100%" transform="rotate(144)" />
      <Use xlinkHref="#st_svg__b" width="100%" height="100%" transform="rotate(-144)" />
      <Use xlinkHref="#st_svg__b" width="100%" height="100%" transform="rotate(-72)" />
    </G>
    <Use xlinkHref="#st_svg__c" width="100%" height="100%" x={700} transform="translate(-550.9)" />
  </Svg>
);
export default SvgSt;
