import { createGlobalStyle } from "styled-components";

const Globalstyle = createGlobalStyle`
 * {
    margin: 0;
    padding: 0;

    a {
      text-decoration: none;
      color: black;
    }
 }  
 
  ::-webkit-scrollbar {
     width: 7px;
   }
 
   ::-webkit-scrollbar-button {
     background: transparent;
   }
   
   ::-webkit-scrollbar-track-piece {
     background: transparent;
   }
 
   ::-webkit-scrollbar-thumb {
     border-radius: 4px;
     background-color: rgba(0, 0, 0, 0.3);
   }
 
   ::-webkit-scrollbar-track {
     box-shadow: transparent;
   }
`;

export default Globalstyle;
