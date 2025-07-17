import * as React from 'react';
import Svg, { Defs, ClipPath, Path, G } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgIs = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" {...props}>
    <Defs>
      <ClipPath id="is_svg__a">
        <Path fillOpacity={0.7} d="M0 0h640v480H0z" />
      </ClipPath>
    </Defs>
    <G fillRule="evenodd" strokeWidth={0} clipPath="url(#is_svg__a)">
      <Path fill="#003897" d="M0 0h666.7v480H0z" />
      <Path fill="#fff" d="M0 186.7h186.7V0h106.6v186.7h373.4v106.6H293.3V480H186.7V293.3H0z" />
      <Path fill="#d72828" d="M0 213.3h213.3V0h53.4v213.3h400v53.4h-400V480h-53.4V266.7H0z" />
    </G>
  </Svg>
);
export default SvgIs;
