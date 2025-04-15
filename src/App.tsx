import { BrowserRouter as Router, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { routes } from "./routes";
function App() {
  return (
    <div className="min-h-screen bg-gradient-to-t from-gray-50 to-gray-200">
      <Router>
        <AuthProvider>
          <Routes>{routes}</Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
