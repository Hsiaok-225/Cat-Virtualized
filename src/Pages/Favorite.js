import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import { PORT } from "../constant/WEB_API";
import { AuthContext } from "../context";

import FavoriteCard from "../component/FavoriteCard";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const FavoriteBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Loading = styled.div`
  font-size: 32px;
  text-align: center;
  margin-top: 20px;
`;

export default function Favorite() {
  const { user } = useContext(AuthContext);
  const [favorite, setFavorite] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigator = useNavigate();

  useEffect(() => {
    if (!user) {
      navigator("/login");
    }
  }, []);

  useEffect(() => {
    console.log(favorite);
  }, [favorite]);

  //Getting favorite cats
  useEffect(() => {
    if (user) {
      setLoading(true);
      const handleGetFavorite = async () => {
        try {
          const res = await axios(`${PORT}/api/getFavorite?sub_id=${user}`);
          setFavorite(res.data);
          setLoading(false);
        } catch (err) {
          console.log(err);
          setLoading(false);
        }
      };
      handleGetFavorite();
    }
  }, [user]);

  return (
    <Wrapper>
      {loading && <Loading>Loading...</Loading>}
      <FavoriteBox>
        {favorite.map((card) => (
          <FavoriteCard card={card} />
        ))}
      </FavoriteBox>
    </Wrapper>
  );
}
