import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];
  const [backgroundColor, setBackgroundColor] = useState(colors[0]);

  const fetchQuote = async () => {
    try {
      const response = await fetch('https://api.quotable.io/random');
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      // Define new color here, inside the function
      const newColor = colors[Math.floor(Math.random() * colors.length)];
      // Set state for all three together
      setQuote(data.content);
      setAuthor(data.author);
      setBackgroundColor(newColor); // This should only be called within the function
    } catch (error) {
      console.error('Failed to fetch the quote:', error);
    }
  };

  // useEffect is used to call fetchQuote on component mount only
  useEffect(() => {
    fetchQuote();
  }, []); // Empty dependency array ensures this effect only runs once

  return (
    <div id="quote-box" style={{ backgroundColor: backgroundColor, color: backgroundColor }}>
      <p id="text">"{quote}"</p>
      <p id="author">-{author}</p>
      <div id="button-container">
        <button id="new-quote" onClick={fetchQuote}>New Quote</button>
        <a id="tweet-quote" href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(quote + " - " + author)}`} target="_blank">Tweet Quote</a>
      </div>
    </div>
  );
}

export default App;
