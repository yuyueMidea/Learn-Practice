import { NavLink } from 'react-router-dom';
import { routes } from '../routes';

export const Menu = () => {
  return (
    <div className="menu">
      <ul className="menu-list">
        {routes
          .filter((route) => route.path !== '*')
          .map((route) => (
            <li key={route.path}>
              <NavLink
                to={route.path}
                className={({ isActive }) => 
                  isActive ? 'menu-item active' : 'menu-item'
                }
              >
                {route.name}
              </NavLink>
            </li>
          ))}
      </ul>
    </div>
  );
};