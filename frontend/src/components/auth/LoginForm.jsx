import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/user";
import { Container, Form, Button } from "react-bootstrap";
import './Login.css';
export default function LoginForm() {


    const navigate = useNavigate();
    const dispatch = useDispatch();


    const [data, setData] = useState({
        "email": "",
        "password": ""
    });

    const [loginError, setLoginError] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();


        axios
            .post("https://movielib-4ebh.onrender.com/api/auth/login", data,
                { withCredentials: true })
            .then((res) => {

                dispatch(login({ userId: res.data, email: data.email, token: res.token, isLoggedIn: true }));
                setData({ email: "", password: "" });
                console.log("hello")
                navigate("/home");
            })
            .catch((err) => {
                console.log(err)
                if (err.response.status == 401) {
                    setLoginError(true);
                    setData({ email: "", password: "" });
                }
                console.log("hello" + err.message);
            });
    }

    function handleChange(e) {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    }

    function handleCancel(e) {
        setData({
            "name": "",
            "password": ""
        })
    }

    return (
        <div className="division">



            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                            <div className="mt-2">
                                <input id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={handleChange} />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                                <div className="text-sm">
                                    {loginError}
                                </div>
                            </div>
                            <div className="mt-2">
                                <input id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={handleChange} />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?
                        <Link to='/register' className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">CREATE ACCOUNT</Link>
                    </p>
                </div>
            </div>

        </div>
    )
}
