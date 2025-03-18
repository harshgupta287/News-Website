import React, { useEffect, useState } from 'react'
import Card from './Card'

const Newsapp = () => {
    const [search, setSearch] = useState("India");
    const [newsData, setNewsData] = useState(null);
    const API_KEY = "a672c78c0284410fabf6ca6a59ea053f";

    const getData = async () => {
        const response = await fetch(`https://newsapi.org/v2/everything?q=${search}&apiKey=${API_KEY}`);
        const jsonData = await response.json();
        let dt = jsonData.articles.slice(0, 12);
        setNewsData(dt);
    };

    // Fetch data when `search` changes
    useEffect(() => {
        getData();
    }, [search]);

    const handleInput = (e) => {
        setSearch(e.target.value);
    };

    const userInput = (event) => {
        setSearch(event.target.value); // Update search state
    };

    return (
        <div>
            <nav>
                <div>
                    <h1>Trendy News</h1>
                </div>
                <ul style={{ display: "flex", gap: "11px" }}>
                    <a style={{ fontWeight: 600, fontSize: "17px" }}>All News</a>
                    <a style={{ fontWeight: 600, fontSize: "17px" }}>Trending</a>
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
                <button onClick={userInput} value="Sport">Sports</button>
                <button onClick={userInput} value="Politics">Politics</button>
                <button onClick={userInput} value="Entertainment">Entertainment</button>
                <button onClick={userInput} value="Health">Health</button>
                <button onClick={userInput} value="Fitness">Fitness</button>
                <button onClick={userInput} value="Crime">Crime</button>
            </div>

            <div>
                {newsData ? <Card data={newsData} /> : null}
            </div>
        </div>
    )
}

export default Newsapp;
