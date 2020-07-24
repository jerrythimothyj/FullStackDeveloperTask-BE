import dotenv from 'dotenv'
if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

import express from 'express';
import search from './routes/search.route';
import cache from './routes/cache.route';

const port = Number(process.env.PORT);

const app: express.Application = express();
app.use('/', search);
app.use('/', cache);

app.listen(port, function () {
    console.log(`App is listening on port ${process.env.PORT}!`);
});