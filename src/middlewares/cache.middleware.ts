import redis from "redis";
import { throwValidationError } from "../utilities/validation.utility";
import { getSearchId } from "../utilities/cache.utility";

const port_redis = Number(process.env.PORT) || 6379;
const redis_client = redis.createClient(port_redis);

export const checkCache = (req: any, res: any, next: any) => {
    throwValidationError(req, res)

    redis_client.get(getSearchId(req.query), (err: any, data: any) => {
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