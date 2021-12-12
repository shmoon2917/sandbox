import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    box-sizing: border-box;

    font-family: 'Noto Sans KR';
    font-style: normal;

    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
  }

  :root {
      font-size: 16px;
  }

  html,
  body {
    position: relative;
    max-width: 100%;
    min-height: 100vh;

    margin: 0;
    padding: 0;
  }

  a,
  a:active,
  a:link,
  a:visited {
    text-decoration: none;
    color: unset;
    -webkit-tap-highlight-color: transparent;
  }

  button {
    background-color: unset;
    cursor: pointer;

    &:focus {
      outline: none;
      box-shadow: none;
    }
  }

  ul, ol, li, a, input, select, textarea {margin: 0;padding: 0; border: 0 none; }

  ul,
  ol,
  li {
    list-style: none;
  }
`;
