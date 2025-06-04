import { Link } from 'react-router-dom';
import { routes } from '../routes.tsx';

export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-logo">
          MyApp
        </Link>
      </div>
      <div className="navbar-menu">
        {routes
          .filter((route) => route.path !== '*' && route.path !== '/')
          .map((route) => (
            <Link key={route.path} to={route.path} className="navbar-item">
              {route.name}
            </Link>
          ))}
      </div>
    </nav>
  );
};