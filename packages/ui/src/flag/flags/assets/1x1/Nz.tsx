import * as React from 'react';
import Svg, { Defs, G, Path, Use } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgNz = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 512 512"
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
    <Path fill="#00247d" fillRule="evenodd" d="M0 0h512v512H0z" />
    <G transform="translate(-148.7 90.5)scale(.60566)">
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
    <G transform="rotate(82 418.7 105.1)scale(.60566)">
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
    <G transform="rotate(82 418.7 105.1)scale(.60566)">
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
    <G transform="translate(-148.7 90.5)scale(.60566)">
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
    <Path fill="#012169" d="M0 0h256v256H0z" />
    <Path
      fill="#fff"
      d="M256 0v32l-95 96 95 93.5V256h-33.5L127 162l-93 94H0v-34l93-93.5L0 37V0h31l96 94 93-94z"
    />
    <Path
      fill="#c8102e"
      d="m92 162 5.5 17L21 256H0v-1.5zm62-6 27 4 75 73.5V256zM256 0l-96 98-2-22 75-76zM0 .5 96.5 95 67 91 0 24.5z"
    />
    <Path fill="#fff" d="M88 0v256h80V0zM0 88v80h256V88z" />
    <Path fill="#c8102e" d="M0 104v48h256v-48zM104 0v256h48V0z" />
  </Svg>
);
export default SvgNz;
