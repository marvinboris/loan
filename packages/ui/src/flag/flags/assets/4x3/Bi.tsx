import * as React from 'react';
import Svg, { Defs, ClipPath, Path, G } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgBi = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" {...props}>
    <Defs>
      <ClipPath id="bi_svg__a">
        <Path fillOpacity={0.7} d="M-90.5 0H592v512H-90.5z" />
      </ClipPath>
    </Defs>
    <G fillRule="evenodd" clipPath="url(#bi_svg__a)" transform="translate(84.9)scale(.9375)">
      <Path fill="#18b637" d="m-178 0 428.8 256L-178 512zm857.6 0L250.8 256l428.8 256z" />
      <Path fill="#cf0921" d="m-178 0 428.8 256L679.6 0zm0 512 428.8-256 428.8 256z" />
      <Path fill="#fff" d="M679.6 0h-79.9L-178 464.3V512h79.9L679.6 47.7z" />
      <Path fill="#fff" d="M398.9 256a148 148 0 1 1-296.1 0 148 148 0 0 1 296 0z" />
      <Path fill="#fff" d="M-178 0v47.7L599.7 512h79.9v-47.7L-98.1 0z" />
      <Path
        fill="#cf0921"
        stroke="#18b637"
        strokeWidth={3.9}
        d="m280 200.2-19.3.3-10 16.4-9.9-16.4-19.2-.4 9.3-16.9-9.2-16.8 19.2-.4 10-16.4 9.9 16.5 19.2.4-9.3 16.8zm-64.6 111.6-19.2.3-10 16.4-9.9-16.4-19.2-.4 9.3-16.9-9.2-16.8 19.2-.4 10-16.4 9.9 16.5 19.2.4-9.3 16.8zm130.6 0-19.2.3-10 16.4-10-16.4-19.1-.4 9.3-16.9-9.3-16.8 19.2-.4 10-16.4 10 16.5 19.2.4-9.4 16.8z"
      />
    </G>
  </Svg>
);
export default SvgBi;
