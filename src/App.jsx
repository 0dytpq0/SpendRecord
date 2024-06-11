import { RouterProvider } from "react-router-dom";
import styled from "styled-components";
import "./App.css";
import GlobalStyle from "./GlobalStyle";
import router from "./routes/router";

function App() {
  return (
    <Div>
      <GlobalStyle />
      <RouterProvider router={router} />
    </Div>
  );
}

const Div = styled.div`
  width: 100%;
  height: 97vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default App;
