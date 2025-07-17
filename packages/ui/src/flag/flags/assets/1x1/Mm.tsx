import * as React from 'react';
import Svg, { Path, Use } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgMm = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 512 512"
    {...props}
  >
    <Path fill="#fecb00" d="M0 0h512v512H0z" />
    <Path fill="#34b233" d="M0 170.7h512V512H0z" />
    <Path fill="#ea2839" d="M0 341.3h512V512H0z" />
    <Path id="mm_svg__a" fill="#fff" strokeWidth={188.7} d="M312.6 274H199.4L256 85.3Z" />
    <Use xlinkHref="#mm_svg__a" width="100%" height="100%" transform="rotate(-144 256 274)" />
    <Use xlinkHref="#mm_svg__a" width="100%" height="100%" transform="rotate(-72 256 274)" />
    <Use xlinkHref="#mm_svg__a" width="100%" height="100%" transform="rotate(72 256 274)" />
    <Use xlinkHref="#mm_svg__a" width="100%" height="100%" transform="rotate(144 256 274)" />
  </Svg>
);
export default SvgMm;
