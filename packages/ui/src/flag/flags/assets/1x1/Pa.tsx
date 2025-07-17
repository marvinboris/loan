import * as React from 'react';
import Svg, { Defs, ClipPath, Path, G } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgPa = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <Defs>
      <ClipPath id="pa_svg__a">
        <Path fillOpacity={0.7} d="M0 0h512v512H0z" />
      </ClipPath>
    </Defs>
    <G fillRule="evenodd" clipPath="url(#pa_svg__a)">
      <Path fill="#fff" d="M-26-25h592.5v596H-26z" />
      <Path fill="#db0000" d="M255.3-20.4h312.1v275.2h-312z" />
      <Path
        fill="#0000ab"
        d="M-54.5 254.8h309.9V571H-54.5zM179 181.6l-46.5-29.2-46.2 29.5 17.2-48-46.2-29.6 57.1-.4 17.7-47.8 18.1 47.7h57.1l-45.9 30z"
      />
      <Path
        fill="#d80000"
        d="m435.2 449-46.4-29.2-46.3 29.5 17.2-48-46.2-29.5 57.2-.4 17.7-47.8 18 47.7h57.2l-46 30z"
      />
    </G>
  </Svg>
);
export default SvgPa;
