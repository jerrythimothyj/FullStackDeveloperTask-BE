import express from 'express';
import redis from "redis";
import { validationResult, checkSchema } from 'express-validator';

const router = express.Router();
const redis_client = redis.createClient(Number(process.env.PORT_REDIS));

/**
   * @swagger
   * /api/clear-cache:
   *  delete:
   *    description: Use to clear cache
   *    responses:
   *      '200':
   *        description: A successful response
   */
router.delete(
    `${process.env.BASE_URL}clear-cache`,
    function (req, res) {
        redis_client.flushall((err: any, data: any) => {
            if (err) {
                res.status(500).send(err);
            }

            if (data != null) {
                res.send(data);
            }
        });
    });

export default router;