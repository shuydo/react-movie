import React from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "./HomePage";
import Popular from "./PopularP";
import Movies from "./Movies";
import NotFound from "./NotFound";
import Movie from "./Movie";

// import Movie1 from "./Movie1";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/popular" element={<Popular />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/movies/:movieId/*" element={<Movie />} />
      
      {/* <Route path="/movies/:movieId" element={<Movie1 />} /> */}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
