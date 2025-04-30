import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

/* Pages */
import Landing from './pages/Landing/Landing';
import NotFound from './pages/Notfound/NotFound';
import Auth from './pages/Auth/Auth';
import Profile from './pages/Profile/Profile';
import SearchRun from './pages/RunRelated/SearchRun/SearchRun';
import DetailsRun from './pages/RunRelated/DetailsRun/DetailsRun';
import OrganizeForm from './pages/Profile/Organizer/OrganizeForm/OrganizeForm';
import OrgRunPage from './pages/Profile/Organizer/OrganizeRunPage/OrgRunPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth/signup" element={<Auth />} />
        <Route path="/auth/login" element={<Auth />} />
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/user/profile/organizer/runCreated" element={<OrgRunPage />} />
        <Route path="/user/search" element={<SearchRun />} />
        <Route path="/user/search/details" element={<DetailsRun />} />
        <Route path="/user/organizer/create" element={<OrganizeForm />} />

      </Routes>
    </Router>
  );
}

export default App;