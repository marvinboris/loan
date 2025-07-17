import * as React from 'react';
import Svg, { Path, G, Use } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgCm = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 512 512"
    {...props}
  >
    <Path fill="#007a5e" d="M0 0h170.7v512H0z" />
    <Path fill="#ce1126" d="M170.7 0h170.6v512H170.7z" />
    <Path fill="#fcd116" d="M341.3 0H512v512H341.3z" />
    <G fill="#fcd116" transform="translate(256 256)scale(5.6889)">
      <G id="cm_svg__b">
        <Path id="cm_svg__a" d="M0-8-2.5-.4 1.3.9z" />
        <Use xlinkHref="#cm_svg__a" width="100%" height="100%" transform="scale(-1 1)" />
      </G>
      <Use xlinkHref="#cm_svg__b" width="100%" height="100%" transform="rotate(72)" />
      <Use xlinkHref="#cm_svg__b" width="100%" height="100%" transform="rotate(144)" />
      <Use xlinkHref="#cm_svg__b" width="100%" height="100%" transform="rotate(-144)" />
      <Use xlinkHref="#cm_svg__b" width="100%" height="100%" transform="rotate(-72)" />
    </G>
  </Svg>
);
export default SvgCm;
