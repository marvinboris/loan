import * as React from 'react';
import Svg, { Defs, G, Path, Use } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgNz = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 640 480"
    {...props}
  >
    <Defs>
      <G id="nz_svg__b">
        <G id="nz_svg__a">
          <Path d="M0-.3v.5l1-.5z" />
          <Path d="M.2.3 0-.1l1-.2z" />
        </G>
        <Use xlinkHref="#nz_svg__a" transform="scale(-1 1)" />
        <Use xlinkHref="#nz_svg__a" transform="rotate(72 0 0)" />
        <Use xlinkHref="#nz_svg__a" transform="rotate(-72 0 0)" />
        <Use xlinkHref="#nz_svg__a" transform="scale(-1 1)rotate(72)" />
      </G>
    </Defs>
    <Path fill="#00247d" fillRule="evenodd" d="M0 0h640v480H0z" />
    <G transform="translate(-111 36.1)scale(.66825)">
      <Use
        xlinkHref="#nz_svg__b"
        width="100%"
        height="100%"
        fill="#fff"
        transform="translate(900 120)scale(45.4)"
      />
      <Use
        xlinkHref="#nz_svg__b"
        width="100%"
        height="100%"
        fill="#cc142b"
        transform="matrix(30 0 0 30 900 120)"
      />
    </G>
    <G transform="rotate(82 525.2 114.6)scale(.66825)">
      <Use
        xlinkHref="#nz_svg__b"
        width="100%"
        height="100%"
        fill="#fff"
        transform="rotate(-82 519 -457.7)scale(40.4)"
      />
      <Use
        xlinkHref="#nz_svg__b"
        width="100%"
        height="100%"
        fill="#cc142b"
        transform="rotate(-82 519 -457.7)scale(25)"
      />
    </G>
    <G transform="rotate(82 525.2 114.6)scale(.66825)">
      <Use
        xlinkHref="#nz_svg__b"
        width="100%"
        height="100%"
        fill="#fff"
        transform="rotate(-82 668.6 -327.7)scale(45.4)"
      />
      <Use
        xlinkHref="#nz_svg__b"
        width="100%"
        height="100%"
        fill="#cc142b"
        transform="rotate(-82 668.6 -327.7)scale(30)"
      />
    </G>
    <G transform="translate(-111 36.1)scale(.66825)">
      <Use
        xlinkHref="#nz_svg__b"
        width="100%"
        height="100%"
        fill="#fff"
        transform="translate(900 480)scale(50.4)"
      />
      <Use
        xlinkHref="#nz_svg__b"
        width="100%"
        height="100%"
        fill="#cc142b"
        transform="matrix(35 0 0 35 900 480)"
      />
    </G>
    <Path fill="#012169" d="M0 0h320v240H0z" />
    <Path
      fill="#fff"
      d="m37.5 0 122 90.5L281 0h39v31l-120 89.5 120 89V240h-40l-120-89.5L40.5 240H0v-30l119.5-89L0 32V0z"
    />
    <Path
      fill="#c8102e"
      d="M212 140.5 320 220v20l-135.5-99.5zm-92 10 3 17.5-96 72H0zM320 0v1.5l-124.5 94 1-22L295 0zM0 0l119.5 88h-30L0 21z"
    />
    <Path fill="#fff" d="M120.5 0v240h80V0zM0 80v80h320V80z" />
    <Path fill="#c8102e" d="M0 96.5v48h320v-48zM136.5 0v240h48V0z" />
  </Svg>
);
export default SvgNz;
