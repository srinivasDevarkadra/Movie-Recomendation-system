export const fetchTopMovies = async () => {
  try {
    const response = await fetch('http://127.0.0.1:5000/api/getTopMovies');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data: ', error);
  }
};


export const fetchPlotRecMovies = async (movie_title) => {
  try {
    const url = `http://127.0.0.1:5000/api/getOverviewRecommendations/${encodeURIComponent(movie_title)}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data: ', error);
  }
};


export const fetchContentRecMovies = async (movie_title) => {
  try {
    const url = `http://127.0.0.1:5000/api/getContentRecommendations/${encodeURIComponent(movie_title)}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data: ', error);
  }
};

export const fetchAnalysis = async (analysis, year) => {
  try {
    let url = `http://127.0.0.1:5000/api/getTopRevenueLanguages/${encodeURIComponent(year)}`;
    if(analysis=="languageRevenue") {
      url = `http://127.0.0.1:5000/api/getTopRevenueLanguages/${encodeURIComponent(year)}`;
    } else if (analysis=="blockBuster") {
      url = `http://127.0.0.1:5000/api/getBlockbusterAnalysis/${encodeURIComponent(year)}`;
    } else if (analysis=="genreHit") {
      url = `http://127.0.0.1:5000/api/getAnalysis3/${encodeURIComponent(year)}`;
    } else if (analysis=="langExp") {
      url = `http://127.0.0.1:5000/api/getAnalysis4/${encodeURIComponent(year)}`;
    } else if (analysis=="analysis5") {
      url = `http://127.0.0.1:5000/api/getAnalysis5/${encodeURIComponent(year)}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data: ', error);
  }
};