import React from "react";
import "../../styles/searchPage.scss";
import { Card } from "antd";

const { Meta } = Card;

const NewsCard = ({ news }) => {
  return (
    <div className="newsCard">
      <Meta title={news.title} description={news.content} />
    </div>
  );
};

export default NewsCard;
