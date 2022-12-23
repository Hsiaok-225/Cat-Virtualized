import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";

import { PORT, BASE_URL, divideCats } from "../constant/WEB_API";
import { CatContext } from "../context";
import breeds from "../constant/breeds";
import Icons from "../icons";

const TopbarContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0px;
`;

const SearchItem = styled.div`
  font-size: 24px;
  width: 60px;

  padding: 4px 12px;
  margin-top: 12px;

  border: none;
  border-radius: 4px;
  color: black;
  cursor: pointer;

  :hover {
    background-color: rgba(0, 0, 0, 0.3);
    color: white;
  }
`;

const SearchTitle = styled(SearchItem)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  justify-content: center;
  width: 80px;
`;

const SearchBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const SearchBreeds = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

export default function Topbar() {
  const { cats, setCats } = useContext(CatContext);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(null);

  // get breed cats
  useEffect(() => {
    if (searchQuery) {
      console.log(`get ${searchQuery}`);
      setCats({ ...cats, cats: [], loading: true });
      axios(`${BASE_URL}/api/breeds/ids?breeds_ids=${searchQuery}`)
        .then((res) => {
          const divide = divideCats(res.data, 3);
          setCats({
            ...cats,
            cats: divide,
            isbreed: true,
            hasMore: res.data.length > 0,
            loading: false,
            pageNumber: 0,
          });
          setSearchQuery(null);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [searchQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.innerText);
  };

  const handleRandom = () => {
    console.log(`get random`);
    setCats({ ...cats, cats: [], loading: true });
    const getCats = () => {
      axios(`${BASE_URL}/api/cats?`)
        .then((res) => {
          const divide = divideCats(res.data, 3);
          setCats({
            ...cats,
            cats: divide,
            isbreed: false,
            hasMore: res.data.length > 0,
            loading: false,
          });
        })
        .catch(() => {});
    };
    getCats();
  };

  return (
    <TopbarContainer>
      <SearchBox>
        <SearchTitle onClick={handleRandom}>Random</SearchTitle>
        <SearchTitle onClick={() => setIsOpen(!isOpen)}>
          Breeds
          <Icons.ArrowDropdown />
        </SearchTitle>
      </SearchBox>
      {isOpen && (
        <SearchBreeds>
          {breeds.map((breed, index) => (
            <SearchItem key={index} onClick={handleSearch}>
              {breed}
            </SearchItem>
          ))}
        </SearchBreeds>
      )}
    </TopbarContainer>
  );
}
