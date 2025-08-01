import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";

// const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <QueryClientProvider client={queryClient}> */}
    <App />
    {/* <ReactQueryDevtools initialIsOpen={false} /> */}

    {/* </QueryClientProvider> */}
  </React.StrictMode>
);
