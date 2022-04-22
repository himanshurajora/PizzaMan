import { Injectable } from "@nestjs/common";
import { AuthParams, AuthRegisterParams } from "./auth-interface";
import * as argon from 'argon2';
import { Sequelize } from "sequelize-typescript";
import { InjectModel } from "@nestjs/sequelize";
import {User} from '../user/user.model'
@Injectable({})
export class AuthService {

    constructor(@InjectModel(User) private userModel : typeof User) { }

    // handle login logic
    async login(authParams: AuthParams) {
        return "login"
    }

    // hangle register logic 
    async register(authRegisterParams: AuthRegisterParams) {

        // generate the password hash
        const passwordHash = await argon.hash(authRegisterParams.password);
        
        // create the user 
        const data = await this.userModel.create({
            firstName: authRegisterParams.firstName,
            lastName: authRegisterParams.lastName,
            email: authRegisterParams.email,
            password: passwordHash,
        });

        // user without password
        const user = {
            id: data.id,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email
        }
        return user;
    }

}