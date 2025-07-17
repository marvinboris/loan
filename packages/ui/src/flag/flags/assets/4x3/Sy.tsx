import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgSy = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" {...props}>
    <Path fill="#000001" d="M0 0h640v480H0Z" />
    <Path fill="#fff" d="M0 0h640v320H0Z" />
    <Path fill="#ce1126" d="M0 0h640v160H0Z" />
    <Path
      fill="#007a3d"
      d="m161 300 39-120 39 120-102-74.2h126M401 300l39-120 39 120-102-74.2h126"
    />
  </Svg>
);
export default SvgSy;
