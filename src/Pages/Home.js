import React from "react";
import styled from "styled-components";

import Topbar from "../component/Topbar";
import Cat from "./Cat";

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto 30px;
  width: 956px;
`;

export default function Home() {
  return (
    <HomeWrapper>
      <Topbar />
      <Cat />
    </HomeWrapper>
  );
}
