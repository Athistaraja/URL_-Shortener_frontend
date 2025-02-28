import React from 'react';

const UrlList = ({ urls }) => {
  return (
    <div className="mt-4">
      <h2>Shortened URLs</h2>
      <ul className="list-group">
        {urls.map((url, index) => (
          <li key={index} className="list-group-item">
            <a href={url} target="_blank" rel="noopener noreferrer">
              {url}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UrlList;
