import * as React from 'react';
import Svg, { Path, G, Use } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgTj = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 512 512"
    {...props}
  >
    <Path fill="#060" d="M0 0h512v512H0z" />
    <Path fill="#fff" d="M0 0h512v365.7H0z" />
    <Path fill="#c00" d="M0 0h512v146.3H0z" />
    <G fill="#f8c300" transform="translate(-256)scale(.73143)">
      <Path d="M672 340.7a12.5 12.5 0 0 1 23.3 5.9v50h9.4v-50a12.5 12.5 0 0 1 23.3-5.9 29.5 29.5 0 1 0-56 0" />
      <Path
        fill="#fff"
        d="M678.7 327.6a20 20 0 0 1 21.3 9.6 20 20 0 0 1 21.3-9.6 21.5 21.5 0 0 0-42.6 0"
      />
      <Path
        id="tj_svg__a"
        d="M695.3 376.6a38 38 0 0 1-63.8 24.3 39.5 39.5 0 0 1-59.8 17.5c3.7 36.4 58.3 29 62.3-6.4 17.2 30.1 55 21.5 66-15.4z"
      />
      <Use xlinkHref="#tj_svg__a" width="100%" height="100%" transform="matrix(-1 0 0 1 1400 0)" />
      <Path
        id="tj_svg__b"
        d="M658.8 441.3c-7.6 16.5-22.8 19.3-36.1 6 0 0 5.3-3.8 11-4.8a18 18 0 0 1 4.3-14.3 22 22 0 0 1 9 11.8c8-1 11.8 1.3 11.8 1.3"
      />
      <Use xlinkHref="#tj_svg__b" width="100%" height="100%" transform="rotate(9.4 700 804)" />
      <Use xlinkHref="#tj_svg__b" width="100%" height="100%" transform="rotate(18.7 700 804)" />
      <Path fill="none" stroke="#f8c300" strokeWidth={16} d="M603 478a340 340 0 0 1 194 0" />
      <G transform="translate(700 380)">
        <G transform="translate(0 -140)">
          <Path
            id="tj_svg__c"
            d="m488533-158734-790463 574305L0-513674l301930 929245-790463-574305z"
            transform="scale(.00005)"
          />
        </G>
        <G id="tj_svg__d">
          <Use
            xlinkHref="#tj_svg__c"
            width="100%"
            height="100%"
            transform="translate(-70 -121.2)"
          />
          <Use
            xlinkHref="#tj_svg__c"
            width="100%"
            height="100%"
            transform="translate(-121.2 -70)"
          />
          <Use xlinkHref="#tj_svg__c" width="100%" height="100%" transform="translate(-140)" />
        </G>
        <Use xlinkHref="#tj_svg__d" width="100%" height="100%" transform="scale(-1 1)" />
      </G>
    </G>
  </Svg>
);
export default SvgTj;
