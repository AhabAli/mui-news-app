import {
  Avatar,
  Box,
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import * as React from "react";
import { Topics } from "../components/Topics";
import { fetchNews } from "../services/news-api";
import { Article } from "../types/news";
import { formatDate, stringAvatar } from "../utils/helper";
import { useSearchParams } from "react-router-dom";

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
        {articles && (
          <Typography
            variant={"h6"}
            component={"h6"}
            gutterBottom
            sx={{ ml: 1 }}
          >
            Latest Articles: {topic}
          </Typography>
        )}

        <Grid container spacing={2}>
          {articles &&
            articles.map((article: Article) => {
              return (
                <Grid item xs={3}>
                  <Card
                    sx={{
                      transition: "0.3s",
                      maxWidth: "100%",
                      margin: "auto",
                      boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={
                        article.urlToImage || "https://placehold.co/600x400"
                      }
                    />
                    <CardContent>
                      <Typography variant={"h6"} component={"h6"} gutterBottom>
                        {article.title}
                      </Typography>
                      <Typography variant={"caption"}>
                        {article.description}
                      </Typography>

                      <List
                        sx={{
                          bgcolor: "background.paper",
                        }}
                      >
                        <ListItem
                          sx={{
                            paddingLeft: 0,
                          }}
                        >
                          <ListItemAvatar>
                            <Avatar
                              {...stringAvatar(article.author || "Unknown")}
                            />
                          </ListItemAvatar>
                          <ListItemText
                            primary={article.author}
                            secondary={formatDate(article.publishedAt)}
                          />
                        </ListItem>
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          {loading && (
            <Grid item xs={12}>
              <CircularProgress />{" "}
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
