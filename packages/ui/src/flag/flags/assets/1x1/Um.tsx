import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: marker */
import type { SvgProps } from 'react-native-svg';
const SvgUm = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <Path fill="#bd3d44" d="M0 0h512v512H0" />
    <Path
      stroke="#fff"
      strokeWidth={40}
      d="M0 58h512M0 137h512M0 216h512M0 295h512M0 374h512M0 453h512"
    />
    <Path fill="#192f5d" d="M0 0h390v275H0z" />
    <Path
      fill="none"
      markerMid="url(#um_svg__a)"
      d="m0 0 18 11h65 65 65 65 66L51 39h65 65 65 65L18 66h65 65 65 65 66L51 94h65 65 65 65L18 121h65 65 65 65 66L51 149h65 65 65 65L18 177h65 65 65 65 66L51 205h65 65 65 65L18 232h65 65 65 65 66z"
    />
  </Svg>
);
export default SvgUm;
