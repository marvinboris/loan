import * as React from 'react';
import Svg, { Defs, ClipPath, Path, G } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgIs = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <Defs>
      <ClipPath id="is_svg__a">
        <Path fillOpacity={0.7} d="M85.4 0h486v486h-486z" />
      </ClipPath>
    </Defs>
    <G
      fillRule="evenodd"
      strokeWidth={0}
      clipPath="url(#is_svg__a)"
      transform="translate(-90)scale(1.0535)"
    >
      <Path fill="#003897" d="M0 0h675v486H0z" />
      <Path fill="#fff" d="M0 189h189V0h108v189h378v108H297v189H189V297H0z" />
      <Path fill="#d72828" d="M0 216h216V0h54v216h405v54H270v216h-54V270H0z" />
    </G>
  </Svg>
);
export default SvgIs;
