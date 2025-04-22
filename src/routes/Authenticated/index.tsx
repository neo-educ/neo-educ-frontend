import { Route } from "react-router-dom";
import Navbar from "../../components/layout/AppBar/Navbar";
import Home from "../../pages/Authenticated/Home/Home";
import ClassPlansPage from "../../pages/Authenticated/ClassPlan/page";
const routesConfig: {
  path: string;
  Component: React.ComponentType;
  key: string;
}[] = [
  {
    path: "/home",
    Component: Home,
    key: "login",
  },
  {
    path: "/planos-de-aulas",
    Component: ClassPlansPage,
    key: "Planos",
  }
];

export const routes = routesConfig.map(({ path, Component, key }) => (
  <Route
    path={path}
    element={
      <>
        <Navbar />
        <Component />
      </>
    }
    key={key}
  />
));
