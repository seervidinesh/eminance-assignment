import * as Joi from 'joi';

export enum Role {
    Admin = 'ADMIN',
    Customer = 'CUSTOMER'
}

export const loginSchema = Joi.object({
    username: Joi.string()
        .required(),
    password: Joi.string().required().min(6).max(18)
});

export interface LoginDetails {
    username: string;
    password: string;
}

export interface LoginResponse {
    authToken: string;
}