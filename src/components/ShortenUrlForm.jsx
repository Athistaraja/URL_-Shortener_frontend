import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Clipboard, ClipboardCheck } from 'lucide-react';

const ShortenUrlForm = ({ onAddUrl, onUpdateUrl }) => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [existingCode, setExistingCode] = useState(''); 
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [pasteNotification, setPasteNotification] = useState(false);

  const handleShortenSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await axios.post(`https://url-shortener-backend-lyqr.onrender.com/api/shorten`, {
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

  const handlePaste = async () => {
    try {
      const permissionStatus = await navigator.permissions.query({ name: 'clipboard-read' });
      if (permissionStatus.state === 'granted' || permissionStatus.state === 'prompt') {
        const text = await navigator.clipboard.readText();
        setOriginalUrl(text);
        setPasteNotification(true);
        setTimeout(() => setPasteNotification(false), 3000);
      } else {
        setError('Clipboard access denied. Please allow clipboard permissions in your browser settings.');
      }
    } catch (err) {
      console.error('Failed to read clipboard: ', err);
      setError('Failed to access clipboard. Please check your browser settings.');
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleShortenSubmit} className="border p-4 rounded shadow-sm mb-4">
        <h4 className='text-success text-center fst-italic'>Shorten a New URL</h4>
        <div className="mb-3">
          <label htmlFor="originalUrl" className="form-label">
            Original URL
          </label>
          <div className="input-group">
            <input
              type="url"
              id="originalUrl"
              className="form-control"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              placeholder="Enter the original URL"
              required
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={handlePaste}
            >
              <Clipboard size={16} className="me-1" /> Paste
            </button>
          </div>
          {pasteNotification && <div className="alert alert-info mt-2">URL pasted from clipboard!</div>}
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
