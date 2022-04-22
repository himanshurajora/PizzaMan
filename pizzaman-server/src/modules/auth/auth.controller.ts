import { Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService){}

    @Post('login')
    async login(){
        return "Loggen IN"
    }


    @Post('register')
    async register(){
        return "Register"
    }
}