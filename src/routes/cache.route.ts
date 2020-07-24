import express from 'express';
import redis from "redis";
import { validationResult, checkSchema } from 'express-validator';

const router = express.Router();
const port_redis = Number(process.env.PORT) || 6379;
const redis_client = redis.createClient(port_redis);

router.get('/api/clear-cache', function (req, res) {
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