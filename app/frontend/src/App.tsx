import { useContext } from 'react';
import MoviesList from './pages/movies/MoviesList';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/header/Navigation';
import MovieCreate from './pages/movies/MovieCreate';
import MovieEdit from './pages/movies/MovieEdit';
import Login from './pages/user/Login';
import Register from './pages/user/Register';
import { LoginContext } from './contexts/LoginContext';
import Search from './pages/search/Search';
import NotFound from './components/errors/NotFound';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GetAccessToken, SetUsername } from './components/JwtTokenData';
import axios from 'axios';

function App() {
  const { auth } = useContext(LoginContext);
  SetUsername('user_token');

  axios.defaults.headers.common['Authorization'] = `Bearer ${GetAccessToken()} `;

  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<MoviesList />} />
        {auth.isLoggedIn && (
          <>
            <Route path="/movies/create" element={<MovieCreate />} />
            <Route path="/movies/edit/:movieId" element={<MovieEdit />} />
          </>
        )}
        <Route path="/movies/:search" element={<Search />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} errorElement={<NotFound />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
