import { Route } from "react-router-dom";
import CadastroAluno from "../../pages/CadastroAluno/CadastroAluno";

const routesConfig: {
  path: string;
  Component: React.ComponentType;
  key: string;
}[] = [
  {
    path: "convite/:token", // Alterado de :id para :token
    Component: CadastroAluno,
    key: "CadastroAluno",
  },
];

export const routes = routesConfig.map(({ path, Component, key }) => (
  <Route
    path={path}
    element={
      <>
        <Component />
      </>
    }
    key={key}
  />
));
