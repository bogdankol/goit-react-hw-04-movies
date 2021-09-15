import { useState, useEffect } from "react";
import { Link, useLocation, } from "react-router-dom";
import { fetchTrending } from "../../../services/api";

function HomePage() {
  const [moviesArray, setMoviesArray] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    fetchTrending()
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
        return Promise.reject(
          new Error(
            "there was a mistake on servers..."
          )
        );
      })
      .then(({ results }) => {
        setMoviesArray(results);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  return (
    <>
    {error && <h2>{error}</h2>}
    {moviesArray.length > 0 && 
      <div>
      <ul>{moviesArray.map(el => <li key={el.id}>
          <Link to={{pathname: `/movies/${el.id}`, state: {from: location}}}>
              {el.title}
            </Link>
          </li>)}
          </ul>
    </div>}
    </>
    
  );
}
export default HomePage;
