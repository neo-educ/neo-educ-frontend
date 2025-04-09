import { Route } from "react-router-dom";
import LandingPage from "../../pages/LandingPage/LandingPage";
const routesConfig: {
  path: string;
  Component: React.ComponentType;
  key: string;
}[] = [
  {
    path: "/",
    Component: LandingPage,
    key: "landing-page",
  },
];

export const routes = routesConfig.map(({ path, Component, key }) => (
  <Route path={path} element={<Component />} key={key} />
));
