import * as React from 'react';
import Svg, { Path, G, Circle, Use } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgIn = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 512 512"
    {...props}
  >
    <Path fill="#f93" d="M0 0h512v170.7H0z" />
    <Path fill="#fff" d="M0 170.7h512v170.6H0z" />
    <Path fill="#128807" d="M0 341.3h512V512H0z" />
    <G transform="translate(256 256)scale(3.41333)">
      <Circle r={20} fill="#008" />
      <Circle r={17.5} fill="#fff" />
      <Circle r={3.5} fill="#008" />
      <G id="in_svg__d">
        <G id="in_svg__c">
          <G id="in_svg__b">
            <G id="in_svg__a" fill="#008">
              <Circle r={0.9} transform="rotate(7.5 -8.8 133.5)" />
              <Path d="M0 17.5.6 7 0 2l-.6 5z" />
            </G>
            <Use xlinkHref="#in_svg__a" width="100%" height="100%" transform="rotate(15)" />
          </G>
          <Use xlinkHref="#in_svg__b" width="100%" height="100%" transform="rotate(30)" />
        </G>
        <Use xlinkHref="#in_svg__c" width="100%" height="100%" transform="rotate(60)" />
      </G>
      <Use xlinkHref="#in_svg__d" width="100%" height="100%" transform="rotate(120)" />
      <Use xlinkHref="#in_svg__d" width="100%" height="100%" transform="rotate(-120)" />
    </G>
  </Svg>
);
export default SvgIn;
