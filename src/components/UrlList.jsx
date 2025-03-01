import React, { useState } from 'react';
import { Clipboard } from 'lucide-react';

const UrlList = ({ urls }) => {
  const [copiedUrl, setCopiedUrl] = useState('');

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(''), 3000);
  };

  return (
    <div className="mt-4">
      <h2>Shortened URLs</h2>
      <ul className="list-group">
        {urls.map((url, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            <a href={url} target="_blank" rel="noopener noreferrer">
              {url}
            </a>
            <div className="d-flex align-items-center">
              {copiedUrl === url && (
                <span className="text-success me-2">Copied!</span>
              )}
              <button
                className="btn btn-outline-secondary btn-sm d-flex align-items-center"
                onClick={() => handleCopy(url)}
              >
                <Clipboard size={16} className="me-1" /> Copy
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UrlList;
