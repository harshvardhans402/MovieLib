import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logout } from "../../features/user";
import { Container, Form, Button } from "react-bootstrap";
import Layout from "../Layout";

export default function LogoutForm() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleSubmit(e) {
        e.preventDefault();

        axios
            .post("/api/auth/logout",
                { withCredentials: true },)
            .then((res) => {
                dispatch(logout());
                navigate("/");
            })
            .catch((err) => {
                if (err) {
                    console.log("Not able to log out" + err.message);
                }
            });
    }

    return (
        <div>
            <Layout />
            <Container>
                <Form onSubmit={handleSubmit} >
                    <p>Are you sure want to logout?</p>
                    <Button variant="success" className="m-3" type="submit">Yes</Button>
                    <Button className="m-3" variant="outline-danger">No</Button>
                </Form>

            </Container>
        </div>
    )
}