import React, { useState } from 'react';
import ShortenUrlForm from './components/ShortenUrlForm';
import UrlList from './components/UrlList';
// import "./App.css"

const App = () => {
  const [shortenedUrls, setShortenedUrls] = useState([]);

  const addShortenedUrl = (url) => {
    setShortenedUrls([url, ...shortenedUrls]);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-danger text-center mb-4 fw-bold">URL Shortener</h1>
      <ShortenUrlForm onAddUrl={addShortenedUrl} />
      <UrlList urls={shortenedUrls} />
    </div>
  );
};

export default App;
