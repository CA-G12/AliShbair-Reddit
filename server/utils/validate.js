const joi = require('joi');

const validateSignup = (userData) => {
    console.log('validateSignup');
    const signupSchema = joi.object({
        username: joi.string().required(),
        email: joi.string().email({ separator: '.', minDomainSegments: 2 }).required(),
        password: joi.string().min(6).required(),
    });
    return signupSchema.validate(userData, { abortEarly: false });
};

const validateSignin = (userData) => {
    console.log('validateSignin');
    const signinSchema = joi.object({
        email: joi.string().email({ separator: '.', minDomainSegments: 2 }).required(),
        password: joi.string().min(6).required(),
    });
    return signinSchema.validate(userData, { abortEarly: false });
};

const validatePost = (post) => {
    console.log('validatePost');
    const postSchema = joi.object({
        post: joi.string().required(),
    });
    return postSchema.validate(post, { abortEarly: false });
};

const validateComment = () => {
    console.log('validateComment');
};

module.exports = { validateSignup, validateSignin, validatePost, validateComment };