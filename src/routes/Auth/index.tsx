import { Route } from "react-router-dom";
import Login from "../../pages/Auth/Login/Login";
import Signup from "../../pages/Auth/Signup/Signup";
const routesConfig: {
  path: string;
  Component: React.ComponentType;
  key: string;
}[] = [
    {
        path: "/auth/login",
        Component: Login,
        key: "login",
    },
  {
    path: "/auth/signup",
    Component: Signup,
    key: "signup",
  },
];

export const routes = routesConfig.map(({ path, Component, key }) => (
  <Route path={path} element={<Component />} key={key} />
));
