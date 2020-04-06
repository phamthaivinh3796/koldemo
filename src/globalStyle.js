import { createGlobalStyle } from "styled-components";
import "font-awesome/css/font-awesome.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-daterangepicker/daterangepicker.css";

export const GlobalStyle = createGlobalStyle`

@import url('https://fonts.googleapis.com/css?family=Nunito&display=swap');

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
}
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
	display: block;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
@charset "UTF-8";

html {
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
  line-height: 1.15;
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  -webkit-tap-highlight-color: transparent;
  overflow-y: auto;
}

*, *::before, *::after {
  box-sizing: inherit;
}

body::-webkit-scrollbar {
    background-color: transparent;
    width: 8px
}

body::-webkit-scrollbar-track {
  background-color: transparent;
}

body::-webkit-scrollbar-thumb {
    background-color:#babac0;
    border-radius: 8px;
}

body::-webkit-scrollbar-button {
  display:none
}


div::-webkit-scrollbar {
  background-color: transparent;
  width: 8px
}

div::-webkit-scrollbar-track {
background-color: transparent;
}

div::-webkit-scrollbar-thumb {
  background-color:#babac0;
  border-radius: 8px;
}

div::-webkit-scrollbar-button {
display:none
}

@-ms-viewport {
  width: device-width;
}

body {
  margin: 0;
  font-weight: normal;
  line-height: 1.5;
  color: #333333;
  width: 100%;
  padding-top: 50px;
  background: #1e2330 !important;
  font-family: 'Nunito', '' !important;
}

.ripple {
  background-position: center;
  transition: background 0.5s;
}
.ripple:hover {
  background: #333d53 radial-gradient(circle, transparent 1%, #333d53 1%) center/15000%;
}
.ripple:active {
  background-color: #6eb9f7;
  background-size: 100%;
  transition: background 0s;
}
.body-form {
        padding: 20px;

        .btn-next {
            width: 100%;
            border-radius: 0px;
        }

        .btn-date {
          display: block;
          width: 100%;
          height: calc(1.5em + .75rem + 2px);
          padding: .375rem .75rem;
          font-size: 1rem;
          font-weight: 400;
          line-height: 1.5;
          color: #495057;
          background-color: #fff;
          background-clip: padding-box;
          border: 1px solid #ced4da;
          border-radius: .25rem;
          transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
        }

        .error {
          border: 1px solid red;
          border-radius: .25rem;
        }
    }
`;
