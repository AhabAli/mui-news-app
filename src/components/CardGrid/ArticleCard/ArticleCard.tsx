import * as React from "react";
import { Article } from "../../../types/news";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { formatDate, stringAvatar } from "../../../utils/helper";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

export function ArticleCard({
  title,
  description,
  author,
  publishedAt,
  url,
  urlToImage,
}: Article) {
  return (
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
        image={urlToImage || "https://placehold.co/600x400"}
      />
      <CardContent>
        <Typography variant="h6" component={"p"} sx={{ mb: 2 }}>
          <Typography
            variant={"h6"}
            component={"a"}
            gutterBottom
            href={`${url}`}
            target="_blank"
            sx={{
              textDecoration: "none",
              color: "text.primary",
              background:
                "linear-gradient(to right, rgba(100, 200, 200, 1), rgba(100, 200, 200, 1)),linear-gradient(to right, rgba(255, 0, 0, 1), rgba(255, 0, 180, 1), rgba(0, 100, 200, 1))",
              backgroundSize: "100% 0.1em, 0 0.1em",
              backgroundPosition: "100% 100%, 0 100%",
              backgroundRepeat: "no-repeat",
              transition: "background-size 400ms",
              "&:hover": {
                backgroundSize: " 0 0.1em, 100% 0.1em",
              },
            }}
          >
            {title}
          </Typography>
        </Typography>
        <Typography variant={"caption"} component={"p"} sx={{ mb: 2 }}>
          {description}
        </Typography>

        <List
          sx={{
            bgcolor: "background.paper",
            mt: 2,
          }}
        >
          <ListItem>
            <ListItemAvatar>
              <Avatar {...stringAvatar(author || "Unknown")} />
            </ListItemAvatar>
            <ListItemText
              primary={<Typography component={"p"}>{author}</Typography>}
              secondary={formatDate(publishedAt)}
            />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
}
