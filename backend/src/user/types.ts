import * as Joi from 'joi';
import {
    ContainerTypes,
    ValidatedRequestSchema,
} from 'express-joi-validation';
import { Role } from '../authentication/types';

export const signUpSchema = Joi.object({
    username: Joi.string().required(),
    roles: Joi.array().items(...Object.values(Role)).required(),
    password: Joi.string().required().min(6).max(18)
});

export interface NewUser {
    username: string;
    roles: Role[];
    password: string;
}

export interface SignUpRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
      username: string,
      roles: Role[],
      password: string
    }
}

export type UserRegistrationError =
    | 'userAlreadyExist'
    | 'passwordHashingFailed'
    | 'inValidPhoneNumber'
    | 'serverError'

export interface User {
    createdAt?: string,
    _id: string;
    username: string;
    roles: Role[];
}

export interface UserWithPassword extends User {
    password?: string;
}