import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 300px;
  height: 300px;
  margin-right: 28px;

  cursor: pointer;
  position: relative;

  div:hover {
    opacity: 1;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

const CatInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-size: 20px;

  background-color: rgba(0, 0, 0, 0.3);
  color: white;

  z-index: 999;
  position: absolute;
  inset: 0;
  opacity: 0;

  div {
    margin-top: 12px;
  }
`;

const InfoName = styled.div`
  font-size: 24px;
`;
const InfoContentText = styled.div`
  font-size: 16px;
  margin-top: 12px;
`;

export default function CatCard({ url, breeds, handleSingleCat, measure }) {
  return (
    <Wrapper onClick={handleSingleCat}>
      <img src={url} alt="img" onLoad={measure} />
      <CatInfo>
        <InfoName>{breeds[0].name}</InfoName>
        <InfoContentText>{breeds[0].origin}</InfoContentText>
        <InfoContentText>{breeds[0].life_span}</InfoContentText>
      </CatInfo>
    </Wrapper>
  );
}

// onClick={() => handleSingleCat(cat, index)} key={index}
