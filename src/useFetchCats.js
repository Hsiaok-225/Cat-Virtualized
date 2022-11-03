import { useState, useEffect } from "react";
import axios from "axios";

export default function useFetchCats(pageNumber) {
  const [cats, setCats] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const divideCats = (arr, num) => {
    const res = [];
    for (let i = 0; i < arr.length; i += num) {
      const parts = arr.slice(i, i + num);
      res.push(parts);
    }
    return res;
  };

  useEffect(() => {
    // why setLoading here wrong ?
    if (pageNumber === 0) {
      const getCats = () => {
        axios(`https://cat-node-api.onrender.com/api/cats?`)
          .then((res) => {
            const divide = divideCats(res.data, 3);
            setCats(divide);
            setHasMore(res.data.length > 0);
            setLoading(false);
          })
          .catch(() => {
            setError(true);
            setLoading(false);
          });
      };
      getCats();
    } else {
      setLoading(true);
      const loadMoreCats = () => {
        axios(
          `https://cat-node-api.onrender.com/api/moreCats?pageNumber=${pageNumber}`
        )
          .then((res) => {
            const divide = divideCats([...res.data], 3);
            setCats([...cats, ...divide]);
            setHasMore(res.data.length > 0);
            setLoading(false);
          })
          .catch(() => {
            setError(true);
            setLoading(false);
          });
      };
      loadMoreCats();
    }
  }, [pageNumber]);

  return { cats, hasMore, loading, error };
}
