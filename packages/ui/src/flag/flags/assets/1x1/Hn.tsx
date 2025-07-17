import * as React from 'react';
import Svg, { Path, G, Use } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgHn = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 512 512"
    {...props}
  >
    <Path fill="#18c3df" d="M0 0h512v512H0z" />
    <Path fill="#fff" d="M0 170.7h512v170.6H0z" />
    <G id="hn_svg__c" fill="#18c3df" transform="translate(256 256)scale(28.44446)">
      <G id="hn_svg__b">
        <Path id="hn_svg__a" d="m0-1-.3 1 .5.1z" />
        <Use xlinkHref="#hn_svg__a" width="100%" height="100%" transform="scale(-1 1)" />
      </G>
      <Use xlinkHref="#hn_svg__b" width="100%" height="100%" transform="rotate(72)" />
      <Use xlinkHref="#hn_svg__b" width="100%" height="100%" transform="rotate(-72)" />
      <Use xlinkHref="#hn_svg__b" width="100%" height="100%" transform="rotate(144)" />
      <Use xlinkHref="#hn_svg__b" width="100%" height="100%" transform="rotate(-144)" />
    </G>
    <Use xlinkHref="#hn_svg__c" width="100%" height="100%" transform="translate(142.2 -45.5)" />
    <Use xlinkHref="#hn_svg__c" width="100%" height="100%" transform="translate(142.2 39.8)" />
    <Use xlinkHref="#hn_svg__c" width="100%" height="100%" transform="translate(-142.2 -45.5)" />
    <Use xlinkHref="#hn_svg__c" width="100%" height="100%" transform="translate(-142.2 39.8)" />
  </Svg>
);
export default SvgHn;
