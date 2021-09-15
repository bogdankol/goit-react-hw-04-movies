import { useState, useEffect, lazy, Suspense } from "react";
import {
  useParams,
  Route,
  NavLink,
  Switch,
  useRouteMatch,
  useHistory,
  useLocation,
} from "react-router-dom";
import { fetchById } from "../../../services/api";
import s from "./MovieDetailsPage.module.css";

const CastView = lazy(() => import("../CastView"));
const ReviewsView = lazy(() => import("../ReviewsView"));

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [info, setInfo] = useState(null);
  const [error, setError] = useState(null);
  const { url } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    fetchById(movieId)
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
        return Promise.reject(
          new Error(
            "there was a mistake on servers... I bet that*s Invaider Zim is hanging out!"
          )
        );
      })
      .then((data) => setInfo(data))
      .catch((err) => setError(err.message));
  }, [movieId]);

  const onGoBack = (e) => {
    history.push(location?.state?.from?.location ?? "/");
  };

  return (
    <>
    {error && <h2>{error}</h2>}
      {info && (
        <>
          <button type="button" onClick={onGoBack} className={s.button}>
            Push me and you'll see previous page :)
          </button>
          <div className={s.div}>
            <img
              src={`https://image.tmdb.org/t/p/w300${info.poster_path}`}
              alt={info.title}
              className={s.img}
            ></img>
            <div>
              <h2>
                {info.title} ({info.release_date.slice(0, 4)})
              </h2>
              <p>User Score: {info.vote_average * 10}%</p>
              <h3>Overview</h3>
              <p>{info.overview}</p>
              <h3>Genres</h3>
              <ul className={s.list}>
                {info.genres.map((el) => (
                  <li key={el.id} className={s.item}>
                    {el.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={s.additionalInfo}>
            Additional information:
            <ul>
              <li>
                <NavLink to={`${url}/cast`}>Casts</NavLink>
              </li>
              <li>
                <NavLink to={`${url}/reviews`}>Reviews</NavLink>
              </li>
            </ul>
          </div>

          <Suspense fallback={<div>...processing...processing!!!</div>}>
            <Switch>
              <Route path={`${url}/cast`}>
                <CastView id={movieId} />
              </Route>

              <Route path={`${url}/reviews`}>
                <ReviewsView id={movieId} />
              </Route>
            </Switch>
          </Suspense>
        </>
      )}
    </>
  );
}

export default MovieDetailsPage;
