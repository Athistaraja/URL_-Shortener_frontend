import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Clipboard, Loader2, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const ShortenUrlForm = ({ onAddUrl }) => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [customCode, setCustomCode] = useState('');
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
      const text = await navigator.clipboard.readText();
      setOriginalUrl(text);
      setPasteNotification(true);
      setTimeout(() => setPasteNotification(false), 3000);
    } catch (err) {
      setError('Failed to access clipboard. Please check your browser settings.');
    }
  };

  return (
    <motion.div 
      className="container mt-5"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form 
        onSubmit={handleShortenSubmit} 
        className="border p-4 rounded shadow-lg bg-white"
      >
        <h3 className='text-primary text-center mb-4 fw-bold'>Shorten Your URL</h3>

        <div className="mb-3">
          <label htmlFor="originalUrl" className="form-label">Original URL</label>
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

        {error && (
          <motion.div 
            className="alert alert-danger" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.div>
        )}

        {success && (
          <motion.div 
            className="alert alert-success d-flex align-items-center" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <CheckCircle className="me-2" size={20} /> {success}
          </motion.div>
        )}

        <button
          type="submit"
          className="btn btn-primary w-100 d-flex justify-content-center align-items-center"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 size={20} className="me-2 spinner-border" /> Processing...
            </>
          ) : (
            'Shorten URL'
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default ShortenUrlForm;


