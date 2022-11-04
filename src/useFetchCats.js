import { useState, useEffect, useContext } from "react";
import { CatContext } from "./context";
import axios from "axios";
import { PORT, BASE_URL, divideCats } from "./constant/WEB_API";

export default function useFetchCats() {
  const { cats, setCats } = useContext(CatContext);

  //get more random cats
  useEffect(() => {
    if (cats.pageNumber > 0) {
      console.log("load more");
      setCats({ ...cats, loading: true });
      const loadMoreCats = () => {
        axios(`${PORT}/api/moreCats?pageNumber=${cats.pageNumber}`)
          .then((res) => {
            const divide = divideCats([...res.data], 3);
            setCats({
              ...cats,
              cats: [...cats.cats, ...divide],
              hasMore: res.data.length > 0,
              loading: false,
            });
          })
          .catch(() => {
            setCats({
              ...cats,
              error: true,
              loading: false,
            });
          });
      };
      loadMoreCats();
    }
  }, [cats.pageNumber]);

  // *why setLoading here wrong ?
  // get random cats
  useEffect(() => {
    console.log("get");
    const getCats = () => {
      axios(`${PORT}/api/cats?`)
        .then((res) => {
          const divide = divideCats(res.data, 3);
          console.log(divide);
          setCats({
            ...cats,
            cats: divide,
            hasMore: res.data.length > 0,
            loading: false,
          });
        })
        .catch(() => {
          setCats({
            ...cats,
            error: true,
            loading: false,
          });
        });
    };
    getCats();
  }, []);
}
