import express = require('express');
import axios from "axios";
import { validationResult, checkSchema } from 'express-validator';

// Create a new express app instance
const app: express.Application = express();

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get(
    '/api/search',
    checkSchema({
        text: {
            isLength: {
                errorMessage: 'Search text should be 3 or more characters',
                options: { min: 3 }
            }
        },
        type: {
            matches: {
                errorMessage: 'Search type should be either users, repositories or issues',
                options: [/\b(?:users|repositories|issues)\b/],
            }
        },
        page: {
            isInt: {
                errorMessage: 'Page number should be an valid integer',
                options: { min: 1 }
            },
            toInt: true
        },
        per_page: {
            isInt: {
                errorMessage: 'Records per page should be more than 0 and less than or equal to 100',
                options: { min: 1, max: 100 }
            },
            toInt: true
        }
    }),
    async (req: any, res: any) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { text, type, page, per_page} = req.query;

        try {
            const usersRes = await axios.get(
                `https://api.github.com/search/${type}?q=${text}&page=${page}&per_page=${per_page}`,
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