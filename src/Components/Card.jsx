import React from 'react';

const Card = ({ data }) => {
  return (
    <>
      {data.map((curItem, index) => (
        curItem.urlToImage && (
          <div className="card" key={index}>
            <img src={curItem.urlToImage} alt="News Thumbnail" />
            <div className="content">
              <h3 className="title">
                <a href={curItem.url} target="_blank" rel="noopener noreferrer">{curItem.title}</a>
              </h3>
              <p>{curItem.description}</p>
              <button onClick={() => window.open(curItem.url, "_blank", "noopener,noreferrer")}>Read More</button>
            </div>
          </div>
        )
      ))}
    </>
  );
};

export default Card;
