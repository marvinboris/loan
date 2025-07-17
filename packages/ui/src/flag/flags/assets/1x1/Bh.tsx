import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgBh = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <Path fill="#fff" d="M0 0h512v512H0" />
    <Path
      fill="#ce1126"
      d="M512 0H102.4l83.4 51.2-83.4 51.2 83.4 51.2-83.4 51.2 83.4 51.2-83.4 51.2 83.4 51.2-83.4 51.2 83.4 51.2-83.4 51.2H512"
    />
  </Svg>
);
export default SvgBh;
