import { useEffect, useState, useRef, Suspense, lazy } from "react";
import {
  Link,
  Route,
  Routes,
  useNavigate, // useHistory,
  useLocation,
  useParams, // useMatch, // Outlet, // useRouteMatch,
} from "react-router-dom";

import dummyImg from "./img/dummy.png";
import { getMovieById } from "./js/api";
// import Cast from "./Cast"; 

const Cast = lazy(() => import("./Cast" /* webpackChunkName: "Cast" */));
const Reviews = lazy(() => import("./Reviews" /* wPChankN: "Reviews" */));

const useGoBackToMoviesPage = () => {
  const routerState = useRef(null);

  const location = useLocation();
  const history = useNavigate();
  // const history = useHistory();

  useEffect(() => {
    if (!routerState.current) routerState.current = location.state;
  }, [location.state]);

  const handleGoBack = () => {
    const url = routerState.current ? routerState.current.from : "/";
    history.push(url);
  };

  return { goBack: handleGoBack };
};

export default function Movie() {
  const { movieId } = useParams();
  // const { pathname } = useMatch(window.location.pathname); //":movieId"
  // console.log("useMatch in Movie ", useMatch(window.location.pathname));

  const { goBack } = useGoBackToMoviesPage();

  const [movie, setMovie] = useState(null);
  let img = dummyImg;

  // useEffect(() => getMovieById(movieId).then(setMovie).catch(console.log), [movieId]);
  useEffect(() => {
    const get = async () => await getMovieById(movieId).then(setMovie);
    get();
  }, [movieId]);

  if (movie && movie.img !== null)
    img = `https://image.tmdb.org/t/p/w500${movie.img}`;

  return (
    <>
      <button onClick={goBack} style={{ marginBottom: "8px" }}>
        Go Back
      </button>
      {movie && (
        <div>
          <div className="movieMainInfo">
            <img src={img} alt={movie.title} width="250"></img>
            <div className="movieTextInfo">
              <h2>{movie.title}</h2>

              <h4>User Score: </h4>
              <span>{movie.userScore}%</span>

              <h4>Overview: </h4>
              <p>{movie.overview}</p>

              <h4>Genres: </h4>
              <p>{movie.genres}</p>
            </div>
          </div>
          <hr />

          <p>Addidional information</p>
          <Suspense fallback={<h1>Loading addInfo...</h1>}>
            <ul className="addInf">
              <li>
                <p>
                  <Link to="cast" style={{ marginRight: "25px" }}>
                    Cast
                  </Link>
                  {/* <Link to={`${pathname}/cast`} style={{ marginRight: "25px" }}> */}
                </p>
              </li>

              <li>
                <p>
                  <Link to="reviews">Reviews</Link>
                  {/* <Link to={`${pathname}/reviews`}>Reviews</Link> */}
                </p>
              </li>
            </ul>
            <Routes>
              {/* <Route
                path={`${pathname}/cast`}
                render={() => {
                  return movieId && <Cast1 id={movieId} />;
                }}
              />
              <Route
                path={`${pathname}/reviews`}
                render={() => {
                  return movieId && <Reviews id={movieId} />;
                }}
              /> */}
              <Route path="cast" element={<Cast id={movieId} />} />
              <Route path="reviews" element={<Reviews id={movieId} />} />
            </Routes>
            {/* <Outlet /> */}
          </Suspense>

          <hr />
        </div>
      )}
    </>
  );
} // This movie haven't reviews yet // No reviews for this movie yet ...
