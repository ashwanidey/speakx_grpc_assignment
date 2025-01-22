import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const response = await fetch('http://localhost:8000/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query,page:1 }),
    });
    const data = await response.json();

    setResults(data.data.questions);
  };

  return (
    <div className="App">
      <h1>Question Search</h1>
      <input
        type="text"
        placeholder="Search questions..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <div className="results">
        {results.map((question, index) => (
          <div key={index} className="result-item">
            <h3>{question.title}</h3>
            <p>Type: {question.type}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App
