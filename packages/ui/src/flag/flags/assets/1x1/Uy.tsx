import * as React from 'react';
import Svg, { Path, G, Use, Circle } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgUy = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 512 512"
    {...props}
  >
    <Path fill="#fff" d="M0 0h512v512H0z" />
    <Path
      fill="#0038a8"
      d="M284 56.9h228v56.9H284zm0 113.8h228v56.9H284zM0 284.4h512v57H0zm0 113.8h512v57H0z"
    />
    <G
      fill="#fcd116"
      stroke="#000"
      strokeMiterlimit={20}
      strokeWidth={0.6}
      transform="translate(142.2 142.2)scale(3.12889)"
    >
      <G id="uy_svg__c">
        <G id="uy_svg__b">
          <G id="uy_svg__a">
            <Path
              strokeLinecap="square"
              d="m-2 8.9 3 4.5c-12.4 9-4.9 14.2-13.6 17 5.4-5.2-.9-5.7 3.7-16.8"
            />
            <Path fill="none" d="M-4.2 10.2c-6.8 11.2-2.4 17.4-8.4 20.3" />
            <Path d="M0 0h6L0 33-6 0h6v33" />
          </G>
          <Use xlinkHref="#uy_svg__a" width="100%" height="100%" transform="rotate(45)" />
        </G>
        <Use xlinkHref="#uy_svg__b" width="100%" height="100%" transform="rotate(90)" />
      </G>
      <Use xlinkHref="#uy_svg__c" width="100%" height="100%" transform="scale(-1)" />
      <Circle r={11} />
    </G>
    <G transform="translate(142.2 142.2)scale(.31289)">
      <G id="uy_svg__d">
        <Path d="M81-44c-7 8-11-6-36-6S16-35 12-38s21-21 29-22 31 7 40 16m-29 9c7 6 1 19-6 19S26-28 32-36" />
        <Path d="M19-26c1-12 11-14 27-14s23 12 29 15c-7 0-13-10-29-10s-16 0-27 10m3 2c4-6 9 6 20 6s17-3 24-8-10 12-21 12-26-6-23-10" />
        <Path d="M56-17c13-7 5-17 0-19 2 2 10 12 0 19M0 43c6 0 8-2 16-2s27 11 38 7c-23 9-14 3-54 3h-5m63 6c-4-7-3-5-11-16 8 6 10 9 11 16M0 67c25 0 21-5 54-19-24 3-29 11-54 11h-5m5-29c7 0 9-5 17-5s19 3 24 7c1 1-3-8-11-9S25 9 16 7c0 4 3 3 4 9 0 5-9 5-11 0 2 8-4 8-9 8" />
      </G>
      <Use xlinkHref="#uy_svg__d" width="100%" height="100%" transform="scale(-1 1)" />
      <Path d="M0 76c-5 0-18 3 0 3s5-3 0-3" />
    </G>
  </Svg>
);
export default SvgUy;
