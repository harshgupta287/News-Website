import React, { useEffect, useState } from 'react';
import Card from './Card';

const Newsapp = () => {
    const [search, setSearch] = useState("India");
    const [newsData, setNewsData] = useState(null);
    const [page, setPage] = useState(1); // Page state for pagination
    const API_KEY = "bcc1d8445e254e9cb1bce4a9c68f62ef";

    const getData = async () => {
        const response = await fetch(`https://newsapi.org/v2/everything?q=${search}&page=${page}&pageSize=12&apiKey=${API_KEY}`);
        const jsonData = await response.json();
        setNewsData(jsonData.articles);
    };

    // Fetch data when `search` or `page` changes
    useEffect(() => {
        getData();
    }, [search, page]);

    const handleInput = (e) => {
        setSearch(e.target.value);
        setPage(1); // Reset to page 1 when search input changes
    };

    const handleSearchClick = () => {
        setPage(1); // Reset to page 1 when search button is clicked
        getData();
    };

    const handleCategoryClick = (event) => {
        setSearch(event.target.value);
        setPage(1); // Reset to page 1 when category changes
    };

    return (
        <div>
            <nav>
                <div>
                    <h1>Trendy News</h1>
                </div>
                <ul style={{ display: "flex", gap: "11px", listStyle: "none", padding: 0 }}>
                    <li>
                        <button 
                            style={{color: "white", fontWeight: 600, fontSize: "17px", cursor: "pointer", border: "none", background: "none" }} 
                            onClick={() => handleCategoryClick({ target: { value: "All News" } })}
                        >
                            All News
                        </button>
                    </li>
                    <li>
                        <button 
                            style={{color: "white", fontWeight: 600, fontSize: "17px", cursor: "pointer", border: "none", background: "none" }} 
                            onClick={() => handleCategoryClick({ target: { value: "Trending" } })}
                        >
                            Trending
                        </button>
                    </li>
                </ul>

                <div className='searchBar'>
                    <input type='text' placeholder='Search News' value={search} onChange={handleInput} />
                    <button onClick={getData}>Search</button>
                </div>
            </nav>
            
            <div>
                <p className='head'>Stay Updated with TrendyNews</p>
            </div>

            <div className='categoryBtn'>
                <button onClick={handleCategoryClick} value="Sport">Sports</button>
                <button onClick={handleCategoryClick} value="Politics">Politics</button>
                <button onClick={handleCategoryClick} value="Entertainment">Entertainment</button>
                <button onClick={handleCategoryClick} value="Health">Health</button>
                <button onClick={handleCategoryClick} value="Fitness">Fitness</button>
                <button onClick={handleCategoryClick} value="Crime">Crime</button>
            </div>

            <div>
                {newsData ? <Card data={newsData} /> : null}
            </div>

            {/* Pagination Buttons */}
            <div className='pagination'>
                <button disabled={page === 1} onClick={() => setPage(page - 1)}>Back</button>
                <span>Page {page}</span>
                <button onClick={() => setPage(page + 1)}>Next</button>
            </div>

            {/* Footer */}
            <footer className="footer">
                <p>© {new Date().getFullYear()} Trendy News. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default Newsapp;
