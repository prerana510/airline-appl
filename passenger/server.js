const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/passenger', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const passengerSchema = new mongoose.Schema({
    name: String,
    flightId: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight' },
});
const Passenger = mongoose.model('Passenger', passengerSchema);

app.post('/api/passengers', async (req, res) => {
    const passenger = new Passenger(req.body);
    await passenger.save();
    res.status(201).send(passenger);
});

app.get('/api/passengers', async (req, res) => {
    const passengers = await Passenger.find().populate('flightId');
    res.send(passengers);
});

app.listen(3003, () => {
    console.log('Passenger service running on port 3003');
});
