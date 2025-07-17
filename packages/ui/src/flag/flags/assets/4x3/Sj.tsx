import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgSj = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" {...props}>
    <Path fill="#ef2b2d" d="M0 0h640v480H0z" />
    <Path fill="#fff" d="M180 0h120v480H180z" />
    <Path fill="#fff" d="M0 180h640v120H0z" />
    <Path fill="#002868" d="M210 0h60v480h-60z" />
    <Path fill="#002868" d="M0 210h640v60H0z" />
  </Svg>
);
export default SvgSj;
