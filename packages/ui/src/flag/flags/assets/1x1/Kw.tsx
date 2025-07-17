import * as React from 'react';
import Svg, { Defs, ClipPath, Path, G } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgKw = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <Defs>
      <ClipPath id="kw_svg__a">
        <Path fillOpacity={0.7} d="M0 0h496v496H0z" />
      </ClipPath>
    </Defs>
    <G fillRule="evenodd" strokeWidth="1pt" clipPath="url(#kw_svg__a)" transform="scale(1.0321)">
      <Path fill="#fff" d="M0 165.3h992.1v165.4H0z" />
      <Path fill="#f31830" d="M0 330.7h992.1v165.4H0z" />
      <Path fill="#00d941" d="M0 0h992.1v165.4H0z" />
      <Path fill="#000001" d="M0 0v496l247.5-165.3.5-165.5z" />
    </G>
  </Svg>
);
export default SvgKw;
