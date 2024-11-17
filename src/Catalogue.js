import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Pagination from './components/Pagination';

function Catalogue({ onLogout }) {
  const [categories, setCategories] = useState([]);
  const [frequent, setFrequent] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedDataset, setSelectedDataset] = useState('response1');
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const newData = await import(`./data/${selectedDataset}.json`);
        const newCategories = selectedDataset === 'response2'
            ? Object.values(newData.categories[Object.keys(newData.categories)[0]])[0]
            : newData?.categories;
        setCategories(newCategories);
        setFrequent(newData?.frequent);
        setFilteredItems(newData?.frequent);
        setCurrentPage(0);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedDataset]);

  const handleCategorySelect = (category) => {
    const filtered = category ? frequent?.filter((item) => item.cat === category) : frequent;
    setFilteredItems(filtered);
    setCurrentPage(0);
  };

  const handlePageChange = (selected) => {
    setCurrentPage(selected.selected);
  };

  const displayedItems = filteredItems.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="catalogue-container">
      <Sidebar categories={categories} onCategorySelect={handleCategorySelect} />
      <div className="main-content">
        <div className="header">
          <select
            value={selectedDataset}
            onChange={(e) => setSelectedDataset(e.target.value)}
          >
            <option value="response1">Dataset 1</option>
            <option value="response2">IMF Dataset</option>
          </select>
          <button className="logout" onClick={() => onLogout()}>Logout</button>
        </div>
        {isLoading ? (
          <h3>Loading data...</h3>
        ) : 
          <>
            {displayedItems.length > 0 ? 
              <>
                  <div className="items-grid">
                  {displayedItems?.map((item, index) => (
                      <div key={index} className="item-card">
                      <h4 className="title">{item.title}</h4>
                      <p>Category: {item.cat}</p>
                      <p>Sub-Category: {item.subCat}</p>
                      <p>Frequency: {item.freq}</p>
                      <p>Unit: {item.unit}</p>
                      </div>
                  ))}
                  </div>
                  <Pagination
                      pageCount={Math.ceil(filteredItems.length / itemsPerPage)}
                      onPageChange={handlePageChange}
                      forcePage={currentPage}
                  />
              </> : <h3>No data to display!</h3>
              }
          </>
        }
      </div>
    </div>
  );
}

export default Catalogue;