import joi from "joi"

export const userSchema = joi.object({
    name: joi.string().trim().required() ,
    email: joi.string().trim().email().required() ,
    password: joi.string().trim().required() ,
    confirmPassword: joi.string().trim().required().valid(joi.ref('password')) ,
});
