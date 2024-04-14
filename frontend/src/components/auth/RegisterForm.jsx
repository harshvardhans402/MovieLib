import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";
import Layout from "../Layout";
export default function RegisterForm() {

    let navigate = useNavigate();

    const [data, setData] = useState({
        "username": "",
        "password": ""
    });

    function handleSubmit(e) {
        e.preventDefault();
        axios
            .post("/api/auth/register", data, 
            { withCredentials: true})
            .then((res) => {
                console.log(res);
                setData({ username: "", password: "" });
            })
            .catch((err) => {
                console.log("Error couldn't create forum");
                console.log(err.message);
            });
        
        navigate("/login")
    }

    function handleChange(e) {
        setData({
          ...data,
          [e.target.name] : e.target.value
        });
    }

    function handleCancel(e) {
        setData({
            "username": "",
            "password": ""
        })
    }

    return (
        <div>  <Layout/>
        <Container>
          
            <h4 className="my-3">Sign up here</h4>
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
                <Button type="submit" variant="primary" className="mx-2">Register</Button>
                <Button onClick={handleCancel} variant="outline-secondary" className="mx-2">Cancel</Button>
            </Form>
        </Container>
        </div>
    )
}