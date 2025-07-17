import * as React from 'react';
import Svg, { Defs, ClipPath, Path, G } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgFo = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <Defs>
      <ClipPath id="fo_svg__a">
        <Path fillOpacity={0.7} d="M0 0h512v512H0z" />
      </ClipPath>
    </Defs>
    <G fillRule="evenodd" strokeWidth={0} clipPath="url(#fo_svg__a)">
      <Path fill="#fff" d="M-78 0h708.2v512H-78z" />
      <Path
        fill="#003897"
        d="M-75.9 199.1h198.3V0h113.3v199.1h396.6V313H235.7v199H122.4V312.9H-76z"
      />
      <Path
        fill="#d72828"
        d="M-75.9 227.6h226.6V0h56.7v227.6h424.9v56.9h-425V512h-56.6V284.4H-75.9z"
      />
    </G>
  </Svg>
);
export default SvgFo;
