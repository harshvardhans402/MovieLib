import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoutes from './components/auth/ProtectedRoutes';
import RegisterForm from './components/auth/RegisterForm';
import PlaylistDetails from "./components/PlaylistDetails";

import './components/Home.css';




function App() {



  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<RegisterForm />} />
          <Route path='/login' element={<ProtectedRoutes />} />
          <Route path='/' element={<ProtectedRoutes />} />
          <Route path='/home' element={<ProtectedRoutes />} />
          <Route path="/playlists/:playlistId" element={<PlaylistDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
