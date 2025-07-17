import * as React from 'react';
import Svg, { Path, G } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgTt = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <Path
      fill="#fff"
      d="M0 0h512v512H0z"
      style={{
        width: 0,
      }}
    />
    <G fillRule="evenodd">
      <Path fill="#e00000" d="M371 512 0 1v510.7zM141 0l371 511V.2z" />
      <Path fill="#000001" d="M22.2.2h94.9l374.5 511.3h-97.9z" />
    </G>
  </Svg>
);
export default SvgTt;
