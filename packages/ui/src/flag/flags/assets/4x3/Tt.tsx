import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgTt = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" {...props}>
    <Path fill="#fff" d="M0 0h640v480H0z" />
    <Path fill="#e00000" fillRule="evenodd" d="M463.7 480 0 1v478.8zM176.3 0 640 479V.2z" />
    <Path fill="#000001" fillRule="evenodd" d="M27.7.2h118.6l468.2 479.3H492.2z" />
  </Svg>
);
export default SvgTt;
