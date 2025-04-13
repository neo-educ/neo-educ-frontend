import { routes as authRoutes } from './Auth/index';
import { routes as landingPageRoutes } from './LandingPage/index';


export const routes=[
  ...landingPageRoutes,
...authRoutes
]