import { Route } from "react-router-dom";
import "./App.css";

import ChatPage from "./Pages/ChatPage";
import HomePage from "./Pages/HomePage";
import SearchPage from "./Pages/SearchPage";

function App() {
  return (
    <div className="App">
      <Route path="/" component={HomePage} exact />
      <Route path="/chats" component={ChatPage} />
      <Route path="/news" component={SearchPage} />
    </div>
  );
}

export default App;
