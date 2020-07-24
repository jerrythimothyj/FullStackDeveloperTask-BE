import express = require('express');
import axios from "axios"

// Create a new express app instance
const app: express.Application = express();

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/api/search', async (req, res) => {
    const { text, type } = req.query;

    try {
        const usersRes = await axios.get(
            `https://api.github.com/search/${type}?q=${text}`,
            { headers: { Authorization: `token 8db0c1b68f1198949a7dfafd7b2dbd110a721e29` } }
        )
        return res.send(usersRes.data);
    }
    catch (err) {
        return res.send(err);
    }
});


app.listen(4000, function () {
    console.log('App is listening on port 4000!');
});