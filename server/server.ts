import express = require('express');
import axios from "axios";
import { validationResult, checkSchema } from 'express-validator';

import redis from "redis";

//setup port constants
const port_redis = Number(process.env.PORT) || 6379;
const port = Number(process.env.PORT) || 5000;

//configure redis client on port 6379
const redis_client = redis.createClient(port_redis);

// Create a new express app instance
const app: express.Application = express();

//Middleware Function to Check Cache
const checkCache = (req: any, res: any, next: any) => {
    const { text, type, page, per_page } = req.query;

    redis_client.get(`text=${text}&type=${type}&page=${page}&per_page=${per_page}`, (err: any, data: any) => {


        if (err) {
            console.log(err);
            res.status(500).send(err);
        }
        //if no match found
        if (data != null) {
            res.send(JSON.parse(data));
        } else {
            //proceed to next middleware function
            next();
        }
    });
};

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
    checkCache,

    async (req: any, res: any) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { text, type, page, per_page } = req.query;

        try {
            const usersRes = await axios.get(
                `https://api.github.com/search/${type}?q=${text}&page=${page}&per_page=${per_page}`,
                { headers: { Authorization: `token 8db0c1b68f1198949a7dfafd7b2dbd110a721e29` } }
            )

            //add data to Redis
            redis_client.setex(`text=${text}&type=${type}&page=${page}&per_page=${per_page}`, 7200, JSON.stringify(usersRes.data));


            return res.send(usersRes.data);
        }
        catch (err) {
            return res.send(err);
        }
    });

    app.get('/api/clear-cache', function (req, res) {
        redis_client.flushall((err: any, data: any) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            }
            //if no match found
            if (data != null) {
                res.send(data);
            } 
        });
    });


app.listen(4000, function () {
    console.log('App is listening on port 4000!');
});