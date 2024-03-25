import React, { useState } from 'react';
import axios from 'axios';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor} from 'react-draft-wysiwyg';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const CreateNote = () => {
    const [title, setTitle] = useState('');
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const handleSubmit = async e => {
        e.preventDefault();

        const contentState = editorState.getCurrentContent();
        const rawContent = convertToRaw(contentState);

        const newNote = {
            title,
            content: JSON.stringify(rawContent)
        };

        try {
            await axios.post('http://localhost:5000/api/notes', newNote);
            setTitle('');
            setEditorState(EditorState.createEmpty());
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Container>
            <Row>
                <Col>
                    <h1>Create Note</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control 
                                type="text"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                            />    
                        </Form.Group>
                        <Form.Group controlId="content">
                            <Form.Label>Content</Form.Label>
                            <Editor
                                editorState={editorState}
                                onEditorStateChange={setEditorState}
                                wrapperClassName="editor-wrapper"
                                editorClassName="editor"
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">Create</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default CreateNote;