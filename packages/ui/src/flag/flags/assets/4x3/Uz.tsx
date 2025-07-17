import * as React from 'react';
import Svg, { Path, Circle, G, Use } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgUz = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 640 480"
    {...props}
  >
    <Path fill="#1eb53a" d="M0 320h640v160H0z" />
    <Path fill="#0099b5" d="M0 0h640v160H0z" />
    <Path fill="#ce1126" d="M0 153.6h640v172.8H0z" />
    <Path fill="#fff" d="M0 163.2h640v153.6H0z" />
    <Circle cx={134.4} cy={76.8} r={57.6} fill="#fff" />
    <Circle cx={153.6} cy={76.8} r={57.6} fill="#0099b5" />
    <G fill="#fff" transform="translate(261.1 122.9)scale(1.92)">
      <G id="uz_svg__e">
        <G id="uz_svg__d">
          <G id="uz_svg__c">
            <G id="uz_svg__b">
              <Path id="uz_svg__a" d="M0-6-1.9-.3 1 .7" />
              <Use xlinkHref="#uz_svg__a" width="100%" height="100%" transform="scale(-1 1)" />
            </G>
            <Use xlinkHref="#uz_svg__b" width="100%" height="100%" transform="rotate(72)" />
          </G>
          <Use xlinkHref="#uz_svg__b" width="100%" height="100%" transform="rotate(-72)" />
          <Use xlinkHref="#uz_svg__c" width="100%" height="100%" transform="rotate(144)" />
        </G>
        <Use xlinkHref="#uz_svg__d" width="100%" height="100%" y={-24} />
        <Use xlinkHref="#uz_svg__d" width="100%" height="100%" y={-48} />
      </G>
      <Use xlinkHref="#uz_svg__e" width="100%" height="100%" x={24} />
      <Use xlinkHref="#uz_svg__e" width="100%" height="100%" x={48} />
      <Use xlinkHref="#uz_svg__d" width="100%" height="100%" x={-48} />
      <Use xlinkHref="#uz_svg__d" width="100%" height="100%" x={-24} />
      <Use xlinkHref="#uz_svg__d" width="100%" height="100%" x={-24} y={-24} />
    </G>
  </Svg>
);
export default SvgUz;
