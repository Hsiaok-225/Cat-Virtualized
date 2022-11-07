import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../context";

const Wrapper = styled.div``;

export default function Favorite() {
  const { user } = useContext(AuthContext);
  const navigator = useNavigate();

  useEffect(() => {
    if (!user) {
      navigator("/login");
    }
  }, []);

  return (
    <Wrapper>
      <div>Favorite</div>
    </Wrapper>
  );
}
