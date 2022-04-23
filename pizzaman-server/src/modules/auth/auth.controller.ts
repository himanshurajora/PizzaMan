import { Body, Controller, Get, Param, Post } from "@nestjs/common";
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
        console.log(authRegisterParams)
        return this.authService.register(authRegisterParams);
    }

    @Get(':id')
    async getUser(@Param('id') id: number){
        return this.authService.remove(id);
    }
}