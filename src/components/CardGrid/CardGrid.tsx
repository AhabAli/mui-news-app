import * as React from "react";
import { Article } from "../../types/news";
import { ArticleCard } from "./ArticleCard";
import { Grid } from "@mui/material";

export interface ICardGridProps {
  articlesData: Article[];
}

export function CardGrid({ articlesData }: ICardGridProps) {
  return (
    <>
      {articlesData.map((article, i) => {
        return (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <ArticleCard
              title={article.title}
              description={article.description}
              author={article.author}
              publishedAt={article.publishedAt}
              url={article.url}
              urlToImage={article.urlToImage}
              key={i}
            />
          </Grid>
        );
      })}
    </>
  );
}
