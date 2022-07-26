import { useEffect, useState } from "react";
import {
  Link,
  // useRouteMatch,
  useMatch,
  useLocation,
  useNavigate,
  // useHistory,
} from "react-router-dom";
import { movieSearch } from "./js/api";

export default function MoviesPage() {
  const [movies, setMovie] = useState(null);
  // const { url } = useRouteMatch();  // useMatch now in RrDv.6
  const { pathname } = useMatch(":movieId");
  // console.log("useMatch in Movies ", useMatch(":movieId"));
  //   {
  //     path: "/movies/:movieId",
  //     caseSensitive: false,
  //     end: true,
  //   },
  //   "/movies/123"
  // );
  // const history = useHistory();
  const history = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    if (!query) return;
    movieSearch(query).then(setMovie);
  }, [query]);

  return (
    <>
      <form
        onSubmit={e => {
          e.preventDefault();
          const query = e.target.elements.query.value;
          history(`?query=${query}`);
          // history.push({ ...location, search: `query=${query}` });
          e.target.elements.query.value = ""; // query.trim() === ''
        }}
      >
        <input name="query" />
        <button style={{ marginLeft: "8px" }}>Search</button>
      </form>
      <ul>
        {movies &&
          movies.map(movie => (
            <li key={movie.id}>
              <Link
                to={{
                  pathname: `${pathname}/${movie.id}`,
                  // pathname: `${url}/${movie.id}`,
                  state: { from: location },
                }}
              >
                {movie.title}
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
}
