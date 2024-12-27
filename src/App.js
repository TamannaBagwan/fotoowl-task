
import React from "react";
import { ChatProvider } from "./context/ChatContext";  
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <ChatProvider>
      <div className="App">
        <Dashboard />
      </div>
    </ChatProvider>
  );
}

export default App;
