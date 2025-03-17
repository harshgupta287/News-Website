import React, { useEffect, useState } from 'react';
import Card from './Card';

const Newsapp = () => {
    const [search, setSearch] = useState("All");
    const [newsData, setNewsData] = useState(null);
    const API_KEY = "a672c78c0284410fabf6ca6a59ea053f";

    const getData = async () => {
        try {
            const response = await fetch(`https://newsapi.org/v2/everything?q=${search}&apiKey=${API_KEY}`);
            const jsonData = await response.json();
            setNewsData(jsonData.articles.slice(0, 10));
        } catch (error) {
            console.error("Error fetching news:", error);
        }
    };

    useEffect(() => {
        getData();
    }, [search]); // Now fetches news when `search` changes

    const handleSearch = () => {
        getData();
    };

    const handleCategoryClick = (category) => {
        setSearch(category);
    };

    return (
        <div>
            <nav>
                <h1>Trendy News</h1>
                <ul>
                    <li onClick={() => handleCategoryClick("all")}>All News</li>
                    <li onClick={() => handleCategoryClick("trending")}>Trending</li>
                </ul>
                <div className="searchBar">
                    <input type="text" placeholder="Search News" value={search} onChange={(e) => setSearch(e.target.value)} />
                    <button onClick={handleSearch}>Search</button>
                </div>
            </nav>

            {/* Category Buttons */}
            <div className="categoryBtn">
                {["sport", "politics", "entertainment", "health", "fitness"].map(category => (
                    <button key={category} onClick={() => handleCategoryClick(category)}>{category.charAt(0).toUpperCase() + category.slice(1)}</button>
                ))}
            </div>

            {/* News Cards */}
            <div className="cardContainer">
                {newsData ? <Card data={newsData} /> : <p>Loading news...</p>}
            </div>
        </div>
    );
};

export default Newsapp;
