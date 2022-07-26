import React from "react";
import Grid from "@mui/material/Grid";

import MovieItem from "./MovieItem";

const MovieList = props => {
  const { movies, genres } = props;
  // space-evenly space-between spacing={0} columns={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 12 / 5 }}
  return (
    <Grid
      pb={0.25}
      container
      rowSpacing={0.5}
      justifyContent="space-around"
      sx={{ pt: { xs: 7.25, sm: 8.25 } }}
    >
      {movies.map(item => (
        <MovieItem key={item.id} {...item} genres={genres}/>
      ))}
    </Grid>
  );
};

export default MovieList;
