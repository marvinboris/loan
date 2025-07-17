import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgTd = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <G fillRule="evenodd">
      <Path fill="#002664" d="M0 0h171.2v512H0z" />
      <Path fill="#c60c30" d="M340.8 0H512v512H340.8z" />
      <Path fill="#fecb00" d="M171.2 0h169.6v512H171.2z" />
    </G>
  </Svg>
);
export default SvgTd;
