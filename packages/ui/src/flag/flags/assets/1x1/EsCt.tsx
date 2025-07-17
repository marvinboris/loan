import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgEsCt = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <Path fill="#fcdd09" d="M0 0h512v512H0z" />
    <Path
      stroke="#da121a"
      strokeWidth={60}
      d="M0 90h810m0 120H0m0 120h810m0 120H0"
      transform="scale(.6321 .94815)"
    />
  </Svg>
);
export default SvgEsCt;
