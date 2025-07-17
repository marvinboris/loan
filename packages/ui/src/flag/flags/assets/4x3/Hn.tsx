import * as React from 'react';
import Svg, { Path, G, Use } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgHn = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 640 480"
    {...props}
  >
    <Path fill="#18c3df" d="M0 0h640v480H0z" />
    <Path fill="#fff" d="M0 160h640v160H0z" />
    <G id="hn_svg__c" fill="#18c3df" transform="translate(320 240)scale(26.66665)">
      <G id="hn_svg__b">
        <Path id="hn_svg__a" d="m-.3 0 .5.1L0-1z" />
        <Use xlinkHref="#hn_svg__a" width="100%" height="100%" transform="scale(-1 1)" />
      </G>
      <Use xlinkHref="#hn_svg__b" width="100%" height="100%" transform="rotate(72)" />
      <Use xlinkHref="#hn_svg__b" width="100%" height="100%" transform="rotate(-72)" />
      <Use xlinkHref="#hn_svg__b" width="100%" height="100%" transform="rotate(144)" />
      <Use xlinkHref="#hn_svg__b" width="100%" height="100%" transform="rotate(-144)" />
    </G>
    <Use xlinkHref="#hn_svg__c" width="100%" height="100%" transform="translate(133.3 -42.7)" />
    <Use xlinkHref="#hn_svg__c" width="100%" height="100%" transform="translate(133.3 37.3)" />
    <Use xlinkHref="#hn_svg__c" width="100%" height="100%" transform="translate(-133.3 -42.7)" />
    <Use xlinkHref="#hn_svg__c" width="100%" height="100%" transform="translate(-133.3 37.3)" />
  </Svg>
);
export default SvgHn;
