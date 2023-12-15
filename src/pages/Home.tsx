import { Box, CircularProgress, Grid, Typography } from "@mui/material";

import * as React from "react";
import { Topics } from "../components/Topics";
import { fetchNews } from "../services/news-api";
import { Article } from "../types/news";
import { useSearchParams } from "react-router-dom";
import { CardGrid } from "../components/CardGrid";
import { LanguageToggleButton } from "../components/LanguageToggle";

export interface IHomeProps {}

export default function Home(props: IHomeProps) {
  let [searchParams, setSearchParams] = useSearchParams();

  const [loading, setLoading] = React.useState<boolean>(false);
  const [topic, setTopic] = React.useState<string>(
    searchParams.get("query") || "apple"
  );
  const [language, setLanguage] = React.useState<string>(
    searchParams.get("language") || "en"
  );
  const [articles, setArticles] = React.useState<Article | any>();

  // make api call and get data of articles
  React.useEffect(() => {
    setLoading(true);
    setArticles("");

    const getData = async () => {
      try {
        const data = await fetchNews({
          page: 1,
          query: topic,
          language: language,
        });
        setArticles(data.articles);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error: ", error);
      }
    };

    getData();
  }, [topic, language]);

  // function for updating topic
  const updateTopic = (topic: string) => {
    setTopic(topic);
    setSearchParams({ query: topic, language: language });
  };

  // function for toggling language
  const updateLang = (
    event: React.MouseEvent<HTMLElement>,
    language: string
  ) => {
    if (language !== null) {
      setLanguage(language);
      setSearchParams({ query: topic, language: language });
    }
  };

  return (
    <div>
      {/* Set topic and language */}
      <Box sx={{ mt: 4 }}>
        <Grid container spacing={2} alignItems={"flex-end"}>
          <Grid item xs={12} sm={10}>
            <Topics active={topic} updateTopic={updateTopic} />
          </Grid>
          <Grid
            item
            xs={12}
            sm={2}
            justifyContent={{ xs: "center", sm: "end" }}
          >
            <LanguageToggleButton
              updateLanguage={updateLang}
              selectedLanguage={language}
            />
          </Grid>
        </Grid>
      </Box>

      {/* set articles and loader */}
      <Box sx={{ mt: 4 }}>
        <Grid container spacing={2}>
          {articles && (
            <Grid item xs={12}>
              <Typography variant={"h6"} component={"h6"} gutterBottom>
                Latest Articles: {topic}
              </Typography>
            </Grid>
          )}
          {articles && (
            <CardGrid
              articlesData={articles}
              direction={language === "en" ? "ltr" : "rtl"}
            />
          )}
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
