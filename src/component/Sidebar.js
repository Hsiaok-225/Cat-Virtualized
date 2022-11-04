import React, { useState, useEffect, useContext } from "react";

import styled from "styled-components";
import axios from "axios";
import Icons from "../icons";

import { PORT, BASE_URL, divideCats } from "../constant/WEB_API";
import breeds from "../constant/breeds";
import { CatContext } from "../context";

const Container = styled.div`
  display: flex;
  flex-direction: column;

  position: sticky;
  top: 0;

  width: 200px;
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

const AllBreeds = styled(SidebarOption)`
  margin-left: 16px;
`;

export default function Sidebar() {
  const { cats, setCats } = useContext(CatContext);

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(null);

  // get breed cats, but not load random cats -> set pageNumber=0
  useEffect(() => {
    if (searchQuery) {
      setCats({ ...cats, loading: true });
      console.log(`get ${searchQuery}`);
      axios(`${BASE_URL}/api/breeds/ids?breeds_ids=${searchQuery}`)
        .then((res) => {
          const divide = divideCats(res.data, 3);
          console.log(divide);
          setCats({
            ...cats,
            cats: divide,
            isbreed: true,
            hasMore: res.data.length > 0,
            loading: false,
            pageNumber: 0,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [searchQuery]);

  // get Allbreeds
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  // setBreedsCats here
  const handleSearch = (e) => {
    setSearchQuery(e.target.innerText);
  };

  const handleRandom = () => {
    setSearchQuery(null);
    setCats({ ...cats, loading: true });
    // get random & setLoading, hasMore -> so,we need to use store
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
    <Container>
      <SidebarWithIcon>
        Login
        <Icons.OctCat />
      </SidebarWithIcon>
      {/* click -> favorite page */}
      <SidebarOption>Favorite</SidebarOption>
      {/* click -> setCats(fetch random) */}
      <SidebarOption onClick={handleRandom}>Random</SidebarOption>
      <SidebarWithIcon onClick={handleClick}>
        Breeds
        <Icons.ArrowDropdown />
      </SidebarWithIcon>
      {isOpen &&
        breeds.map((option, index) => (
          <AllBreeds key={index} onClick={handleSearch}>
            {option}
          </AllBreeds>
        ))}
    </Container>
  );
}
