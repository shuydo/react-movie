import axios from "axios";

const API_KEY = "2f8d6050c74d5f454a522d74a8cedbb8"; //m
const BASE_URL = "https://api.themoviedb.org/3";

const getLangsApi = async () => {
  const resp = await axios.get(
    `${BASE_URL}/configuration/languages?api_key=${API_KEY}`
  );

  return resp.data.map(el => Object.values(el)[0]).sort();
};

const getGenresApi = async (lang = "en") => {
  const resp = await axios.get(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=${lang}`
  );
  switch (lang) {
    case "en":
      resp.data.genres.push({ id: 0, name: ", Other" });
      break;

    case "ru":
      resp.data.genres.push({ id: 0, name: " и др." });
      break;

    case "uk":
      resp.data.genres.push({ id: 0, name: " та інше" });
      break;

    default:
      resp.data.genres.push({ id: 0, name: "..." });
      break;
  }

  resp.data.genres.forEach(el => {
    if (el.name === "Science Fiction") el.name = "Sci-Fi";
  });
  return resp.data.genres;
};

const getTrendMovies = async (lang, page) => {
  const resp = await axios.get(
    //`${BASE_URL}/trending/all/week
    `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&language=${lang}&page=${page}`
  );
  return {
    pages: resp.data.total_pages,
    mvs: resp.data.results.map(
      ({ id, title, poster_path, vote_average, genre_ids, release_date }) => {
        return {
          id,
          title,
          vote: vote_average,
          genre: genre_ids,
          year: release_date.slice(0, 4),
          poster:
            poster_path === null
              ? null
              : `https://image.tmdb.org/t/p/w300${poster_path}`,
        };
      }
    ),
  };
};

const getPopularMovies = async (lang, page) => {
  const resp = await axios.get(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=${lang}&page=${page}`
  );
  return {
    pages: resp.data.total_pages,
    mvs: resp.data.results.map(
      ({ id, title, poster_path, vote_average, genre_ids, release_date }) => {
        return {
          id,
          title,
          vote: vote_average,
          genre: genre_ids,
          year: release_date.slice(0, 4),
          poster:
            poster_path === null
              ? null
              : `https://image.tmdb.org/t/p/w300${poster_path}`,
        };
      }
    ),
  };
};

const movieSearch = async query => {
  const resp = await axios.get(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}` // include_adult=false`
  );

  return resp.data.results.map(
    ({
      // adult,
      // backdrop_path,
      // genre_ids,
      id,
      // original_language,
      original_title,
      // overview,
      // popularity,
      // poster_path,
      release_date,
      title,
      // video,
      // vote_average,
      // vote_count,
    }) => {
      return {
        // adult,
        // backdrop_path,
        // genre_ids,
        id,
        // original_language,
        original_title,
        // overview,
        // popularity,
        // poster_path,
        release_date,
        title,
        // video,
        // vote_average,
        // vote_count,
      };
    }
  );
};

const getMovieById = async movieId => {
  const resp = await axios.get(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=ru-RU`
  );

  const {
    id,
    genres,
    overview,
    title,
    vote_average,
    poster_path,
    // backdrop_path,
    // belongs_to_collection,
  } = resp.data;

  return {
    id,
    genres: genres.map(genre => genre.name).join(", "),
    overview,
    title,
    userScore: vote_average * 10,
    img: poster_path,
  };
};

const getCastByMovieId = async movieId => {
  const resp = await axios.get(
    `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}` //&language=ru-RU`
  );

  return resp.data.cast.map(el => {
    return {
      name: el.name,
      character: el.character,
      img: el.profile_path,
    };
  });
};

const getReviewsByMovieId = async movieId => {
  const resp = await axios.get(
    `${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}` //&language=ru-RU`
  );

  return resp.data.results.map(el => {
    return {
      author: el.author,
      content: el.content,
    };
  });
};

export {
  getLangsApi,
  getGenresApi,
  getTrendMovies,
  getPopularMovies,
  getMovieById,
  getCastByMovieId,
  getReviewsByMovieId,
  movieSearch,
};
