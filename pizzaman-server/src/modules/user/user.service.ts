import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./user.model";

@Injectable({})
export class UserService{
    constructor(@InjectModel(User) private userModel: typeof User){}

    // fetch all the users in table
    async findAll(): Promise<User[]>{
        return await this.userModel.findAll();
    }

    // fetch a single user by id
    async findOne(id: number): Promise<User>{
        return await this.userModel.findOne({
            where:{
                id,
            }
        });
    }

    // remove a user by id
    async remove(id: number): Promise<void>{
        const user = await this.findOne(id);
        user.destroy();
    }

    // resigter a new user
    async register(user: User): Promise<User>{
        return await this.userModel.create({
            firstname: user.firstName,
            lastname: user.lastName,
            email: user.email,
            password: user.password,
        });
    }
}