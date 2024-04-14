import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Form, Button } from "react-bootstrap";
import Layout from "./Layout";

export default function ForumForm() {

  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value);

  const [data, setData] = useState({
    "topic": "",
    "description": ""
  });

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post("/api/forums",
        {
          ...data,
          "author": user.userId
        },
        { withCredentials: true })
      .then((res) => {
        setData({ topic: "", description: "" });
        console.log(res.data.message);
      })
      .catch((err) => {
        console.log("Error couldn't create forum");
        console.log(err.message);
      });

    navigate("/forums")
  }

  function handleChange(e) {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  }

  return (

    <div>
      <Layout />
      <Container>
        <h4 className="my-3">Add a new forum</h4>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" >
            <Form.Label>Forum topic</Form.Label>
            <Form.Control
              type="text"
              name="topic"
              placeholder="Enter forum topic here"
              onChange={handleChange}
              defaultValue={data.topic}
            />
          </Form.Group>

          <Form.Group className="mb-3" >
            <Form.Label>Forum Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              placeholder="Enter forum description here"
              onChange={handleChange}
              defaultValue={data.description}
            />
          </Form.Group>
          <Button variant="success" type="submit">Create</Button>
        </Form>
      </Container>
    </div>
  )
}