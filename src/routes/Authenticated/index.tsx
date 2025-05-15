import { Route } from "react-router-dom";
import Navbar from "../../components/layout/AppBar/Navbar";
import ClassPlansPage from "../../pages/Authenticated/ClassPlan/page";
import Home from "../../pages/Authenticated/Home/Home";
import { PageMaterialGeneration } from "../../pages/Authenticated/materialGeneration/page";
import Students from "../../pages/Authenticated/Students/Students";
const routesConfig: {
  path: string;
  Component: React.ComponentType;
  key: string;
}[] = [
  {
    path: "/home",
    Component: Home,
    key: "Login",
  },
  {
    path: "/planos-de-aulas",
    Component: ClassPlansPage,
    key: "Planos",
  },
  {
    path: "/geracao-de-materiais",
    Component: PageMaterialGeneration,
    key: "GeracaoDeMateriais",
  },
  {
    path: "/gerenciamento-de-alunos",
    Component: Students,
    key: "Students",
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
