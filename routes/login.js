const express = require('express');
const { csrfProtection, asyncHandler } = require('./utils');
//const userValidators = require('./validation')
const router = express.Router();
const bcrypt = require('bcryptjs')
const { loginUser, logoutUser } = require('../auth')
const db = require('../db/models');
const { check, validationResult } = require('express-validator');

router.get('/login', csrfProtection, (req, res) => {
    res.render('login-form', {
        csrfToken: req.csrfToken()
    });
});

const loginValidators = [
    check('email')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a valid Email Address'),
    check('hashedPassword')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a password.')
];

router.post('/login', csrfProtection, loginValidators,
    asyncHandler(async (req, res) => {
        const { email, hashedPassword } = req.body;

        let errors = [];
        const validatorErrors = validationResult(req);

        if (validatorErrors.isEmpty()) {
            const user = await db.User.findOne({ where: { email } });

            if (user !== null) {
                const passwordMatch = await bcrypt.compare(hashedPassword, user.hashedPassword.toString());

                if (passwordMatch) {
                    loginUser(req, res, user);
                    return res.redirect('/home');
                }
            }
            errors.push('The given information does not match the records we have on file. Please check the information entered.');
        } else {
            errors = validatorErrors.array().map((error) => error.msg)
        }

        res.render('login-form', {
            title: 'Login',
            email,
            errors,
            csrfToken: req.csrfToken(),
        });
    }));

router.post('/logout', (req, res) => {
    logoutUser(req, res);
    res.redirect('/')
})




module.exports = router;
