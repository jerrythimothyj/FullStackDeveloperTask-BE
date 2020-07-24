import redis from "redis";
import { throwValidationError } from "../utilities/validation.utility";

const port_redis = Number(process.env.PORT) || 6379;
const redis_client = redis.createClient(port_redis);

export const checkCache = (req: any, res: any, next: any) => {
    throwValidationError(req, res)
    
    const { text, type, page, per_page } = req.query;

    redis_client.get(`text=${text}&type=${type}&page=${page}&per_page=${per_page}`, (err: any, data: any) => {
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