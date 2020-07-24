import { validationResult, checkSchema } from 'express-validator';

export const throwValidationError = (req: any, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
}
