import { createGlobalStyle } from "styled-components";


const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'GeneralSans-Variable';
    src: url('/fonts/GeneralSans-Variable.woff2') format('woff2'),
        url('/fonts/GeneralSans-Variable.woff') format('woff'),
        url('/fonts/GeneralSans-Variable.ttf') format('truetype');
        font-weight: 200 700;
        font-display: swap;
        font-style: normal;
  }


  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    /* font-family: ; */
    -webkit-font-smoothing: antialiased;
    font-smooth: auto;
  }
`;

export default GlobalStyle;