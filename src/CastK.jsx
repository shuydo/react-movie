import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import { toast } from 'react-toastify';
import { getCastByMovieId } from './js/api';

import CastMovie from 'components/CastMovie';

export default function Cast() {
  const [credits, setCredits] = useState(null);
  const [reqStatus, setReqStatus] = useState('idle');
  const { movieId } = useParams();

  useEffect(() => {
    async function fetchMovies(movieId) {
      try {
        setReqStatus('pending');
        const cast = await getCastByMovieId(movieId);
        setCredits(cast);
        setReqStatus('resolved');
      } catch (error) {
        setReqStatus('rejected');
        // toast.error(error.message);
      }
    }
    fetchMovies(movieId);
  }, [movieId]);

  return <CastMovie credits={credits} reqStatus={reqStatus} />;
}
