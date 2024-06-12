import { RouterProvider } from "react-router-dom";
import "./App.css";
import GlobalStyle from "./GlobalStyle";
import QueryProvider from "./query/queryClient";
import router from "./routes/router";

function App() {
  return (
    <QueryProvider>
      <GlobalStyle />
      <RouterProvider router={router} />
    </QueryProvider>
  );
}

export default App;
