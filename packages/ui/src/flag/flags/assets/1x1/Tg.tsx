import * as React from 'react';
import Svg, { Defs, ClipPath, Path, G } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgTg = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <Defs>
      <ClipPath id="tg_svg__a">
        <Path fillOpacity={0.7} d="M0-.2h496.3V496H0z" />
      </ClipPath>
    </Defs>
    <G fillRule="evenodd" clipPath="url(#tg_svg__a)" transform="translate(0 .3)scale(1.0316)">
      <Path fill="#ffe300" d="M0-.2h744V496H0z" />
      <Path fill="#118600" d="M0 201.5h744v99.7H0zM0 0h744v99.7H0z" />
      <Path fill="#d80000" d="M0 0h297.1v301.2H0z" />
      <Path
        fill="#fff"
        d="M130.3 124.3c0-.9 18.3-51.5 18.3-51.5l16.6 50.6s55.6 1.7 55.6.8-44 33.2-44 33.2 20.7 58.1 19.9 56.5c-.8-1.7-48.1-34.9-48.1-34.9s-48.2 33.2-47.3 33.2 18.2-54.7 18.2-54.7L76.4 125z"
      />
      <Path fill="#118600" d="M0 396.4h744v99.7H0z" />
    </G>
  </Svg>
);
export default SvgTg;
