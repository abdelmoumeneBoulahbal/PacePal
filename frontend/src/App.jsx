import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

/* Pages */
import Landing from './pages/Landing/Landing';
import NotFound from './pages/Notfound/NotFound';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </Router>
  );
}

export default App;