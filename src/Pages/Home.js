import React from "react";
import styled from "styled-components";

import Topbar from "../component/Topbar";
import Cat from "./Cat";

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  margin-left: 200px;
`;

export default function Home() {
  return (
    <HomeWrapper>
      <Topbar />
      <Cat />
    </HomeWrapper>
  );
}
