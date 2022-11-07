import styled from "styled-components";
import Icons from "../icons";

const Modal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 500px;
  max-height: 700px;
`;

const ImageBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: black;
  width: 500px;
  height: 600px;

  img {
    width: 100%;
    height: 100%;
    max-height: 520px;
    padding: 24px;

    object-fit: cover;
    object-position: center;
  }
`;

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 200px;
  background-color: white;
  padding: 20px;
  box-sizing: border-box;
`;

const InfoTitle = styled.div`
  font-weight: bold;

  a {
    text-decoration: none;
  }
`;

const InfoDesc = styled.div`
  margin-top: 12px;
`;

const CloseButton = styled.div`
  font-size: 32px;
  color: white;
  position: fixed;
  right: 30px;
  top: 20px;
  cursor: pointer;
`;

const NextImgBtn = styled.div`
  font-size: 32px;
  color: white;
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
`;

const PrevImgBtn = styled.div`
  font-size: 32px;
  color: white;
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  left: 20px;
`;

export default function SingleCat({
  breedInfo,
  singleCat,
  handleClose,
  handleNextimg,
  handlePrevimg,
  closeNextImg,
  closePrevImg,
}) {
  // *set favorite

  return (
    <Modal>
      <CardWrapper>
        <ImageBox>
          <img src={singleCat} alt="img" />
        </ImageBox>
        <CardInfo>
          <InfoTitle>
            <a href={breedInfo.wikipedia_url} target="blank" alt="#">
              {breedInfo.name}_WIKI
            </a>
          </InfoTitle>
          <InfoDesc>{breedInfo.description}</InfoDesc>
        </CardInfo>
      </CardWrapper>
      <CloseButton onClick={handleClose}>x</CloseButton>
      {!closeNextImg && (
        <NextImgBtn onClick={handleNextimg}>
          <Icons.RightArrow />
        </NextImgBtn>
      )}
      {!closePrevImg && (
        <PrevImgBtn onClick={handlePrevimg}>
          <Icons.LeftArrow />
        </PrevImgBtn>
      )}
    </Modal>
  );
}
