import { useState, useEffect } from "react";
import Globalstyle from "./Globalstyle";
import { CatContext } from "./context";

import Home from "./Pages/Home";

const initialState = {
  cats: [],
  isbreed: false,
  pageNumber: 0,
  hasMore: false,
  loading: false,
  error: false,
};

function App() {
  const [cats, setCats] = useState(initialState);

  return (
    <>
      <Globalstyle />
      <CatContext.Provider value={{ cats, setCats }}>
        <Home />
      </CatContext.Provider>
    </>
  );
}

export default App;
