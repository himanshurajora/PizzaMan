import { Body, Controller, Post } from "@nestjs/common";
import { AuthParams, AuthRegisterParams } from "./auth-interface";
import { AuthService } from "./auth.service";


@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService){}

    @Post('login')
    async login(@Body () authParams: AuthParams){
        return this.authService.login(authParams);
    }


    @Post('register')
    async register(@Body() authRegisterParams : AuthRegisterParams){
        return this.authService.register(authRegisterParams);
    }
}