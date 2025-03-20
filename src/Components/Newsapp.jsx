import React, { useEffect, useState } from "react";
import Card from "./Card";

const Newsapp = () => {
  const [search, setSearch] = useState("India");
  const [newsData, setNewsData] = useState(null);
  const [page, setPage] = useState(1);
  const API_KEY = "bcc1d8445e254e9cb1bce4a9c68f62ef";

  const getData = async () => {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${search}&page=${page}&pageSize=12&apiKey=${API_KEY}`
      );
      const jsonData = await response.json();
      setNewsData(jsonData.articles);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  useEffect(() => {
    getData();
  }, [search, page]);

  const handleInput = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleSearchClick = () => {
    setPage(1);
    getData();
  };

  const handleCategoryClick = (event) => {
    setSearch(event.target.value);
    setPage(1);
  };

  return (
    <div>
      <nav>
        <h1>Trendy News</h1>

        <ul className="desktop-menu">
          <li><button onClick={handleCategoryClick} value="All News">All News</button></li>
          <li><button onClick={handleCategoryClick} value="Trending">Trending</button></li>
        </ul>

        <div className="searchBar desktop-search">
          <input type="text" placeholder="Search News" value={search} onChange={handleInput} />
          <button onClick={handleSearchClick}>Search</button>
        </div>

      </nav>

      <p className="head">Stay Updated with Trendy News</p>

      <div className="categoryBtn">
        <button onClick={handleCategoryClick} value="Sport">Sports</button>
        <button onClick={handleCategoryClick} value="Politics">Politics</button>
        <button onClick={handleCategoryClick} value="Entertainment">Entertainment</button>
        <button onClick={handleCategoryClick} value="Health">Health</button>
        <button onClick={handleCategoryClick} value="Fitness">Fitness</button>
        <button onClick={handleCategoryClick} value="Crime">Crime</button>
      </div>

      <div>{newsData ? <Card data={newsData} /> : <p>Loading news...</p>}</div>

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>Back</button>
        <span>Page {page}</span>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Trendy News. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Newsapp;
