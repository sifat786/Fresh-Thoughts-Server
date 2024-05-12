const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

//* Middleware:
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true,
    optionsSuccessStatus: 200
}));
app.use(express.json());


app.use('/', (req, res) => {
    res.send('server is running');
})

app.listen(port, () => {
    console.log(`server is running on port : ${port}`);
})