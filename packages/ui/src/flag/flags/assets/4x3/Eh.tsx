import * as React from 'react';
import Svg, { Defs, ClipPath, Path, G, Circle } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgEh = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" {...props}>
    <Defs>
      <ClipPath id="eh_svg__a">
        <Path fillOpacity={0.7} d="M-158.7 0H524v512h-682.7z" />
      </ClipPath>
    </Defs>
    <G fillRule="evenodd" clipPath="url(#eh_svg__a)" transform="translate(148.8)scale(.94)">
      <Path fill="#000001" d="M-158.3 0h680.9v255.3h-680.9z" />
      <Path fill="#007a3d" d="M-158.3 255.3h680.9v255.3h-680.9z" />
      <Path fill="#fff" d="M-158.3 148.9h680.9v212.8h-680.9z" />
      <Path fill="#c4111b" d="m-158.3 0 340.4 255.3-340.4 255.3Z" />
      <Circle cx={352.3} cy={255.3} r={68.1} fill="#c4111b" />
      <Circle cx={377.9} cy={255.3} r={68.1} fill="#fff" />
      <Path
        fill="#c4111b"
        d="m334 296.5 29.1-20.7 28.8 21-10.8-34 29-20.9-35.7-.2-11-34-11.2 33.9-35.7-.2 28.7 21.2-11.1 34z"
      />
    </G>
  </Svg>
);
export default SvgEh;
