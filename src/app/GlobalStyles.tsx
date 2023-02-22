import Typography from "@/assets/styles/typography";
import { createGlobalStyle } from "styled-components";


const GlobalStyle = createGlobalStyle`
  /* @font-face {
    font-family: 'GeneralSans-Variable';
    src: url('/fonts/GeneralSans-Variable.woff2') format('woff2'),
        url('/fonts/GeneralSans-Variable.woff') format('woff'),
        url('/fonts/GeneralSans-Variable.ttf') format('truetype');
        font-weight: 200 700;
        font-display: swap;
        font-style: normal;
  } */

  @font-face {
    font-family: 'GeneralSans';
    src: url('/fonts/GeneralSans-Medium.woff2') format('woff2'),
        url('/fonts/GeneralSans-Medium.woff') format('woff'),
        url('/fonts/GeneralSans-Medium.ttf') format('truetype');
        font-weight: 500;
        font-display: swap;
        font-style: normal;
  }

  @font-face {
    font-family: 'GeneralSans';
    src: url('/fonts/GeneralSans-Semibold.woff2') format('woff2'),
        url('/fonts/GeneralSans-Semibold.woff') format('woff'),
        url('/fonts/GeneralSans-Semibold.ttf') format('truetype');
        font-weight: 600;
        font-display: swap;
        font-style: normal;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'GeneralSans', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    font-smooth: auto;
  }

  ${Typography}
`;

export default GlobalStyle;