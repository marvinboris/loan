import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgJm = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" {...props}>
    <G fillRule="evenodd">
      <Path fill="#000001" d="m0 0 320 240L0 480zm640 0L320 240l320 240z" />
      <Path fill="#090" d="m0 0 320 240L640 0zm0 480 320-240 320 240z" />
      <Path fill="#fc0" d="M640 0h-59.6L0 435.3V480h59.6L640 44.7z" />
      <Path fill="#fc0" d="M0 0v44.7L580.4 480H640v-44.7L59.6 0z" />
    </G>
  </Svg>
);
export default SvgJm;
