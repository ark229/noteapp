const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

//Middleware
app.use(bodyParser.json());
app.use(cors());

//MongoDB Connection
const uri = 'mongodb://locolhost/noteapp';
mongoose.connect(uri, {useNewURLParser: true, useUnifiedTopology: true})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

//Routes
app.get('/', (req, res) => {
    res.send('Hello from the server!');
});

const notesRouter = require('./routes/notes');
app.use('/api/notes', notesRouter);

//Start the server
app.listen(PORT, () => {
    console.log(`The Server is running on port ${PORT}`);
});

