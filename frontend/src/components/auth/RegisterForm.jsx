import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
import './register.css'

export default function RegisterForm() {
    let navigate = useNavigate();

    const [data, setData] = useState({
        email: "",
        password: "",
        name: "",

    });

    function handleSubmit(e) {
        e.preventDefault();
        axios
            .post("https://movielib-4ebh.onrender.com/api/auth/register", data, { withCredentials: true })
            .then((res) => {
                console.log(res);
                setData({ email: "", password: "", name: "" });
            })
            .catch((err) => {
                console.log("Error couldn't create forum");
                console.log(err.message);
            });

        navigate("/login");
    }

    function handleChange(e) {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    }

    function handleCancel(e) {
        setData({
            email: "",
            password: "",
            name: "",

        });
    }

    return (
        <div className='p-10 flex place-content-center'>
            <Card className="shadow-lg p-3">
                <Typography variant="h4" color="blue-gray">
                    Sign Up
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    Nice to meet you! Enter your details to register.
                </Typography>
                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 " onSubmit={handleSubmit}>
                    <div className="mb-1 flex flex-col gap-6">
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Your Name
                        </Typography>
                        <Input
                            size="lg"
                            placeholder="name"
                            name='name'
                            defaultValue={data.name}
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Your Email
                        </Typography>
                        <Input
                            size="lg"
                            name='email'
                            defaultValue={data.value}
                            placeholder="name@mail.com"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            onChange={handleChange}
                        />
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Password
                        </Typography>
                        <Input
                            type="password"
                            size="lg"
                            placeholder="********"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            name="password"
                            defaultValue={data.password}
                            onChange={handleChange}
                        />
                    </div>

                    <Button type="submit" className="mt-6" style={{ background: 'black' }} fullWidth>
                        Sign up
                    </Button>
                    <Typography color="gray" className="mt-4 text-center font-normal">
                        Already have an account?{" "}
                        <Link to='/login' className="font-medium text-gray-900">
                            Sign In
                        </Link>
                    </Typography>
                </form>
            </Card>
        </div>
    );
}
