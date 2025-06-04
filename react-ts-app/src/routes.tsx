import { JSX, lazy } from 'react';
// import { RouteObject } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home.tsx'));
const About = lazy(() => import('./pages/About.tsx'));
const Contact = lazy(() => import('./pages/Contact.tsx'));
const NotFound = lazy(() => import('./pages/NotFound.tsx'));

interface IRoute {
  name: string;
  path: string;
  element: React.ReactNode;
  component: React.LazyExoticComponent<() => JSX.Element>;
}

export const routes: IRoute[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    element: <Home />,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    element: <About />,
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
    element: <Contact />,
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound,
    element: <NotFound />,
  },
];