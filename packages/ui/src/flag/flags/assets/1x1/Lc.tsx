import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgLc = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <G fillRule="evenodd">
      <Path fill="#65cfff" d="M0 0h512v512H0z" />
      <Path fill="#fff" d="m254.8 44.8 173.5 421.6-344 1L254.7 44.8z" />
      <Path fill="#000001" d="m255 103 150 362.6-297.5.8z" />
      <Path fill="#ffce00" d="m254.8 256.1 173.5 210.8-344 .5z" />
    </G>
  </Svg>
);
export default SvgLc;
