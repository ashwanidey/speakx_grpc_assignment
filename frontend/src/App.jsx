import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Anagram from '../components/anagram';
import Mcq from '../components/mcq';
import Pagination from '../components/Pagination';

function App() {
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState('');
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handleSearch = async (page = 1) => {
    const response = await fetch('https://speakx-grpc-assignment.onrender.com/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, page, filterType }),
    });
    const data = await response.json();

    setResults(data.data.questions);
    setTotalPages(data.data.totalPages || 1);
    setCurrentPage(page);
  };

  const handlePageChange = (page) => {
    handleSearch(page);
  };

  useEffect(() => {
    handleSearch();
  }, [filterType]); 

  return (
    <div className="">
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search questions..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => handleSearch(1)}
              className="mt-3 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Search
            </button>
          </div>

          
          <div className="mb-6">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Types</option>
              <option value="ANAGRAM">Anagram</option>
              <option value="MCQ">Multiple Choice</option>
            </select>
          </div>

          <div className="results space-y-4">
            {results.length > 0 ? (
              results.map((question, index) => (
                <div
                  key={index}
                  className="result-item bg-white shadow-md rounded-lg p-5 border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-lg font-bold text-gray-800">
                    {question.title}
                  </h3>
                  <p className="text-gray-500">Type: {question.type}</p>
                  {question.type === 'ANAGRAM' && (
                    <Anagram blocks={question.blocks} solution={question.solution} />
                  )}
                  {question.type === 'MCQ' && (
                    <Mcq options={question.options} solution={question.solution} />
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-600 text-center">No results found</p>
            )}
          </div>

          <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
        </div>
      </div>
    </div>
  );
}

export default App;
