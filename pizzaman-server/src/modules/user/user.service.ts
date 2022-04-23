import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./user.model";

@Injectable({})
export class UserService {
    constructor(@InjectModel(User) private userModel: typeof User) { }

    // find user by id 
    async findById(id: number): Promise<User> {
        return await this.userModel.findByPk(id)
    }
}