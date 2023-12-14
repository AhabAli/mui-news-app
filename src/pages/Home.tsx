import * as React from "react";
import { Topics } from "../components/Topics";
import { fetchNews } from "../services/news-api";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { Article } from "../types/news";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

export interface IHomeProps {}

export default function Home(props: IHomeProps) {
  const [topic, setTopic] = React.useState("apple");
  const [articles, setArticles] = React.useState<Article | any>();

  React.useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchNews({ page: 1, query: topic });
        setArticles(data.articles);
      } catch (error) {
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
  };
  return (
    <div>
      <Topics updateTopic={updateTopic} />
      <Box sx={{ mt: 4 }}>
        <Grid container spacing={2}>
          {articles &&
            articles.map((article: Article) => {
              return (
                <Grid item xs={3}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                      component="img"
                      alt="green iguana"
                      height="140"
                      image={article.urlToImage}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {article.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {article.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          {!articles && (
            <Grid item xs={12}>
              <CircularProgress />
            </Grid>
          )}
        </Grid>
      </Box>
    </div>
  );
}
