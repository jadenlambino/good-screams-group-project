const { check } = require('express-validator')

const userValidators = [
    check("firstName")
        .exists({ checkFalsy: true })
        .withMessage('Please provide a valid first name')
        .isLength({ max: 50 })
        .withMessage('First name must not be more than 50 characters long'),
    check('lastName')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a valid last name')
        .isLength({ max: 50 })
        .withMessage('Last name must not be more than 50 characters long'),
    check('email')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for Email Address')
        .isLength({ max: 255 })
        .withMessage('Email must not be more than 255 characters long')
        .isEmail()
        .withMessage('Email is not a valid email'),
    check('hashedPassword')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a valid password')
        .isLength({ max: 50 })
        .withMessage('Password must not be more than 50 characters long'),
    check('confirmPassword')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a matching password')
        .isLength({ max: 50 })
        .withMessage('Confirmed password must not be more than 50 characters long'),
]

module.exports = userValidators;
