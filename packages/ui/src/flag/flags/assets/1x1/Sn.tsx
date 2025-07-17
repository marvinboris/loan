import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgSn = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <G fillRule="evenodd" strokeWidth="1pt">
      <Path fill="#0b7226" d="M0 0h170.7v512H0z" />
      <Path fill="#ff0" d="M170.7 0h170.6v512H170.7z" />
      <Path fill="#bc0000" d="M341.3 0H512v512H341.3z" />
    </G>
    <Path
      fill="#0b7226"
      d="m197 351.7 22-71.7-60.4-46.5h74.5l24.2-76 22.1 76H356L295.6 280l22.1 74-60.3-46.5z"
    />
  </Svg>
);
export default SvgSn;
