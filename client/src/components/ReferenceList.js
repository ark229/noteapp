import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Table, Form, FormControl, Button } from 'react-bootstrap';

const ReferenceList = () => {
    const [references, setReferences] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchReferences();
    }, []);

    const fetchReferences = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/references');
            setReferences(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleSearch = e => {
        setSearchTerm(e.target.value);
    };

    const filteredReferences = references.filter(reference =>
        reference.title.toLowerCase().includes(searchTerm.toLowerCase())
    
    );

    return (
       <Container>
            <Row>
                <Col>
                    <h1>References</h1>
                    <Form inline className='mb-3'>
                        <FormControl
                            type='text'
                            placeholder='Search references'
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </Form>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Year</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredReferences.map(reference => (
                                <tr key={reference._id}>
                                    <td>{reference.title}</td>
                                    <td>{reference.author}</td>
                                    <td>{reference.year}</td>
                                    <td>
                                        <Link to={`/references/${reference._id}`}>View</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
       </Container> 
    );
};

export default ReferenceList;