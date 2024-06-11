import { RouterProvider } from "react-router-dom";
import styled from "styled-components";
import "./App.css";
import GlobalStyle from "./GlobalStyle";
import QueryProvider from "./query/queryClient";
import router from "./routes/router";

function App() {
  return (
    <QueryProvider>
      <Div>
        <GlobalStyle />
        <RouterProvider router={router} />
      </Div>
    </QueryProvider>
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
