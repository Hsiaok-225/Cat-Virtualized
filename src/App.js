import { useEffect, useState } from "react";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";

import Globalstyle from "./Globalstyle";
import { CatContext, AuthContext } from "./context";
import Sidebar from "./component/Sidebar";
import Cat from "./Pages/Cat";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Favorite from "./Pages/Favorite";
import Home from "./Pages/Home";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

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
  const [user, setUser] = useState("test01");

  useEffect(() => {
    const user = localStorage.getItem("user") || null;
    if (user) {
      setUser(user);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <CatContext.Provider value={{ cats, setCats }}>
        <Globalstyle />
        <Router>
          <Wrapper>
            <Sidebar />
            <Routes>
              <Route index element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/favorite" element={<Favorite />} />
            </Routes>
          </Wrapper>
        </Router>
      </CatContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
