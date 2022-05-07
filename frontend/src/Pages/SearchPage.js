import React from "react";
import { useEffect, useState } from "react";
import { Card, Button } from "antd";
// import { useHistory } from "react-router-dom";
import "../styles/searchPage.scss";
import axios from "axios";
import NewsCard from "../components/miscellaneous/newsCard";

const { Meta } = Card;

const SearchPage = () => {
  //   const history = useHistory();

  const [news, setNews] = useState([]);

  useEffect(() => {
    const loadNews = async () => {
      const response = await axios.get(
        "http://newsapi.org/v2/top-headlines?country=us&category=health&apiKey=06e7cbae93394815b707a8a9b1ee2d3a"
      );
      setNews(response.data.articles);
    };
    loadNews();
  }, []);

  console.log("news", news);

  return (
    <div className="searchPage">
      <NewsCard news={news[0]} />
    </div>
  );
};

export default SearchPage;
