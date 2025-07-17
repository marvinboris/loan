import * as React from 'react';
import Svg, { Defs, ClipPath, Path, G, Use } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgCw = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 512 512"
    {...props}
  >
    <Defs>
      <ClipPath id="cw_svg__a">
        <Path fillOpacity={0.7} d="M0 0h9000v9000H0z" />
      </ClipPath>
      <Path id="cw_svg__b" d="m0-1 .2.7H1L.3 0l.2.7L0 .4l-.6.4.2-.7-.5-.4h.7z" />
    </Defs>
    <G clipPath="url(#cw_svg__a)" transform="scale(.057)">
      <Path fill="#002b7f" d="M0 0h13500v9000H0z" />
      <Path fill="#f9e814" d="M0 5625h13500v1125H0z" />
      <Use
        xlinkHref="#cw_svg__b"
        width={13500}
        height={9000}
        x={2}
        y={2}
        fill="#fff"
        transform="scale(750)"
      />
      <Use
        xlinkHref="#cw_svg__b"
        width={13500}
        height={9000}
        x={3}
        y={3}
        fill="#fff"
        transform="scale(1000)"
      />
    </G>
  </Svg>
);
export default SvgCw;
