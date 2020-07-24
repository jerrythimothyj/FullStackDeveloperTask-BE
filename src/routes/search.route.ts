import express from 'express';
import axios from "axios";
import redis from "redis";
import { checkCache } from "../middlewares/cache.middleware"
import { validateSchema } from "../middlewares/validation.middleware"
import { throwValidationError } from '../utilities/validation.utility';
import { getSearchId } from '../utilities/cache.utility';
import { apiGet } from '../services/api.service';

const router = express.Router();
const redis_client = redis.createClient(Number(process.env.PORT_REDIS));

router.get(
    '/api/search',
    validateSchema(),
    checkCache,
    async (req: any, res: any) => {
        throwValidationError(req, res)

        const { text, type, page, per_page } = req.query;
        try {
            const result = await apiGet(`search/${type}`, {text, page, per_page })
            redis_client.setex(getSearchId(req.query), Number(process.env.CACHE_TIMING), JSON.stringify(result.data));
            return res.send(result.data);
        }
        catch (err) {
            return res.send(err);
        }
    }
);

export default router;