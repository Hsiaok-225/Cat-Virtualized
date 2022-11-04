import React from "react";
import Cat from "../Cat";
import Sidebar from "../component/Sidebar";
import styled from "styled-components";

const HomePage = styled.div`
  display: flex;
  flex-direction: row;
`;

export default function Home() {
  return (
    <HomePage>
      <Sidebar />
      <Cat />
    </HomePage>
  );
}
