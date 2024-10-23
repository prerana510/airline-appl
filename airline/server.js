const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/airline', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Airline Model
const airlineSchema = new mongoose.Schema({
    name: String,
    code: String,
});
const Airline = mongoose.model('Airline', airlineSchema);

// Flight Model (for reference)
const flightSchema = new mongoose.Schema({
    flightNumber: String,
    airlineId: { type: mongoose.Schema.Types.ObjectId, ref: 'Airline' },
    destination: String,
});
const Flight = mongoose.model('Flight', flightSchema);

// Airline Routes
app.post('/api/airlines', async (req, res) => {
    const airline = new Airline(req.body);
    await airline.save();
    res.status(201).send(airline);
});

app.get('/api/airlines', async (req, res) => {
    const airlines = await Airline.find();
    res.send(airlines);
});

// Get flights for a specific airline
app.get('/api/airlines/:id/flights', async (req, res) => {
    const flights = await Flight.find({ airlineId: req.params.id });
    res.send(flights);
});

// Start server
app.listen(3001, () => {
    console.log('Airline service running on port 3001');
});
