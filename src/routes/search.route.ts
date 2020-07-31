import express from 'express';
import redis from "redis";
import { checkCache } from "../middlewares/cache.middleware"
import { validateSchema } from "../middlewares/validation.middleware"
import { throwValidationError } from '../utilities/validation.utility';
import { getSearchId } from '../utilities/cache.utility';
import { fetchData } from '../services/search.service';

const router = express.Router();
const redisClient = redis.createClient(Number(process.env.PORT_REDIS));

/**
   * @swagger
   * /api/search:
   *  post:
   *    description: Use to get data
   *    responses:
   *      '200':
   *        description: A successful response
   *    parameters:
   *      - in: body
   *        name: serch
   *        description: The search body
   *        schema:
   *          type: object
   *          required:
   *            - type
   *            - text
   *            - page
   *            - per_page
   *          properties:
   *            type:
   *              type: string
   *              enum: ['users', 'repositories', 'issues']
   *            text:
   *              type: string
   *              example: 'jerry'
   *            page:
   *              type: integer
   *              minumum: 1
   *              example: 1
   *            per_page:
   *              type: integer
   *              minumum: 1
   *              maximum: 100
   *              example: 1
   */
router.post(
    `${process.env.BASE_URL}search`,
    validateSchema(),
    checkCache,
    async (req: any, res: any) => {
        if (!throwValidationError(req, res)) {
            const { text, type, page, per_page } = req.body;
            try {
                const result = await fetchData(type, { text, page, per_page })
                redisClient.setex(getSearchId(req.body), Number(process.env.CACHE_TIMING), JSON.stringify(result.data));
                return res.send(result.data);
            }
            catch (err) {
                return res.status(500).send(err);
            }
        }
    }
);

export default router;