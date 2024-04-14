import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ListGroup, Button } from "react-bootstrap";
import axios from "axios";

export default function Comment({ data, forumId }) {
    const { _id, text, createdDate, author: authorId } = data;
    const user = useSelector((state) => state.user.value);
    const navigate = useNavigate();
    const [authorName, setAuthorName] = useState('');

    useEffect(() => {
        // Fetch username when the component mounts
        fetchUsername();
    }, []);

    async function fetchUsername() {
        try {
            const response = await fetch(`http://localhost:3001/api/user/username?userObjectId=${authorId}`)
            const data = await response.json();
            setAuthorName(data.username);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    function handleDelete(e) {
        e.preventDefault();

        axios
            .delete(`/api/forums/${forumId}/comments/${_id}`)
            .then((res) => {
                console.log(res.data.message);
                // Redirect to forums after deleting the comment
                navigate(`/forums`, { replace: true });
            })
            .catch(err => console.log("Could not delete a comment", err.message));
    }

    return (
        <ListGroup.Item as="li" key={_id}>
            <p>{text} - by {authorName}</p>
            {user.userId === authorId && (
                <Button className="button-sm" variant="danger" onClick={handleDelete}>delete</Button>
            )}
        </ListGroup.Item>
    );
}
