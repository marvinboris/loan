import * as React from 'react';
import Svg, { Path, G, Circle } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgEh = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <Path fill="#000001" d="M0 0h512v256H0z" />
    <Path fill="#007a3d" d="M0 256h512v256H0z" />
    <Path fill="#fff" d="M0 149.3h512v213.3H0z" />
    <Path fill="#c4111b" d="m0 0 256 256L0 512Z" />
    <G strokeWidth={1.7} transform="translate(-135 -6.5)scale(1.02539)">
      <Circle cx={512} cy={256} r={68.3} fill="#c4111b" />
      <Circle cx={537.6} cy={256} r={68.3} fill="#fff" />
      <Path
        fill="#c4111b"
        d="m493.7 297.3 29-20.8 29 21.2-10.8-34.2 29-21-35.8-.2-11-34-11.3 33.9-35.7-.1 28.7 21.2z"
      />
    </G>
  </Svg>
);
export default SvgEh;
