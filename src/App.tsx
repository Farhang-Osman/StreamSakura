import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { register } from 'swiper/element/bundle';
import NotFound from './pages/404';
import About from './pages/About';
import Callback from './pages/Callback';
import Home from './pages/Home';
import History from './pages/History';
import Profile from './pages/Profile';
import Search from './pages/Search';
import TOS from './pages/TOS-and-privacy-policy';
import Watch from './pages/Watch';
import { AuthProvider } from './client/useAuth';
import SideNavBar from './components/navigation/SideNavBar';
import TopNavBar from './components/navigation/TopNavBar';

register();

function App() {
  return (
    <Router>
      <AuthProvider>
        <TopNavBar />
        <SideNavBar />
        <Routes>
          {/* <Route path='/dfj' element={<sideBarNav />} /> */}
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='*' element={<NotFound />} />
          <Route path='/callback' element={<Callback />} />
          <Route path='/history' element={<History />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/TOS' element={<TOS />} />
          <Route path='/search' element={<Search />} />
          <Route path='/watch/:animeTitleAndId' element={<Watch />} />
          <Route
            path='/watch/:animeTitleAndId?episodeNumber'
            element={<Watch />}
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
