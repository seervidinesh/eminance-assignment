import * as _ from 'ramda';
import { Either, left, right } from 'fp-ts/lib/Either';
import { UserModel } from './schema';
import { NewUser, User, UserRegistrationError, UserWithPassword } from './types';

export const saveUser = async (d: NewUser): Promise<Either<UserRegistrationError, any>> => {
    const user = new UserModel({
        username: d.username,
        password: d.password,
        roles: d.roles
    })
    const result = await user.save();
    return right(result);
}

export const getUserByUserName = async (username: string): Promise<Either<'userNotFound', UserWithPassword>> => {
    const user: any = await UserModel.findOne({ username }).select({username: 1, _id: 1, roles: 1, password: 1});
    if(!_.isNil(user)) return right(user);
    return left('userNotFound');
}

export const getUserById = async (id: string): Promise<Either<'userNotFound', User>> => {
    const user: any = await UserModel.findById(id).select({ _id: 1, roles: 1, username: 1 });
    if(!_.isNil(user)) return right(user);
    return left('userNotFound');
}