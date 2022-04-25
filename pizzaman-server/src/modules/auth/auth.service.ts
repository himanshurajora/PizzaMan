import { ForbiddenException, Injectable } from "@nestjs/common";
import { AuthParams, AuthRegisterParams, TokenParams } from "./auth-interface";
import * as argon from 'argon2';
import { InjectModel } from "@nestjs/sequelize";
import { User } from '../user/user.model'
import { JwtService } from "@nestjs/jwt";

@Injectable({})
export class AuthService {

    constructor(@InjectModel(User) private userModel: typeof User, private jwt: JwtService) { }

    // handle login logic
    async login(authParams: AuthParams) {

        // find the user by email
        const user = await this.userModel.findOne({
            where: {
                email: authParams.email
            }
        })

        // check if email exists
        if (!user) {
            throw new ForbiddenException("Email does not exist");
        }

        // match the password
        const match = await argon.verify(user.password, authParams.password);

        // check if password matches
        if (!match) {
            throw new ForbiddenException("Password does not match");
        }

        // return user  
        return await this.signToken(user.id, user.email);
    }

    // hangle register logic 
    async register(authRegisterParams) {

        try {  // generate the password hash
            const passwordHash = await argon.hash(authRegisterParams.password);

            // create the user 
            const user = await this.userModel.create<User>({ ...authRegisterParams, password: passwordHash });

            // user without password
            const { password, ...result } = user.toJSON();
            return result;

        } catch (err) {
            // send error message
            throw new ForbiddenException("Cannot create user");
        }
    }


    // get the access token
    async signToken(userId: number, email: string) {
        const data = {
            sub: userId,
            email: email
        }

        const token = await this.jwt.signAsync(data, {
            expiresIn: '2h',
            secret: 'secret'
        })

        return {
            accessToken: token
        }
    }

    // remove user

    async remove(id: number) {
        return await this.userModel.destroy({ where: { id } });
    }

    // validate use token 
    async validateToken(token: TokenParams) {
        try {
            const user = this.jwt.verify(token.token, { secret: 'secret' })
            return {
                validate: true 
            }
        }catch(err){
            return err
        }
    }

}