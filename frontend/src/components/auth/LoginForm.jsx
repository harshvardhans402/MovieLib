import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../../features/user";
import { Container, Form, Button } from "react-bootstrap";
import Layout from "../Layout";
export default function LoginForm() {


    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [data, setData] = useState({
        "username": "",
        "password": ""
    });

    const [loginError, setLoginError] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();

        axios
            .post("/api/auth/login", data,
                { withCredentials: true },)
            .then((res) => {
                dispatch(login({ userId: res.data, username: data.username, isLoggedIn: true }));
                setData({ username: "", password: "" });
                navigate("/forums");
            })
            .catch((err) => {
                if (err.response.status == 401) {
                    setLoginError(true);
                    setData({ username: "", password: "" });
                }
                console.log("Error couldn't create user" + err.message);
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
            "username": "",
            "password": ""
        })
    }

    return (
        <div>
            <Layout />
            <div style={{ backgroundColor: 'red', height: '50vh', width: '50%', margin: '100px auto' }}>
                <Container>
                    <h4 className="my-3">Login here</h4>
                    {loginError && <p >Username or password is incorrect</p>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" >
                            <Form.Label htmlFor="username"> Username </Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                placeholder='Enter your email...'
                                onChange={handleChange}
                                defaultValue={data.username}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label htmlFor="password"> Password </Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder='Enter your password...'
                                onChange={handleChange}
                                defaultValue={data.password}
                            />
                        </Form.Group>
                        <Button type="submit" variant="primary" className="mx-2">Login</Button>
                        <Button onClick={handleCancel} variant="outline-secondary" className="mx-2">Cancel</Button>
                        <p className="mt-3">New user? sign up here
                            <Link to="/register" >Sign up</Link>
                        </p>
                    </Form>
                </Container>
            </div>
        </div>

    )
}