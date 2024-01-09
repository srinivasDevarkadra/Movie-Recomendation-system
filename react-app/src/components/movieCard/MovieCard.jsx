import React from "react";
import dayjs from "dayjs";

import "./style.scss";
import Img from "../lazyLoadImage/img";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";
import PosterFallback from "../../assets/no-poster.png";

const MovieCard = ({ data }) => {
    const posterUrl = data.poster_url ? data.poster_url : PosterFallback;
    return (
        <div className="movieCard">
            <div className="posterBlock">
                <Img className="posterImg" src={posterUrl} />
                {(
                    <React.Fragment>
                        <CircleRating rating={data.vote_average.toFixed(1)} />
                        <Genres data={data.genres} />
                    </React.Fragment>
                )}
            </div>
            <div className="textBlock">
                <span className="title">{data.title || data.name}</span>
                <span className="date">
                    {dayjs(data.release_date).format("MMM D, YYYY")}
                </span>
            </div>
        </div>
    );
};

export default MovieCard;