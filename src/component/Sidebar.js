import React, { useContext } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
import Icons from "../icons";

import { AuthContext } from "../context";

// random & breeds 移到 Home Topbar

const Container = styled.div`
  display: flex;
  flex-direction: column;

  position: sticky;
  top: 0;

  min-width: 200px;
  padding: 24px;
  height: 100vh;
  border-right: 1px solid rgba(0, 0, 0, 0.2);
  overflow-y: scroll;
`;

const SidebarOption = styled.div`
  font-size: 32px;
  width: 100%;
  margin-top: 8px;
  padding: 6px;
  border-radius: 8px;

  cursor: pointer;
  :hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

const SidebarWithIcon = styled(SidebarOption)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export default function Sidebar() {
  const { user } = useContext(AuthContext);

  return (
    <Container>
      {user && <SidebarOption>Hi! {user}</SidebarOption>}
      {!user && (
        <Link to="/login">
          <SidebarWithIcon>
            Login
            <Icons.OctCat />
          </SidebarWithIcon>
        </Link>
      )}
      <Link to="/">
        <SidebarOption>Home</SidebarOption>
      </Link>
      <Link to="/favorite">
        <SidebarOption>Favorite</SidebarOption>
      </Link>
    </Container>
  );
}
