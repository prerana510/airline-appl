const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/airline', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const airlineSchema = new mongoose.Schema({
    name: String,
    code: String,
});
const Airline = mongoose.model('Airline', airlineSchema);


app.post('/api/airlines', async (req, res) => {
    const airline = new Airline(req.body);
    await airline.save();
    res.status(201).send(airline);
});

app.get('/api/airlines', async (req, res) => {
    const airlines = await Airline.find();
    res.send(airlines);
});

app.listen(3001, () => {
    console.log('Airline service running on port 3001');
});
