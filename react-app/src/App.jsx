import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Head from './components/header/Head'
import SearchResult from './components/searchResult/SearchResult';
import SearchRec from './containers/searchRec/SearchRec';
import Analysis from './containers/analysis/Analysis';
import {fetchTopMovies, fetchPlotRecMovies, fetchContentRecMovies} from './api/api';
import Spinner from './components/spinner/Spinner';

function App() {
  const [data, setData] = useState(null);
  const [title, setTitle] = useState('');
  const [showPlotSearch, setPlotShowSearch] = useState(false);
  const [showContentSearch, setContentShowSearch] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTopMovies().then((data) => {
      setData(data);
      setTitle("Top rated movies");
    });
  }, []);

  const handleHomeClick = () => {
    setPlotShowSearch(false);
    setContentShowSearch(false);
    setShowAnalysis(false);
    setLoading(true);
    fetchTopMovies().then((data) => {
      setData(data);
      setTitle("Top rated movies");
      setLoading(false);
    });
  };

  const handlePlotRecClick = () => {
    setContentShowSearch(false);
    setPlotShowSearch(true);
    setShowAnalysis(false);
  };

  const handleContentRecClick = () => {
    setContentShowSearch(true);
    setPlotShowSearch(false);
    setShowAnalysis(false);
  };

  const handleAnalysisClick = () => {
    setContentShowSearch(false);
    setPlotShowSearch(false);
    setShowAnalysis(true);
  };

  const handlePlotSearch = (query) => {
    setLoading(true);
    fetchPlotRecMovies(query).then((data) => {
      setData(data);
      setTitle(`Recommended movies for ${query}`);
      setContentShowSearch(false);
      setPlotShowSearch(false);
      setLoading(false);
    });
  };

  const handleContentSearch = (query) => {
    setLoading(true);
    fetchContentRecMovies(query).then((data) => {
      setData(data);
      setTitle(`Recommended movies for ${query}`);
      setContentShowSearch(false);
      setPlotShowSearch(false);
      setLoading(false);
    });
  };

  return (
    <BrowserRouter>
      {loading && <Spinner initial={true}/>}
      <Head onHomeClick={handleHomeClick} onPlotRecClick={handlePlotRecClick} onContentRecClick={handleContentRecClick} onAnalysisClick={handleAnalysisClick} />
      {showPlotSearch && (
        <SearchRec onSearch={handlePlotSearch} title={"Overview"} />
      )}
      {showContentSearch && (
        <SearchRec onSearch={handleContentSearch} title={"Content"}/>
      )}
      {showAnalysis && (
        <Analysis/>
      )}
      {!showPlotSearch && !showContentSearch && !showAnalysis && (
        <SearchResult data={data} title={title} />
      )}
    </BrowserRouter>
  );
}

export default App;
