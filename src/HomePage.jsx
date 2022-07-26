import React /*, { useRef }*/ from "react";

import { useState, useEffect } from "react";
// import { createBrowserHistory } from "history";

import { getLangsApi, getGenresApi, getTrendMovies } from "./js/api";
import Header from "./COMPs/Header";
import MovieList from "./COMPs/MovieList";
import { useLocation } from "react-router-dom";

// import Search from "./COMPs/Search";
// import Snack from "./COMPs/Snack";

const HomePage = () => {
  // const { current: history } = useRef(createBrowserHistory({ window }));
  const savedLang = JSON.parse(localStorage.getItem("lang")) || "en";

  const location = useLocation();
  const [lang, setLang] = useState(savedLang);
  const [langs, setLangs] = useState([savedLang]);
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [pagesQty, setPagesQty] = useState(0);
  const [page, setPage] = useState(
    parseInt(location.search?.split("=")[1] || 1)
  ); // const [isSnackOpen, setSnackOpen] = useState(false);

  const setGenresList = async (lang = "en") =>
    setGenres(await getGenresApi(lang));

  const setLangsList = async () => setLangs(await getLangsApi());

  if (genres.length === 0) setGenresList(savedLang);
  if (langs.length === 1) setLangsList();

  const changeLang = async newLang => {
    localStorage.setItem("lang", JSON.stringify(newLang));
    setLang(newLang);
    await setGenresList(newLang);
  };

  useEffect(() => {
    getTrendMovies(lang, page).then(({ mvs, pages }) => {
      if (!pagesQty) setPagesQty(pages);
      setMovies(mvs);
    });
  }, [lang, page, pagesQty]);

  return (
    <>
      <Header
        lang={lang}
        langs={langs}
        page={page}
        qty={pagesQty}
        changeLang={changeLang}
        setpage={setPage}
      />
      <MovieList movies={movies} genres={genres} />
      {/* <Snack isOpen={isSnackOpen} handleClose={() => setSnackOpen()} /> */}
    </>
  );
};

export default HomePage;
