import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";


@Controller('user')
export class UserController{

    @UseGuards(AuthGuard('jwt'))
    @Get()
    getUser(){
        return {
            message: 'Hello World'
        }
    }   
}