import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

/* Pages */
import Landing from './pages/Landing/Landing';
import NotFound from './pages/Notfound/NotFound';
import Auth from './pages/Auth/Auth';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path='/auth' element={ <Auth /> } />
      </Routes>
    </Router>
  );
}

export default App;