import { Route } from "react-router-dom";
import Login from "../../pages/Auth/Login/Login";
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
//   {
//     path: "/auth/register",
//     Component: ,
//     key: "register",
//   },
];

export const routes = routesConfig.map(({ path, Component, key }) => (
  <Route path={path} element={<Component />} key={key} />
));
