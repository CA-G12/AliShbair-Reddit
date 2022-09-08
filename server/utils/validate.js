const joi = require('joi');

const validateSignup = (userData) => {
    console.log('validateSignup');
    const signupSchema = joi.object({
        username: joi.string().required(),
        password: joi.string().required().min(6),
        email: joi.string().email({ separator: '.', minDomainSegments: 2 }).required(),
    });
    return signupSchema.validate(userData, { abortEarly: false })
};

const validateSignin = () => {
    console.log('validateSignin');
};

const validatePost = () => {
    console.log('validatePost');
};

const validateComment = () => {
    console.log('validateComment');
};

module.exports = { validateSignup, validateSignin, validatePost, validateComment };