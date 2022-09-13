import {Controller, Request, Get, Post, UseGuards, BadRequestException} from '@nestjs/common';
import { AppService } from './app.service';
import {LocalAuthGuard} from "./auth/local-auth.guard";
import {AuthService} from "./auth/auth.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
              private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth')
  async login(@Request() req) {
    if (!req.body.hasOwnProperty('username') || !req.body.hasOwnProperty('password'))
      throw new BadRequestException('Field is missing')
    return this.authService.login(req.user)
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
