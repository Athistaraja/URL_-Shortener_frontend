import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ShortenUrlForm = ({ onAddUrl, onUpdateUrl }) => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [existingCode, setExistingCode] = useState(''); // For modifying an existing code
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle URL shortening
  const handleShortenSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await axios.post(`http://localhost:5000/api/shorten`, {
        originalUrl,
        customCode,
      });
      onAddUrl(response.data.shortenedUrl);
      setSuccess('URL shortened successfully!');
      setOriginalUrl('');
      setCustomCode('');
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleShortenSubmit} className="border p-4 rounded shadow-sm mb-4">
        <h4>Shorten a New URL</h4>
        <div className="mb-3">
          <label htmlFor="originalUrl" className="form-label">
            Original URL
          </label>
          <input
            type="url"
            id="originalUrl"
            className="form-control"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            placeholder="Enter the original URL"
            required
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Shorten URL'}
        </button>
      </form>
    </div>
  );
};

export default ShortenUrlForm;