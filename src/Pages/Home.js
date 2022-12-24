import React from "react";
import styled from "styled-components";

import Topbar from "../component/Topbar";
import Cat from "./Cat";

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 956px;
  margin: auto;
  align-items: center;
  overflow-y: auto;
`;

export default function Home() {
  return (
    <HomeWrapper>
      <Topbar />
      <Cat />
    </HomeWrapper>
  );
}
