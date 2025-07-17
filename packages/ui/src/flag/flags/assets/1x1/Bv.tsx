import * as React from 'react';
import Svg, { Defs, ClipPath, Path, G } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgBv = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <Defs>
      <ClipPath id="bv_svg__a">
        <Path fillOpacity={0.7} d="M0 0h512v512H0z" />
      </ClipPath>
    </Defs>
    <G fillRule="evenodd" strokeWidth="1pt" clipPath="url(#bv_svg__a)">
      <Path fill="#fff" d="M-68 0h699.7v512H-68z" />
      <Path
        fill="#d72828"
        d="M-93-77.8h218.7v276.2H-93zM249.4-.6h381v199h-381zM-67.6 320h190.4v190.3H-67.5zm319.6 2.1h378.3v188.2H252z"
      />
      <Path fill="#003897" d="M156.7-25.4H221v535.7h-64.5z" />
      <Path fill="#003897" d="M-67.5 224.8h697.8v63.5H-67.5z" />
    </G>
  </Svg>
);
export default SvgBv;
