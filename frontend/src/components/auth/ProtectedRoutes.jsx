// ProtectedRoutes.js
import { Outlet, Route, Routes } from "react-router-dom";
import LoginForm from "./LoginForm";
import ForumForm from "../ForumForm";

export default function ProtectedRoutes({ isAuthenticated }) {
    return (
        <div>
            {
            (isAuthenticated ) ?
            <ForumForm /> :
            
             <LoginForm />
            }




        </div>



    );
}
