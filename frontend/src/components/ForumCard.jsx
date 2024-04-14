import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ListGroup, Button } from "react-bootstrap";
import axios from "axios";

export default function ForumCard({ forum }) {
    const { _id: forumId, topic, description, author: authorId, comments } = forum;
    const user = useSelector((state) => state.user.value);
    const navigate = useNavigate();

    function handleDelete(e) {
        e.preventDefault();

        axios
            .delete(`/api/forums/${forumId}`)
            .then((res) => console.log(res.data.message))
            .catch(err => console.log("Could not delete a forum", err.message));
        navigate('/', { replace: true });
    }

    return (
        <ListGroup.Item key={forumId} className="my-3">
            <Link
                to={`/forums/${forumId}`}
                key={forumId}
            >
                <h4>{topic}</h4>
                {console.log(topic)}
            </Link>

            <p>{description}</p>
            {console.log(description)}
            <p>#comments ({comments.length})</p>
            {user.userId == authorId &&
                <Button className="button-sm float-end" variant="danger" onClick={handleDelete}>delete</Button>
            }
        </ListGroup.Item>
    );
}