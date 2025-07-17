import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgGh = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" {...props}>
    <Path fill="#006b3f" d="M0 0h640v480H0z" />
    <Path fill="#fcd116" d="M0 0h640v320H0z" />
    <Path fill="#ce1126" d="M0 0h640v160H0z" />
    <Path fill="#000001" d="m320 160 52 160-136.1-98.9H404L268 320z" />
  </Svg>
);
export default SvgGh;
