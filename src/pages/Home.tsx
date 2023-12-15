import { Box, CircularProgress, Grid, Typography } from "@mui/material";

import * as React from "react";
import { Topics } from "../components/Topics";
import { fetchNews } from "../services/news-api";
import { Article } from "../types/news";
import { useSearchParams } from "react-router-dom";
import { CardGrid } from "../components/CardGrid";

export interface IHomeProps {}

export default function Home(props: IHomeProps) {
  let [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = React.useState<boolean>(false);

  const [topic, setTopic] = React.useState<string>(
    searchParams.get("query") || "apple"
  );
  const [articles, setArticles] = React.useState<Article | any>();

  React.useEffect(() => {
    setLoading(true);
    setArticles("");
    const getData = async () => {
      try {
        const data = await fetchNews({ page: 1, query: topic });
        setArticles(data.articles);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error: ", error);
      }
    };
    getData();
  }, [topic]);

  React.useEffect(() => {
    console.log("News Articles: ", articles);
  }, [articles]);

  const updateTopic = (topic: string) => {
    setTopic(topic);
    setSearchParams({ query: topic });
  };

  return (
    <div>
      <Topics active={topic} updateTopic={updateTopic} />

      <Box sx={{ mt: 4 }}>
        <Grid container spacing={2}>
          {articles && (
            <Grid item xs={12}>
              <Typography variant={"h6"} component={"h6"} gutterBottom>
                Latest Articles: {topic}
              </Typography>
            </Grid>
          )}
          {articles && <CardGrid articlesData={articles} />}
          {loading && (
            <Grid item xs={12}>
              <CircularProgress />
              <Typography variant={"body2"}>Fetching Articles...</Typography>
            </Grid>
          )}

          {!articles && !loading && (
            <Typography sx={{ ml: 4 }} variant={"h6"}>
              No Articles found...
            </Typography>
          )}
        </Grid>
      </Box>
    </div>
  );
}
