import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Comment from "./Comment";
import CommentForum from "./CommentForm";
import { Container, Alert, ListGroup } from "react-bootstrap";
import Layout from "./Layout";

export default function ForumPage() {

    const [comments, setComments] = useState([]);
    const [data, setData] = useState({
        "topic": "",
        "description": ""
    });
    const params = useParams();
    const user = useSelector((state) => state.user.value);

    const topic = " topic from store";
    const description = "description from store";

    useEffect(() => {
        axios
            .get(`/api/forums/${params.forumId}`)
            .then((res) => {
                setData({
                    topic: res.data.topic,
                    description: res.data.description
                })
                setComments(res.data.comments);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div><Layout />
            <Container className="me-auto my-3">
                <Alert><h4 className="my-1 " >{data.topic}</h4></Alert>
                <p>{data.description}</p>
                {user.isLoggedIn && <CommentForum forumId={params.forumId} />}
                <ListGroup variant="flush" as="ul" className="list-unstyled">
                    {comments.map((comment) => (
                        <ListGroup.Item li="li" >
                            <Comment forumId={params.forumId} data={comment} />
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Container>
        </div>
    );
}