import { Switch, Route } from "react-router-dom";
import {lazy, Suspense} from 'react';
import Navigation from './components/Navigation';

const HomePage = lazy(() => import('./components/views/HomePageView'))
const MoviesPage = lazy(() => import('./components/views/MoviesPageView'))
const MovieDetailsPage = lazy(() => import('./components/views/MovieDetailsPageView'))

function App() {
  return (
    <div className="App">
      <Navigation />
      <Suspense fallback={<div>...processing...processing!!!</div>}>

        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>

          <Route path="/movies" exact>
            <MoviesPage />
          </Route>

          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
