import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "../user/user.model";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategy";

@Module({
        imports: [SequelizeModule.forFeature([User]), JwtModule.register({})],
        controllers: [AuthController],
        providers: [AuthService, JwtStrategy],
})
export class AuthModule{}