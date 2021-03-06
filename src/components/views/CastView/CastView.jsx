import { useState, useEffect } from "react";
import s from "./CastView.module.css";
import { fetchCast } from "../../../services/api";

function CastView({ id }) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCast(id)
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
        return Promise.reject(new Error("there was a mistake on servers..."));
      })
      .then(({ cast }) =>
        setData(cast.sort((a, b) => b.popularity - a.popularity).slice(0, 8))
      )
      .catch((err) => setError(err.message));
  }, []);

  return (
    <>
      {error && <h2>{error}</h2>}
      {data.length === 0 && <h2>no cast information available</h2>}
      {data.length > 0 && (
        <div className={s.div}>
            <ul>
              {data.map((el) => (
                <li key={el.name}>
                  <div>
                    <img
                      src={ el.profile_path ? `https://image.tmdb.org/t/p/w200${el.profile_path}` : 'https://iteam-by-goit.github.io/filmoteka/onerror.jpg'}
                      alt={el.name}
                      className={s.img}
                    />
                    <p>Actor: {el.name}</p>
                    <p>Character: {el.character}</p>
                  </div>
                </li>
              ))}
            </ul>
        </div>
      )}
    </>
  );
}

export default CastView;
