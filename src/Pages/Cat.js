import React, {
  useContext,
  useCallback,
  useEffect,
  useState,
  useRef,
} from "react";
import axios from "axios";
import styled from "styled-components";

import {
  AutoSizer,
  List,
  CellMeasurer,
  CellMeasurerCache,
  WindowScroller,
} from "react-virtualized";
import { CatContext } from "../context";

import { PORT, BASE_URL, divideCats } from "../constant/WEB_API";
import SingleCat from "../component/SingleCat";
import CatCard from "../component/CatCard";

const ImgWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 956px;
`;

const RowCatWrapper = styled.div`
  display: flex;
  margin: auto;
  margin-bottom: 28px;

  div:last-child {
    margin-right: 0;
  }
`;

const Loading = styled.div`
  font-size: 32px;
  text-align: center;
  margin: 30px 0;
`;

const Error = styled.div`
  font-size: 32px;
  text-align: center;
  margin-top: 20px;
`;

export default function Cat() {
  const { cats, setCats } = useContext(CatContext);

  const [singleCat, setSingleCat] = useState(null);
  const [imageId, setImageId] = useState(null);

  const [breedInfo, setBreedInfo] = useState([]);
  const [catIndex, setCatIndex] = useState(null);
  const [rowIndex, setRowIndex] = useState(null);
  const [closeNextImg, setCloseNextImg] = useState(false);
  const [closePrevImg, setClosePrevImg] = useState(false);
  const [isScrollbar, setIsScrollbar] = useState(true);

  const cache = useRef(
    new CellMeasurerCache({
      fixedWidth: true,
    })
  );

  useEffect(() => {
    console.log(imageId);
  }, [imageId]);

  //get more random cats
  useEffect(() => {
    if (cats.pageNumber > 0 && !cats.isbreed) {
      console.log("get more");
      setCats({ ...cats, loading: true });
      const loadMoreCats = () => {
        axios(`${BASE_URL}/api/moreCats?pageNumber=${cats.pageNumber}`)
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

  // get random cats
  useEffect(() => {
    if (cats.cats.length === 0) {
      console.log("get init");
      setCats({ ...cats, loading: true });
      const getCats = () => {
        axios(`${BASE_URL}/api/cats?`)
          .then((res) => {
            const divide = divideCats(res.data, 3);
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
    }
  }, []);

  useEffect(() => {
    if (
      rowIndex === cats.cats.length - 1 &&
      catIndex === cats.cats[rowIndex].length - 1
    ) {
      setCloseNextImg(true);
    } else {
      setCloseNextImg(false);
    }
    if (rowIndex === 0 && catIndex === 0) {
      setClosePrevImg(true);
    } else {
      setClosePrevImg(false);
    }
    if (rowIndex !== null && catIndex !== null) {
      setBreedInfo(cats.cats[rowIndex][catIndex].breeds[0]);
    }
  }, [rowIndex, catIndex, cats.cats]);

  // open & close scroll bar
  useEffect(() => {
    const body = document.querySelector("body");
    body.style.overflow = isScrollbar ? "auto" : "hidden";
  }, [isScrollbar]);

  const observer = useRef();
  // function ????????? prop ????????????????????????????????????????????????
  const lastCatElementRef = useCallback(
    (node) => {
      if (cats.isbreed) return;
      if (cats.loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        // check loading state
        if (entries[0].isIntersecting && cats.hasMore) {
          setCats({ ...cats, pageNumber: (cats.pageNumber += 1) });
        }
      });
      if (node) observer.current.observe(node);
    },
    [cats.loading, cats.hasMore, cats.isbreed]
  );

  // rowPointer, catPointer
  const handleSingleCat = (cat, index) => {
    setIsScrollbar(false);

    // image_id
    setImageId(cat.id);

    setSingleCat(cat.url);
    setCatIndex(index);
    const findRowIndex = cats.cats.findIndex(
      (row) => row[index].url === cat.url
    );
    setRowIndex(findRowIndex);
  };

  const handleClose = () => {
    setSingleCat(null);
    setIsScrollbar(true);
    setCatIndex(null);
    setRowIndex(null);
  };

  //*setImageId
  // [0-n][0-2] first & last Image
  const handleNextimg = () => {
    setClosePrevImg(false);
    const nextCatIndex = catIndex < 2 ? catIndex + 1 : 0;
    const nextRowIndex =
      catIndex === 2 && rowIndex < cats.cats.length - 1
        ? rowIndex + 1
        : rowIndex;
    const newSingleCat = cats.cats[nextRowIndex][nextCatIndex].url;

    setCatIndex(nextCatIndex);
    setRowIndex(nextRowIndex);
    setSingleCat(newSingleCat);
    setImageId(cats.cats[nextRowIndex][nextCatIndex].id);
  };

  //*setImageId
  const handlePrevimg = () => {
    setCloseNextImg(false);
    const prevCatIndex = catIndex > 0 ? catIndex - 1 : 2;
    const prevRowIndex =
      catIndex === 0 && rowIndex > 0 ? rowIndex - 1 : rowIndex;
    const newSingleCat = cats.cats[prevRowIndex][prevCatIndex].url;

    setCatIndex(prevCatIndex);
    setRowIndex(prevRowIndex);
    setSingleCat(newSingleCat);
    setImageId(cats.cats[prevRowIndex][prevCatIndex].id);
  };
  return (
    <ImgWrapper>
      <WindowScroller>
        {({ height, isScrolling, scrollTop, registerChild }) => (
          <AutoSizer disableHeight>
            {({ width }) => (
              <div ref={registerChild}>
                <List
                  autoHeight
                  isScrolling={isScrolling}
                  scrollTop={scrollTop}
                  width={width}
                  height={height}
                  rowCount={cats.cats.length}
                  rowHeight={cache.current.rowHeight}
                  deferredMeasurementCache={cache.current}
                  rowRenderer={({ key, index, style, parent }) => {
                    const row = cats.cats[index];

                    if (index === cats.cats.length - 1) {
                      return (
                        <CellMeasurer
                          key={key}
                          cache={cache.current}
                          parent={parent}
                          columnIndex={0}
                          rowIndex={index}
                        >
                          {({ measure, registerChild }) => (
                            <div ref={registerChild} style={style}>
                              <RowCatWrapper ref={lastCatElementRef}>
                                {row.map((cat, index) => (
                                  <CatCard
                                    handleSingleCat={() =>
                                      // catIndex
                                      handleSingleCat(cat, index)
                                    }
                                    key={index}
                                    {...cat}
                                    measure={measure}
                                  />
                                ))}
                              </RowCatWrapper>
                            </div>
                          )}
                        </CellMeasurer>
                      );
                    } else {
                      return (
                        <CellMeasurer
                          key={key}
                          cache={cache.current}
                          parent={parent}
                          columnIndex={0}
                          rowIndex={index}
                        >
                          {({ measure, registerChild }) => (
                            <div ref={registerChild} style={style}>
                              <RowCatWrapper>
                                {row.map((cat, index) => (
                                  <CatCard
                                    handleSingleCat={() =>
                                      handleSingleCat(cat, index)
                                    }
                                    key={index}
                                    {...cat}
                                    measure={measure}
                                  />
                                ))}
                              </RowCatWrapper>
                            </div>
                          )}
                        </CellMeasurer>
                      );
                    }
                  }}
                />
              </div>
            )}
          </AutoSizer>
        )}
      </WindowScroller>
      {singleCat && (
        <SingleCat
          breedInfo={breedInfo}
          singleCat={singleCat}
          imageId={imageId}
          handleClose={handleClose}
          closeNextImg={closeNextImg}
          closePrevImg={closePrevImg}
          handleNextimg={() => handleNextimg()}
          handlePrevimg={() => handlePrevimg()}
        />
      )}
      {cats.loading && <Loading>Loading...</Loading>}
      {cats.error && <Error>some thing went wrong</Error>}
    </ImgWrapper>
  );
}
