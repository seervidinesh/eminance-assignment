import Bcrypt from 'bcrypt';
import { Either, isLeft, right, left, isRight } from 'fp-ts/lib/Either';
import * as _ from 'ramda';
import * as repo from './repo';
import { NewUser, User, UserRegistrationError } from './types';


export interface UserInterface {
    signUpUser(signUpDetails: NewUser): Promise<Either<UserRegistrationError, User>>;
    userDetails(userId: string): void;
}

export class UserHandler implements UserInterface {
    async signUpUser(signUpDetails: NewUser): Promise<Either<UserRegistrationError, User>> {
        try {
            const hashedPassword = await Bcrypt.hash(signUpDetails.password, 10);
            if (!hashedPassword) return left('passwordHashingFailed');
            const result = await repo.saveUser({
                username: signUpDetails.username,
                roles: signUpDetails.roles,
                password: hashedPassword
            });
            if (isLeft(result)) {
                return left(result.left);
            }
            return right(result.right);
        } catch (error: any) {
            if(error.code === 11000) return left('userAlreadyExist');
            return left('serverError');
        }
    }
    async userDetails(userId: string) {
        try {
            const result = await repo.getUserById(userId);
            if(isRight(result)) return result.right;
            return result.left;
        } catch (error) {
            return 'serverError'
        }
    }
}