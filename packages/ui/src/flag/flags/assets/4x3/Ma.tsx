import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgMa = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" {...props}>
    <Path fill="#c1272d" d="M640 0H0v480h640z" />
    <Path
      fill="none"
      stroke="#006233"
      strokeWidth={11.7}
      d="M320 179.4 284.4 289l93.2-67.6H262.4l93.2 67.6z"
    />
  </Svg>
);
export default SvgMa;
