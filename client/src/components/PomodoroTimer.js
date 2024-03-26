import React, { useState, useEffect } from 'react';
import { Card, Button, ProgressBar } from 'react-bootstrap';

const PomodoroTimer = () => {
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [audioStart] = useState(new Audio('path/to/start-sound.mp3')); //add path to start sound here
    const [audioEnd] = useState(new Audio('path/to/end-sound.mp3'));

    useEffect(() => {
        let interval = null;

        if (isRunning && (minutes > 0 || seconds > 0)) {
            interval = setInterval(() => {
                if (seconds > 0) {
                    setSeconds(seconds - 1);
                } else if (minutes > 0) {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            }, 1000);
        } else if (!isRunning && minutes === 0 && seconds === 0) {
            //Timer Completed
            setIsRunning(false);
            setMinutes(25);
            setSeconds(0);
            audioEnd.play();
        }

        return () => clearInterval(interval);
    }, [isRunning, minutes, seconds, audioEnd]);

    const startTimer = () => {
        setIsRunning(true);
        audioStart.play();
    };

    const stopTimer = () => {
        setIsRunning(false);
    };

    const resetTimer = () => {
        setIsRunning(false);
        setMinutes(25);
        setSeconds(0);
    };

    //user interface
    return (
        <Card>
            <Card.Body>
                <Card.Title>Pomodoro Timer</Card.Title>
                <Card.Text className='display-4'>
                    {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
                </Card.Text>
                <ProgressBar now={(minutes * 60 + seconds) / (25 * 60) * 100} />
                <div className='mt-3'>
                    <Button variant='primary' onClick={startTimer} disabled={isRunning}>Start</Button>{' '}
                    <Button variant='secondary' onClick={stopTimer} disabled={!isRunning}>Stop</Button>{' '}
                    <Button variant='danger' onClick={resetTimer}>Reset</Button>
                </div>
            </Card.Body>
        </Card>
    );

};

export default PomodoroTimer;