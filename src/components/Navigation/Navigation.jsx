
import {NavLink} from 'react-router-dom';
import s from './Navigation.module.css';

export default function Navigation () {

    return (
        <nav className={s.navigation}>
            <NavLink exact to="/" className={s.navLink} activeClassName={s.active}>HOME</NavLink>
            <NavLink to="/movies" exact className={s.navLink} activeClassName={s.active}>MOVIES</NavLink>
        </nav>
    )
}