import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import ChatProvider from "./Context/chatProvider";
import 'antd/dist/reset.css';

import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <ChakraProvider>
      <ChatProvider>
        <App />
      </ChatProvider>
    </ChakraProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
