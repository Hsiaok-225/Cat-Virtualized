import React, { useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";

import Icons from "../icons";
import { PORT } from "../constant/WEB_API";
import { AuthContext } from "../context";

const FavoriteCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 420px;
  border: 1px solid lightgrey;

  margin: 40px;

  position: relative;
`;

const FavoriteCatId = styled.div`
  margin-top: 12px;
  margin-left: 12px;
`;

const FavoriteCatImage = styled.img`
  height: 300px;
  object-fit: cover;
  object-position: center;
`;

const IconsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 12px;
  cursor: pointer;

  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 12px;
`;

export default function FavoriteCard({ card }) {
  const { user } = useContext(AuthContext);
  const [isLike, setIsLike] = useState(true);

  const handleRemoveFavorite = async (id) => {
    setIsLike(false);
    const favouriteId = id;
    try {
      const res = await axios.delete(
        `${PORT}/api/deleteFavorite?favouriteId=${favouriteId}`
      );
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddFavorite = async (id) => {
    setIsLike(true);
    const image_id = id;
    try {
      const response = await axios.post(`${PORT}/api/createFavorite`, {
        image_id,
        sub_id: user,
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <FavoriteCardWrapper>
      <FavoriteCatImage src={card?.image.url} />
      <FavoriteCatId>id: {card?.id}</FavoriteCatId>
      <FavoriteCatId>{card?.created_at}</FavoriteCatId>
      {!isLike && (
        <IconsWrapper onClick={() => handleAddFavorite(card.image_id)}>
          <Icons.Dislike size="30px" />
        </IconsWrapper>
      )}
      {isLike && (
        <IconsWrapper onClick={() => handleRemoveFavorite(card.id)}>
          <Icons.Like size="30px" />
        </IconsWrapper>
      )}
    </FavoriteCardWrapper>
  );
}
