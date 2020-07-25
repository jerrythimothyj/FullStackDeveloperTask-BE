import dotenv from 'dotenv'
if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

import express from 'express';
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
import search from './routes/search.route';
import cache from './routes/cache.route';

const port = Number(process.env.PORT);

const app: express.Application = express();
// app.use('/', search);
// app.use('/', cache);

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
      info: {
        version: "1.0.0",
        title: "Customer API",
        description: "Customer API Information",
        contact: {
          name: "Amazing Developer"
        },
        servers: ["http://localhost:4100"]
      }
    },
    // ['.routes/*.js']
    apis: ["dist/index.js", "dist/routes/**/*.js"]
    // apis: ["dist/routes/**/*.js"]
  };
  
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  
  
  /**
   * @swagger
   * /customers:
   *    put:
   *      description: Use to return all customers
   *    parameters:
   *      - name: customer
   *        in: query
   *        description: Name of our customer
   *        required: false
   *        schema:
   *          type: string
   *          format: string
   *    responses:
   *      '201':
   *        description: Successfully created user
   */
  app.put("/customer", (req, res) => {
    res.status(200).send("Successfully updated customer");
  });

    /**
   * @swagger
   * /api/search:
   *    get:
   *      description: Use to return search results
   *    parameters:
   *      - name: type
   *        in: query
   *        description: Type of the search
   *        required: true
   *        schema:
   *          type: string
   *          format: string
   *      - name: text
   *        in: query
   *        description: Search text
   *        required: true
   *        schema:
   *          type: string
   *          format: string
   *      - name: page
   *        in: query
   *        description: Page number
   *        required: true
   *        schema:
   *          type: number
   *          format: number
   *      - name: per_page
   *        in: query
   *        description: Number of items per page
   *        required: true
   *        schema:
   *          type: number
   *          format: number
   *    responses:
   *      '200':
   *        description: A successful response
   */
  app.use('/', search);


// Routes
  /**
   * @swagger
   * /api/clear-cache:
   *  get:
   *    description: Use to clear cache
   *    responses:
   *      '200':
   *        description: A successful response
   */
  app.use('/', cache);
  
  

app.listen(port, function () {
    console.log(`App is listening on port ${process.env.PORT}!`);
});