import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgCp = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" {...props}>
    <G fillRule="evenodd" strokeWidth="1pt">
      <Path fill="#fff" d="M0 0h640v480H0z" />
      <Path fill="#000091" d="M0 0h213.3v480H0z" />
      <Path fill="#e1000f" d="M426.7 0H640v480H426.7z" />
    </G>
  </Svg>
);
export default SvgCp;
