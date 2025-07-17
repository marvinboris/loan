import * as React from 'react';
import Svg, { Defs, Path, Use } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgCn = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 640 480"
    {...props}
  >
    <Defs>
      <Path id="cn_svg__a" fill="#ff0" d="M-.6.8 0-1 .6.8-1-.3h2z" />
    </Defs>
    <Path fill="#ee1c25" d="M0 0h640v480H0z" />
    <Use xlinkHref="#cn_svg__a" width={30} height={20} transform="matrix(71.9991 0 0 72 120 120)" />
    <Use
      xlinkHref="#cn_svg__a"
      width={30}
      height={20}
      transform="matrix(-12.33562 -20.5871 20.58684 -12.33577 240.3 48)"
    />
    <Use
      xlinkHref="#cn_svg__a"
      width={30}
      height={20}
      transform="matrix(-3.38573 -23.75998 23.75968 -3.38578 288 95.8)"
    />
    <Use
      xlinkHref="#cn_svg__a"
      width={30}
      height={20}
      transform="matrix(6.5991 -23.0749 23.0746 6.59919 288 168)"
    />
    <Use
      xlinkHref="#cn_svg__a"
      width={30}
      height={20}
      transform="matrix(14.9991 -18.73557 18.73533 14.99929 240 216)"
    />
  </Svg>
);
export default SvgCn;
