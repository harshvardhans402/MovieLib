import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Form, Button } from "react-bootstrap";

export default function CommentForum({ forumId }) {

  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value);

  const [data, setData] = useState({
    "text": "",
  });

  function handleSubmit(e) {
    e.preventDefault();

    axios
        .post(`/api/forums/${forumId}/comments`, 
        {...data, "author": user.userId},
        { withCredentials: true })
        .then((res) => {
            setData({ text: "" });
            console.log(res.data.message);
        })
        .catch((err) => {
            console.log("Error couldn't add comment");
            console.log(err.message);
        });
    
    navigate(`/forums`)
  }

  function handleChange(e) {
    setData({
      ...data,
      [e.target.name] : e.target.value
    });
  }

  return (
      <Container>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" >
          <Form.Label>New comment</Form.Label>
          <Form.Control 
            type="text"
            name="text"
            placeholder='Enter a new comment...'
            onChange={handleChange}
            defaultValue={data.text}
          />
          </Form.Group>
          <Button type="submit" variant="success" >Add comment</Button>
        </Form>
      </Container>
  )
}