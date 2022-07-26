import {/* useEffect,*/ useState } from "react";

import { getReviewsByMovieId } from "./js/api";

export default function Reviews(movie) {
  const [reviews, setReviews] = useState([]);

  getReviewsByMovieId(movie.id).then(setReviews);
  // useEffect(() => getReviewsByMovieId(movie.id).then(setReviews), [movie.id]);

  return (
    <>
      {reviews.length === 0 ? (
        <b>No one</b>
      ) : (
        <ul>
          {reviews.map(({ author, content }, idx) => (
            <li key={idx}>
              <span>
                <b>Author: {author} </b>
              </span>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
