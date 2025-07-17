import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgVc = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <G fillRule="evenodd" strokeWidth="1pt">
      <Path fill="#f4f100" d="M0 0h510.4v512H0z" />
      <Path fill="#199a00" d="M385.6 0H512v512H385.6z" />
      <Path fill="#0058aa" d="M0 0h126.4v512H0z" />
    </G>
    <Path
      fill="#199a00"
      fillRule="evenodd"
      d="m191.2 138.6-49.5 76.2 47.8 79.3 46.7-78.6zm129.4 0L271 214.8l47.7 79.3 46.8-78.6-45-76.9zm-65.4 103.9-49.4 76.1 47.7 79.4 46.7-78.7z"
    />
  </Svg>
);
export default SvgVc;
