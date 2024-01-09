import React, { useState } from "react";
import "./style.scss";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import BackgrounImage from "../../assets/bg.png";
import Img from "../../components/lazyLoadImage/img";
const SearchRec = ({ onSearch, title }) => {
  const [query, setQuery] = useState("");

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      onSearch(query);
    }
  };

  return (
    <div className="heroBanner">
      <div className="backdrop-img">
        <Img src={BackgrounImage} />
      </div>
      <div className="opacity-layer"> </div>
      <div className="heroBannerContent">
        <span className="subTitle">{title} Based Recommendation System</span>
        <div className="searchInput">
          <input
            type="text"
            placeholder="Search with movie title.."
            onChange={(e) => setQuery(e.target.value)}
            onKeyUp={searchQueryHandler}
          />
          <button onClick={() => onSearch(query)}>Search</button>
        </div>
      </div>
    </div>
  );
};

export default SearchRec;
