import React, { useContext } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
import Icons from "../icons";

import { AuthContext } from "../context";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 200px;
  padding: 24px;
  height: 100%;
  border-right: 1px solid rgba(0, 0, 0, 0.2);
  overflow-y: none;
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
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    setUser(null);
  };

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
      {user && <SidebarOption onClick={handleLogout}>Log out</SidebarOption>}
    </Container>
  );
}
