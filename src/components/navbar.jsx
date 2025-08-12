import { Link } from 'react-router-dom';
import '../css/navbar.css';
export default function Navbar() {
    return (
            <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">Movies4u</Link>
            </div>
            <div className="navbar-links">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/favourites" className="nav-link">Favourites</Link>
            </div>    
            </nav>
    );
}
