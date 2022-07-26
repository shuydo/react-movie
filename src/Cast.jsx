import { /*useEffect,*/ useState } from "react";

import { getCastByMovieId } from "./js/api";
import dummyImg from "./img/dummy.png";
console.log("Cast mdl");
export default function Cast(movie) {
  const [cast, setCast] = useState(null);

  getCastByMovieId(movie.id).then(setCast);
  // useEffect(() => getCastByMovieId(movie.id).then(setCast), [movie.id]);

  return (
    <>
      <ul
        style={{
          display: "flex",
          flexWrap: "wrap",
          listStyle: "none",
        }}
      >
        {cast &&
          cast.map(({ img, name, character }, idx) => (
            <li
              key={idx}
              style={{
                width: 125,
              }}
            >
              {img && (
                <img
                  src={`https://image.tmdb.org/t/p/w154${img}`} // w45,92,154,185,300,500,original
                  alt={name}
                  width="124"
                ></img>
              )}

              {!img && <img src={dummyImg} alt={name} width="124"></img>}
              <p>{name}</p>

              <span>Character: </span>
              <span>{character}</span>
            </li>
          ))}
      </ul>
    </>
  );
}
