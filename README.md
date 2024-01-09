# Movie Recommendation System

This project is a movie recommendation system built using the IMDB dataset. The implementation is based on the tutorial available at [Kaggle](https://www.kaggle.com/code/ibtesama/getting-started-with-a-movie-recommendation-system/notebook).

## Overview

The movie recommendation system utilizes the IMDB dataset to provide personalized movie suggestions. By analyzing user preferences and movie attributes, the system aims to enhance the overall movie-watching experience.

## Recommendations

the following recommendation tasks have been implemented:

- **Demographic Recommendation::** [Users are suggested top and popular movies when they
land on the application.]
- **Overview/Plot Based Recommendation::** [Users need to input a movie title, and corresponding
suggestions(excluding the same movie since this is a movie recommender and not a movie search tool) are shown based on the similarities of the plots of the movies.]
- **Credits, Genres and Keyword based recommender :** [Users can click on the Content Rec tab to input a movie title, and a content-based recommender will be used to show suggestions based on many relevant attributes like director, genre, and keywords.]
 
## Analysis Tasks
In addition to building the recommendation system, various analysis tasks have been performed on the movie dataset using MongoDB. 
- **Language-Revenue::** Categorizes non-English languages by revenue-to budget ratio, returning the top 10 languages with their budget and revenue, using dataset attributes release_date, budget,revenue, and original language
- **Blockbuster-Gross ::** Calculating Return on Investment (ROI) based on release_date, revenue, and budget, filters for potential blockbusters with an ROI ≥ 2, and outputs the average ROI per month, sorted chronologically
- **Genre-Success::** Evaluates movie genres by average ratings and hit/flop status, presenting statistics and counts, sorted alphabetically, utilizing release_date
vote_average, and genres. We can infer that in 2010, Horror genre faced a setback and had to reevaluate film making approach


## Getting Started

To explore the movie recommendation system and view the analyses, follow these steps:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/movie-recommendation-system.git
2. **Naviagate to react-app:**
    ```bash
    npm install and npm start
3. **Naviagate  to reac-server in another terminal tab:**
    ```bash
    python3 server.py
4.  **Open in Browser:**
    ```bash 
    http://localhost:3000/ to access the movie recommendation system
