import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import FullCalendar from '@fullcalendar/react';
import dayGirdPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

const Calendar = () => {
    const [events, setEvents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/events');
        } catch (err) {
            console.log(err);
        }
    };

    const handleCloseModal = () => {
        setSelectedEvent(null);
        setShowModal(false);
    };

    return (
        <Container>
            <Row>
                <Col>
                    <h1>Calendar</h1>
                    <FullCalendar
                        plugins={[dayGirdPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        events={events}
                        eventClick={handleEventClick}
                    />
                </Col>
            </Row>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedEvent?.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{selectedEvent?.extendedProps.description}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleCloseModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default Calendar;