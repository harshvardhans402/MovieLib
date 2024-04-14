import { useState, useEffect } from "react";
import axios from "axios";
import ForumCard from "./ForumCard";
import { Container, ListGroup, Form } from "react-bootstrap";
import Layout from "./Layout";

export default function ForumList() {
    const [forums, setForums] = useState([]);
    const [filteredForums, setFilteredForums] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        axios
            .get("/api/forums")
            .then((res) => {
                setForums(res.data);
                setFilteredForums(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        const filtered = forums.filter((forum) =>
            forum.topic.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredForums(filtered);
    }, [searchQuery, forums]);

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <div>
            <Layout />
            <Container>
                <h4 className="my-3">Forums</h4>
                {/* Search bar */}
                <Form.Group controlId="formSearch">
                    <Form.Control
                        type="text"
                        placeholder="Search forums by topic..."
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                    />
                </Form.Group>
                <ListGroup variant="flush" as="ul" className="list-unstyled">
                    {filteredForums.map((forum) => (
                        <ForumCard key={forum.id} forum={forum} />
                    ))}
                </ListGroup>
            </Container>
        </div>
    );
}
