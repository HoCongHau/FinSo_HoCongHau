import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/layout/Header";
import TabCustom from "./components/tab-custom/TabCustom";

function App() {
  const [userName, setUserName] = useState("");
  return (
    <div className="App">
    <Header userName={(value) => setUserName(value)} />
    <TabCustom userName={userName}/>
  </div>
  );
}

export default App;
