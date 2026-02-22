import { StrictMode } from 'react';
import { createRouter, RouterProvider, createRoute, createRootRoute } from '@tanstack/react-router';
import GamePage from './pages/GamePage';
import LandingPage from './pages/LandingPage';
import GameLayout from './components/Layout/GameLayout';

const rootRoute = createRootRoute({
  component: GameLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: LandingPage,
});

const gameRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/game',
  component: GamePage,
});

const routeTree = rootRoute.addChildren([indexRoute, gameRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}
