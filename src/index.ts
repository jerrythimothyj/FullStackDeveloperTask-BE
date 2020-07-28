import dotenv from 'dotenv'
if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

import express from 'express';
import cors from "cors";
import bodyParser from 'body-parser'
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import search from './routes/search.route';
import cache from './routes/cache.route';

const port = Number(process.env.PORT);

const app: express.Application = express();
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            version: "1.0.0",
            title: "Github API",
            description: "Github API Information",
            contact: {
                name: "Jerry"
            },
            servers: [`http://localhost:${process.env.PORT}`]
        }
    },
    apis: ["dist/routes/**/*.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/', search);
app.use('/', cache);



app.listen(port, function () {
    console.log(`App is listening on port ${process.env.PORT}!`);
});