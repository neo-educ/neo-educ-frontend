import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { routes } from './routes';
function App() {

  return (
    <Router>
      <Routes>
        {routes}
      </Routes>
    </Router>
  )
}

export default App
