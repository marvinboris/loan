import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgXx = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" {...props}>
    <Path
      fill="#fff"
      fillRule="evenodd"
      stroke="#adb5bd"
      strokeWidth={1.1}
      d="M.5.5h638.9v478.9H.5z"
    />
    <Path fill="none" stroke="#adb5bd" strokeWidth={1.1} d="m.5.5 639 479m0-479-639 479" />
  </Svg>
);
export default SvgXx;
