import * as React from 'react';
import Svg, { Defs, Path, Use } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgCn = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 512 512"
    {...props}
  >
    <Defs>
      <Path id="cn_svg__a" fill="#ff0" d="M1-.3-.7.8 0-1 .6.8-1-.3z" />
    </Defs>
    <Path fill="#ee1c25" d="M0 0h512v512H0z" />
    <Use xlinkHref="#cn_svg__a" width={30} height={20} transform="translate(128 128)scale(76.8)" />
    <Use
      xlinkHref="#cn_svg__a"
      width={30}
      height={20}
      transform="rotate(-121 142.6 -47)scale(25.5827)"
    />
    <Use
      xlinkHref="#cn_svg__a"
      width={30}
      height={20}
      transform="rotate(-98.1 198 -82)scale(25.6)"
    />
    <Use
      xlinkHref="#cn_svg__a"
      width={30}
      height={20}
      transform="rotate(-74 272.4 -114)scale(25.6137)"
    />
    <Use
      xlinkHref="#cn_svg__a"
      width={30}
      height={20}
      transform="matrix(16 -19.968 19.968 16 256 230.4)"
    />
  </Svg>
);
export default SvgCn;
