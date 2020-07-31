import { checkSchema } from 'express-validator';

export const validateSchema = () => checkSchema({
    text: {
        isLength: {
            errorMessage: 'Search text should be 3 or more characters',
            options: { min: 3 }
        }
    },
    type: {
        matches: {
            errorMessage: 'Search type should be either users, repositories or issues',
            options: [/\b(?:users|repositories|issues)\b/],
        }
    },
    page: {
        isInt: {
            errorMessage: 'Page number should be an valid integer',
            options: { min: 1 }
        },
        toInt: true
    },
    per_page: {
        isInt: {
            errorMessage: 'Records per page should be more than 0 and less than or equal to 100',
            options: { min: 1, max: 100 }
        },
        toInt: true
    }
})