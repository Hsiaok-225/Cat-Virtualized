import React from "react";
import { useCallback, useEffect, useState, useRef } from "react";
import useFetchCats from "./useFetchCats";
import styled from "styled-components";
import SingleCat from "./component/SingleCat";
import CatCard from "./component/CatCard";
import {
  AutoSizer,
  List,
  CellMeasurer,
  CellMeasurerCache,
  WindowScroller,
} from "react-virtualized";

// *Pointer update
// *useCallback update when dependency change?
// *useCallback dependency meaning?

// placeholder & favorite

// favorite function

// {
//   "image_id":"id of the image",
//   "sub_id":"optional unique id of your user"
// }

// search function

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto 30px;
  width: 100%;
  max-width: 956px;
`;

const ImgWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-top: 28px;
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
  margin-top: 20px;
`;

const Error = styled.div`
  font-size: 32px;
  text-align: center;
  margin-top: 20px;
`;

export default function Cat() {
  const [pageNumber, setPageNumber] = useState(0);
  const [singleCat, setSingleCat] = useState(null);
  const [breeds, setBreeds] = useState(null);
  const [catIndex, setCatIndex] = useState(0);
  const [rowIndex, setRowIndex] = useState(0);
  const [closeNextImg, setCloseNextImg] = useState(false);
  const [closePrevImg, setClosePrevImg] = useState(false);
  const [isScrollbar, setIsScrollbar] = useState(true);
  const { cats, hasMore, loading, error } = useFetchCats(pageNumber);

  const cache = useRef(
    new CellMeasurerCache({
      fixedWidth: true,
    })
  );

  useEffect(() => {
    if (rowIndex === cats.length - 1 && catIndex === 2) {
      setCloseNextImg(true);
    } else {
      setCloseNextImg(false);
    }
    if (rowIndex === 0 && catIndex === 0) {
      setClosePrevImg(true);
    } else {
      setClosePrevImg(false);
    }
    if (cats.length > 0) {
      setBreeds(cats[rowIndex][catIndex].breeds[0]);
    }
  }, [catIndex, rowIndex, cats]);

  // open & close scroll bar
  useEffect(() => {
    const body = document.querySelector("body");
    body.style.overflow = isScrollbar ? "auto" : "hidden";
  }, [isScrollbar]);

  const observer = useRef();
  const lastCatElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        // check loading state
        if (entries[0].isIntersecting && hasMore) {
          console.log("setpage number", pageNumber);
          setPageNumber(pageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  // rowPointer, catPointer
  const handleSingleCat = (cat, index) => {
    setIsScrollbar(false);

    setSingleCat(cat.url);
    setCatIndex(index);
    const findRowIndex = cats.findIndex((row) => row[index].url === cat.url);
    setRowIndex(findRowIndex);
  };

  const handleClose = () => {
    setSingleCat(null);
    setIsScrollbar(true);
  };

  // [0-n][0-2] first & last Image
  const handleNextimg = () => {
    setClosePrevImg(false);
    const nextCatIndex = catIndex < 2 ? catIndex + 1 : 0;
    const nextRowIndex =
      catIndex === 2 && rowIndex < cats.length - 1 ? rowIndex + 1 : rowIndex;
    const newSingleCat = cats[nextRowIndex][nextCatIndex].url;

    setCatIndex(nextCatIndex);
    setRowIndex(nextRowIndex);
    setSingleCat(newSingleCat);
  };
  const handlePrevimg = () => {
    setCloseNextImg(false);
    const prevCatIndex = catIndex > 0 ? catIndex - 1 : 2;
    const prevRowIndex =
      catIndex === 0 && rowIndex > 0 ? rowIndex - 1 : rowIndex;
    console.log(prevRowIndex, prevCatIndex);
    const newSingleCat = cats[prevRowIndex][prevCatIndex].url;

    setCatIndex(prevCatIndex);
    setRowIndex(prevRowIndex);
    setSingleCat(newSingleCat);
  };
  return (
    <Wrapper>
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
                    rowCount={cats.length}
                    rowHeight={cache.current.rowHeight}
                    deferredMeasurementCache={cache.current}
                    rowRenderer={({ key, index, style, parent }) => {
                      const row = cats[index];

                      if (index === cats.length - 1) {
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
                                <RowCatWrapper row={row}>
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
                  ></List>
                </div>
              )}
            </AutoSizer>
          )}
        </WindowScroller>
        {singleCat && (
          <SingleCat
            breeds={breeds}
            singleCat={singleCat}
            handleClose={handleClose}
            closeNextImg={closeNextImg}
            closePrevImg={closePrevImg}
            handleNextimg={() => handleNextimg()}
            handlePrevimg={() => handlePrevimg()}
          />
        )}
        {loading && <Loading>Loading...</Loading>}
        {error && <Error>some thing went wrong</Error>}
      </ImgWrapper>
    </Wrapper>
  );
}
