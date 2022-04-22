import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from '@nestjs/common';
import { UserService } from './modules/user/user.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private userService: UserService ) {}

  @Get()
  async getHello(@Req() request: Request) {
    return "Hello World"
  }
}
