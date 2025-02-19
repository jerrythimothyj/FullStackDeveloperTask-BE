import redis from "redis";
import { throwValidationError } from "../utilities/validation.utility";
import { getSearchId } from "../utilities/cache.utility";

const redisClient = redis.createClient(Number(process.env.PORT_REDIS));

export const checkCache = (req: any, res: any, next: any) => {
    if (!throwValidationError(req, res)) {
        redisClient.get(getSearchId(req.body), (err: any, data: any) => {
            if (err) {
                res.status(500).send(err);
            }
            if (data != null) {
                res.send(JSON.parse(data));
            } else {
                next();
            }
        });
    }
};