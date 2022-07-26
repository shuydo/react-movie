import React from "react";
import {
  Grid,
  Card,
  CardMedia,
  Typography,
  CardContent,
  // Badge,
} from "@mui/material";
// import { styled } from "@mui/material/styles";

import "./MovieItem.css";
import dummy from "../img/dummy.png";

// const BadgePop = styled(Badge)(() => ({
//   "& .MuiBadge-badge": {
//     right: 25,
//     bottom: 12,
//     padding: "1",
//   },
// }));

// vote,poster,genres
const MovieItem = ({ title, genre, genres, year ,poster}) => {
  let textGenres = genre
    .map(id => genres.filter(genre => genre.id === id).map(genre => genre.name))
    .flat();

  textGenres =
    textGenres.length > 2
      ? `${textGenres[0]}, ${textGenres[1]}${genres[genres.length - 1].name}`
      : `${textGenres[0]}, ${textGenres[1]}`;

  return (
    <Grid item>
      <Card sx={{ width: 300, height: 500 }}>
        {/* <BadgePop
          color="secondary"
          badgeContent={vote ? vote : "N/A"}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
        > */}
        <CardMedia
          height={450} // st objectFit: "scale-down" "none" "contain" "fill" // src={dummy} 
          src={poster === null ? dummy : poster}
          component="img"
          alt={title}
        />
        {/* </BadgePop> */}
        <CardContent sx={{ "&:last-child": { pb: 0 }, pt: 0.125 }}>
          <Typography
            color={"error"}
            variant="5"
            component="h6"
            style={{ lineHeight: "1" }}
          >
            {textGenres} | {year}
          </Typography>
          <Typography
            className="cut"
            variant="5"
            component="h3"
            style={{ lineHeight: "1" }}
          >
            {title}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default MovieItem;
