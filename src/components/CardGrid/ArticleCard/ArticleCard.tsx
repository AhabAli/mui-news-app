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
        <Typography
          variant={"h6"}
          component={"a"}
          gutterBottom
          href={`${url}`}
          target="_blank"
          sx={{
            display: "block",
            textDecoration: "none",
            color: "text.primary",
          }}
        >
          {title}
        </Typography>
        <Typography variant={"caption"}>{description}</Typography>

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
