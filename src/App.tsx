import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { register } from 'swiper/element/bundle';
import {
  Home,
  About,
  NotFound,
  Callback,
  History,
  Profile,
  Search,
  TOS,
  Watch,
} from './index';

register();

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='*' element={<NotFound />} />
        <Route path='/callback' element={<Callback />} />
        <Route path='/istory' element={<History />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/TOS' element={<TOS />} />
        <Route path='/search' element={<Search />} />
        <Route path='/watch' element={<Watch />} />
      </Routes>
    </Router>
  );
}

export default App;
