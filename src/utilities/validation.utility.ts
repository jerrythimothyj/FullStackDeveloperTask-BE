import { validationResult } from 'express-validator';

export const throwValidationError = (req: any, res: any): any => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
}
