const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/flight', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const flightSchema = new mongoose.Schema({
    flightNumber: String,
    airlineId: { type: mongoose.Schema.Types.ObjectId, ref: 'Airline' },
    destination: String,
});
const Flight = mongoose.model('Flight', flightSchema);

const passengerSchema = new mongoose.Schema({
    name: String,
    flightId: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight' },
});
const Passenger = mongoose.model('Passenger', passengerSchema);

app.post('/api/flights', async (req, res) => {
    const flight = new Flight(req.body);
    await flight.save();
    res.status(201).send(flight);
});

app.get('/api/flights', async (req, res) => {
    const flights = await Flight.find().populate('airlineId');
    res.send(flights);
});

app.get('/api/flights/:id/passengers', async (req, res) => {
    const passengers = await Passenger.find({ flightId: req.params.id });
    res.send(passengers);
});

app.listen(3002, () => {
    console.log('Flight service running on port 3002');
});
