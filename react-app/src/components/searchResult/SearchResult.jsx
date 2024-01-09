import React from "react";
import "./style.scss";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import InfiniteScroll from "react-infinite-scroll-component";
import MovieCard from "../movieCard/MovieCard";

const SearchResult = ({ data, title }) => {
  return (
    <div className="searchResultsPage">
      {
        <>
          <div className="pageTitle">{`${title}`}</div>
          {data && data.results && data.results.length > 0 ? (
            <ContentWrapper>
              <InfiniteScroll
                className="content"
                dataLength={data?.results?.length || []}
              >
                {data.results.map((item, index) => (
                  <MovieCard key={index} data={item} />
                ))}
              </InfiniteScroll>
            </ContentWrapper>
          ) : (
            <div className="resultNotFound">Sorry, Results not found</div>
          )}
        </>
      }
    </div>
  );
};

export default SearchResult;
