import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoutes from './components/auth/ProtectedRoutes';
import RegisterForm from './components/auth/RegisterForm';
import LoginForm from './components/auth/LoginForm';
import LogoutForm from './components/auth/LogoutForm';
import ForumForm from './components/ForumForm';
import ForumList from './components/ForumList';
import ForumPage from './components/ForumPage';
import Layout from "./components/Layout";
import Home from "./components/Home";
import { useSelector } from "react-redux";
function App() {
  const isAuthenticated = useSelector((state) => state.user.value);
  console.log(isAuthenticated.isLoggedIn)
  return (

    <div className="app-contents">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} ></Route>
          <Route path='/register' element={<RegisterForm />} />
          <Route path='/create-forum' element={<ProtectedRoutes isAuthenticated={isAuthenticated.isLoggedIn} />} >

          </Route>
          <Route path='logout' element={<LogoutForm />} />
          <Route path='login' element={<LoginForm />} />
          <Route path='forums' element={<ForumList />} />
          <Route path='forums/:forumId' element={<ForumPage />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
