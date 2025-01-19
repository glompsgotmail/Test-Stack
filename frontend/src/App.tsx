// src/App.tsx

import React from "react";
import Registration from "./components/registration";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Welcome to SkillSwap</h1>
      <Registration />
    </div>
  );
};

export default App;
