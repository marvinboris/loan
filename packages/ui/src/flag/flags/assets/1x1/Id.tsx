import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgId = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <Path fill="#e70011" d="M0 0h512v256H0Z" />
    <Path fill="#fff" d="M0 256h512v256H0Z" />
  </Svg>
);
export default SvgId;
