import * as React from 'react';
import Svg, { Path, G } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgGr = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <Path fill="#0d5eaf" fillRule="evenodd" d="M0 0h512v57H0z" />
    <Path fill="#fff" fillRule="evenodd" d="M0 57h512v57H0z" />
    <Path fill="#0d5eaf" fillRule="evenodd" d="M0 114h512v57H0z" />
    <Path fill="#fff" fillRule="evenodd" d="M0 171h512v57H0z" />
    <Path fill="#0d5eaf" fillRule="evenodd" d="M0 228h512v56.9H0z" />
    <Path fill="#fff" fillRule="evenodd" d="M0 284.9h512v57H0z" />
    <Path fill="#0d5eaf" fillRule="evenodd" d="M0 341.9h512v57H0z" />
    <Path fill="#fff" fillRule="evenodd" d="M0 398.9h512v57H0z" />
    <Path fill="#0d5eaf" d="M0 0h284.9v284.9H0z" />
    <G fill="#fff" fillRule="evenodd" strokeWidth={1.3}>
      <Path d="M114 0h57v284.9h-57z" />
      <Path d="M0 114h284.9v57H0z" />
    </G>
    <Path fill="#0d5eaf" fillRule="evenodd" d="M0 455h512v57H0z" />
  </Svg>
);
export default SvgGr;
