import * as React from 'react';
import Svg, { Defs, ClipPath, Path, G } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgFo = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" {...props}>
    <Defs>
      <ClipPath id="fo_svg__a">
        <Path fillOpacity={0.7} d="M-78 32h640v480H-78z" />
      </ClipPath>
    </Defs>
    <G fillRule="evenodd" strokeWidth={0} clipPath="url(#fo_svg__a)" transform="translate(78 -32)">
      <Path fill="#fff" d="M-78 32h663.9v480H-78z" />
      <Path
        fill="#003897"
        d="M-76 218.7h185.9V32H216v186.7h371.8v106.6H216V512H109.9V325.3h-186z"
      />
      <Path fill="#d72828" d="M-76 245.3h212.4V32h53.1v213.3H588v53.4H189.5V512h-53V298.7H-76z" />
    </G>
  </Svg>
);
export default SvgFo;
