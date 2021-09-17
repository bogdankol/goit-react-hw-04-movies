import { useState, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { fetchByQuery } from "../../../services/api";
import s from "./MoviesPage.module.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MoviesPage() {
  const [inputValue, setInputValue] = useState("");
  const [doSearch, setDoSearch] = useState(false);
  const [array, setArray] = useState([]);
  const [error, setError] = useState(null);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (location.search !== "") {
      const searchUrl = location.search.split("");
      const searchToRemove = searchUrl.slice(0, 7);
      const forInput = searchUrl
        .filter((el, idx) => el !== searchToRemove[idx])
        .join("");
      setInputValue(forInput);
      setDoSearch(true);
    }
  }, []);

  useEffect(() => {
    if (doSearch) {
      fetchByQuery(inputValue)
        .then((resp) => {
          if (resp.ok) {
            return resp.json();
          }
          return Promise.reject(new Error("there was a mistake on servers..."));
        })
        .then(({ results }) => {
          if (results.length === 0) {
            toast("No results! I bet you find something next time", {
              position: "top-center",
              autoClose: 3000,
              closeOnClick: true,
            });
            return;
          }
          setArray(results);
          history.push({
            pathname: location.pathname,
            search: `?query=${inputValue}`,
          });
        })
        .catch((err) => setError(err.message))
        .finally(() => {
          setInputValue("");
          setDoSearch(false);
        });
    }
  }, [doSearch]);

  const onChange = (e) => {
    setInputValue(e.currentTarget.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (inputValue === "") {
      return;
    }

    setDoSearch(true);
  };
  return (
    <>
      {error && <h2>{error}</h2>}
      {!error && (
        <div className={s.div}>
          <ToastContainer />
          <form onSubmit={onSubmit}>
            <input type="text" value={inputValue} onChange={onChange} />
            <button type="submit">Search</button>
          </form>
          <ul>
            {array.map((el) => (
              <li key={el.id}>
                <Link
                  to={{
                    pathname: `/movies/${el.id}`,
                    state: { from: { location, search: inputValue } },
                  }}
                >
                  {el.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default MoviesPage;
