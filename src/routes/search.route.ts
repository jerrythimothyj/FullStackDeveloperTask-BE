import express from 'express';
import axios from "axios";
import redis from "redis";
import { checkCache } from "../middlewares/cache.middleware"
import { validateSchema } from "../middlewares/validation.middleware"
import { throwValidationError } from '../utilities/validation.utility';

const router = express.Router();
const port_redis = Number(process.env.PORT) || 6379;
const redis_client = redis.createClient(port_redis);

router.get(
    '/api/search',
    validateSchema(),
    checkCache,
    async (req: any, res: any) => {
        throwValidationError(req, res)

        const { text, type, page, per_page } = req.query;
        try {
            const usersRes = await axios.get(
                `https://api.github.com/search/${type}?q=${text}&page=${page}&per_page=${per_page}`,
                { headers: { Authorization: `token 8db0c1b68f1198949a7dfafd7b2dbd110a721e29` } }
            )

            redis_client.setex(`text=${text}&type=${type}&page=${page}&per_page=${per_page}`, 7200, JSON.stringify(usersRes.data));
            return res.send(usersRes.data);
        }
        catch (err) {
            return res.send(err);
        }
    }
);

export default router;