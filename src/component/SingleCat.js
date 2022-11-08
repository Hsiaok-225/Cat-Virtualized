import axios from "axios";
import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { PORT } from "../constant/WEB_API";
import { AuthContext } from "../context";
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

const CardTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  position: relative;

  a:hover {
    color: palevioletred;
  }
`;

const FavoriteButton = styled.div`
  align-items: center;
  border: 1px solid lightgrey;
  border-radius: 8px;
  padding: 6px 12px;
  width: auto;

  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const FavoriteSuccess = styled.div`
  align-items: center;
  background-color: palevioletred;
  color: white;
  border-radius: 8px;
  padding: 6px 12px;
  width: auto;

  position: absolute;
  right: 0;
  top: -40px;
`;

const InfoTitle = styled.div`
  font-weight: bold;

  a {
    font-size: 20px;
    color: blue;
  }
`;

const InfoDesc = styled.div`
  margin-top: 20px;
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
  imageId,
}) {
  const [isSuccess, setIsSuccess] = useState(false);
  const { user } = useContext(AuthContext);

  // useEffect(() => {
  //   console.log(like);
  // }, []);

  // Create Favorites
  const handleLike = async () => {
    try {
      const res = await axios.post(`${PORT}/api/createFavorite`, {
        image_id: imageId,
        sub_id: user,
      });
      console.log(res.data);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal>
      {/* {cat.map} */}
      <CardWrapper>
        <ImageBox>
          <img src={singleCat} alt="img" />
        </ImageBox>
        <CardInfo>
          <CardTitle>
            <InfoTitle>
              <a href={breedInfo.wikipedia_url} target="blank" alt="#">
                {breedInfo.name}_WIKI
              </a>
            </InfoTitle>
            {isSuccess && <FavoriteSuccess>Success!</FavoriteSuccess>}
            <FavoriteButton onClick={handleLike}>
              Add to Favorite
            </FavoriteButton>
          </CardTitle>
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
