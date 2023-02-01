import './appHeader.scss';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const AppHeader = () => {
    const{ pathname } = useLocation()
    
    return (
        <header className="app__header">
            <h1 className="app__title">
                <a href="https://developer.marvel.com">
                    <span>Marvel</span> information portal
                </a>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li><Link className={pathname==='/'?'active-route':''} to="/">Characters</Link></li>
                    /
                    <li><Link className={pathname==='/comics'?'active-route':''} to="/comics">Comics</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;