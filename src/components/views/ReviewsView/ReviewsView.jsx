import {useState, useEffect} from 'react';
import s from './ReviewsView.module.css';
import {fetchReviews} from '../../../services/api';

function ReviewsView({id}) {
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchReviews(id)
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
        .then(({results}) => setReviews(results))
        .catch((err) => setError(err.message))
    }, []);
    
    return (
        <>
        {error && <h2>{error}</h2>}
        {reviews.length === 0 && <p>No reviews have been posted</p>}
        {reviews.length > 0  && 
        <div className={s.div}>
            {reviews.map(el => <li key={el.id}>
                <h3>{el.author}</h3>
                <p>{el.content}</p>
                </li>)}
        </div>}
        </>
        
    )
}

export default ReviewsView
