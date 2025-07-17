import * as React from 'react';
import Svg, { Path, Use } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgGg = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 512 512"
    {...props}
  >
    <Path fill="#fff" d="M0 0h512v512H0z" />
    <Path fill="#e8112d" d="M192 0h128v512H192z" />
    <Path fill="#e8112d" d="M0 187.7h512v136.6H0z" />
    <Path id="gg_svg__a" fill="#f9dd16" d="m46 305.8 23.3-25h210v-49.7h-210L46 206.2z" />
    <Use
      xlinkHref="#gg_svg__a"
      width={36}
      height={24}
      transform="matrix(0 1.06667 -.9375 0 496 -17)"
    />
    <Use
      xlinkHref="#gg_svg__a"
      width={36}
      height={24}
      transform="matrix(0 -1.06667 .9375 0 16 529)"
    />
    <Use xlinkHref="#gg_svg__a" width={36} height={24} transform="rotate(180 256 256)" />
  </Svg>
);
export default SvgGg;
