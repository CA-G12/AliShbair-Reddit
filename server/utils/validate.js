const joi = require('joi');

const validateSignup = (userData) => {
    const signupSchema = joi.object({
        username: joi.string().required(),
        email: joi.string().email({ separator: '.', minDomainSegments: 2 }).required(),
        password: joi.string().min(6).required(),
    });
    return signupSchema.validate(userData, { abortEarly: false });
};

const validateSignin = (userData) => {
    const signinSchema = joi.object({
        email: joi.string().email({ separator: '.', minDomainSegments: 2 }).required(),
        password: joi.string().min(6).required(),
    });
    return signinSchema.validate(userData, { abortEarly: false });
};

const validatePost = (post) => {
    const postSchema = joi.object({
        post: joi.string().required(),
    });
    return postSchema.validate(post, { abortEarly: false });
};

const validateComment = (comment) => {
    const commentSchema = joi.object({
        comment: joi.string().required(),
    });
    return commentSchema.validate(comment, { abortEarly: false });
};

module.exports = { validateSignup, validateSignin, validatePost, validateComment };