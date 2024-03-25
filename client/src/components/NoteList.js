import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { Container, Row, Col, Button, ListGroup } from 'react-bootstrap';

//CREATE NOTES
const NoteList = () => {
    const [notes, setNotes] = useState([]);
    const history = useHistory();

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/notes');
            setNotes(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    //EDIT NOTES
    const handleEdit = async id => {
        //Redirect to the edit note page
        history.push(`/edit/${id}`);
    }

    //DELETE NOTES
    const handleDelete = async id => {
        try {
            await axios.delete(`http://localhost:5000/api/notes/${id}`);
            fetchNotes()
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Container>
            <Row>
                <Col>
                   <h1>Notes</h1>
                   <Link to="/create">
                        <Button variant="primary" className="mb-3">Create Note</Button>
                   </Link>
                   <ListGroup>
                        {notes.map(note => (
                            <ListGroup.Item key={note._id}>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>{note.title}</div>
                                    <div>
                                        <Button variant="secondary" size="sm" onClick={() => handleEdit(note._id)}>Edit</Button>{' '}
                                        <Button variant="danger" size="sm" onClick={() => handleDelete(note._id)}>Delete</Button>
                                    </div>

                                </div>
                            </ListGroup.Item>
                        ))}
                   </ListGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default NoteList;