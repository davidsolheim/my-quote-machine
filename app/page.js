'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function Home() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];
  const [backgroundColor, setBackgroundColor] = useState(colors[0]);

  const fetchQuote = async () => {
    setLoading(true);
    setError(null);
    try {
      // Use Next.js API route to avoid CORS issues
      const response = await fetch('/api/quote', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        cache: 'no-store',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Check if API returned an error
      if (data.error) {
        throw new Error(data.error);
      }
      
      // Define new color here, inside the function
      const newColor = colors[Math.floor(Math.random() * colors.length)];
      // Set state for all three together
      setQuote(data.content);
      setAuthor(data.author);
      setBackgroundColor(newColor);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch the quote:', error);
      setError(error.message || 'Failed to fetch quote. Please try again.');
      setLoading(false);
      // Set a fallback quote
      setQuote('Unable to load quote. Please check your connection and try again.');
      setAuthor('System');
    }
  };

  // useEffect is used to call fetchQuote on component mount only
  useEffect(() => {
    // Ensure we're on the client side
    if (typeof window !== 'undefined') {
      fetchQuote();
    }
  }, []); // Empty dependency array ensures this effect only runs once

  return (
    <div className={styles.quoteBox} style={{ backgroundColor: backgroundColor, color: backgroundColor }}>
      {loading ? (
        <p className={styles.text}>Loading quote...</p>
      ) : error ? (
        <>
          <p className={styles.text}>"{quote}"</p>
          <p className={styles.author}>-{author}</p>
        </>
      ) : (
        <>
          <p className={styles.text}>"{quote}"</p>
          <p className={styles.author}>-{author}</p>
        </>
      )}
      <div className={styles.buttonContainer}>
        <button className={styles.newQuote} onClick={fetchQuote} disabled={loading}>
          {loading ? 'Loading...' : 'New Quote'}
        </button>
        {quote && author && author !== 'System' && (
          <a className={styles.tweetQuote} href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(quote + " - " + author)}`} target="_blank" rel="noopener noreferrer">Post Quote</a>
        )}
      </div>
    </div>
  );
}

