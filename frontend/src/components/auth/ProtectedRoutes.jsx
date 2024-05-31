// ProtectedRoutes.js
import LoginForm from "./LoginForm";
import Home from "../Home";
import { deserializeState } from '../../features/common.js'

export default function ProtectedRoutes() {

    const initialState = deserializeState();
    console.log(initialState)
    let isLoggedIn = false;
    // console.log(initialState.userId)
    console.log("dfjsdklf")
    if (initialState) {
        isLoggedIn = initialState.isLoggedIn;
        console.log
    }

    return (
        <div>
            {
                (isLoggedIn) ?
                    <Home /> :

                    <LoginForm />
            }




        </div>



    );
}
